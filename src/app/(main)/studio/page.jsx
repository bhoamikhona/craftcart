"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import supabase from "@/lib/supabaseClient";

import Tabs from "@/components/studio/Tabs.jsx";
import Preview from "@/components/studio/Preview.jsx";
import DetailsTab from "@/components/studio/DetailsTab.jsx";
import ProductsTab from "@/components/studio/ProductsTab.jsx";
import StepsTab from "@/components/studio/StepsTab.jsx";

const THUMB_BUCKET = "tutorial-thumbnails";
const VIDEO_BUCKET = "tutorial-videos";

export const initialVideo = {
  title: "",
  thumbnail: "/images/thumbnail/video-placeholder.png",
  created_at: new Date().toISOString(),
  views: 0,
  creator: {
    id: null,
    full_name: "",
    avatar_url: "/images/users/default-avatar.png",
  },
  description: "",
  products: [],
  steps: [],
  thumbnailFile: null,
  videoFile: null,
  videoFileName: "",
};

function extFromName(name = "") {
  const parts = name.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
}

function safeBaseName(name = "file") {
  return name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .slice(0, 60);
}

function withTimeout(promise, ms, label = "Request") {
  let t;
  const timeout = new Promise((_, reject) => {
    t = setTimeout(
      () =>
        reject(new Error(`${label} timed out after ${Math.round(ms / 1000)}s`)),
      ms
    );
  });

  return Promise.race([promise, timeout]).finally(() => clearTimeout(t));
}

export default function StudioPage() {
  const { data: session } = useSession();

  const [activeTab, setActiveTab] = useState("details");
  const [creating, setCreating] = useState(false);

  const [video, setVideo] = useState(() => ({
    ...initialVideo,
    creator: {
      id: session?.user?.id ?? session?.id ?? null,
      full_name: session?.user?.name ?? session?.name ?? "",
      avatar_url:
        session?.avatar_url ??
        session?.user?.avatar_url ??
        "/images/users/default-avatar.png",
    },
  }));

  useEffect(() => {
    if (!session) return;

    setVideo((prev) => ({
      ...prev,
      creator: {
        ...prev.creator,
        id: session?.user?.id ?? session?.id ?? prev.creator.id,
        full_name:
          session?.user?.name ?? session?.name ?? prev.creator.full_name,
        avatar_url:
          session?.avatar_url ??
          session?.user?.avatar_url ??
          prev.creator.avatar_url ??
          "/images/users/default-avatar.png",
      },
    }));
  }, [session]);

  async function uploadToBucket(bucket, path, file) {
    const uploadPromise = supabase.storage.from(bucket).upload(path, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type || undefined,
    });

    const { error: upErr } = await withTimeout(
      uploadPromise,
      120000,
      `Upload to ${bucket}`
    );
    if (upErr) throw upErr;

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    const publicUrl = data?.publicUrl || null;

    if (!publicUrl) {
      throw new Error(
        `Uploaded, but could not generate a public URL. Make sure bucket "${bucket}" is public (or use signed URLs).`
      );
    }

    return publicUrl;
  }

  async function handleCreate() {
    if (creating) return;

    const title = (video.title || "").trim();
    const description = (video.description || "").trim();

    if (!title) return toast.error("Title is required.");
    if (!video.thumbnailFile) return toast.error("Please upload a thumbnail.");
    if (!video.videoFile) return toast.error("Please upload a video.");

    const now = new Date().toISOString();

    setCreating(true);
    const toastId = toast.loading("Creating tutorial...");

    try {
      toast.loading("Creating tutorial record...", { id: toastId });

      const tutorialRow = {
        title,
        description: description || null,
        video_url: null,
        thumbnail_url: null,

        creator_id: session?.user?.id ?? session?.id ?? null,

        likes: 0,
        dislikes: 0,
        shares: 0,
        comment_count: 0,

        created_at: now,
        updated_at: now,

        duration: null,
        category_name: null,
        tags: null,
        difficulty_level: null,
      };

      const insertPromise = supabase
        .from("tutorials")
        .insert([tutorialRow])
        .select("tutorial_id")
        .single();

      const { data: inserted, error: tutErr } = await withTimeout(
        insertPromise,
        15000,
        "Insert tutorial"
      );

      if (tutErr) throw tutErr;

      const tutorialId = inserted.tutorial_id;

      const thumbExt = extFromName(video.thumbnailFile.name) || "jpg";
      const vidExt = extFromName(video.videoFile.name) || "mp4";

      const thumbName = `${safeBaseName(
        video.thumbnailFile.name
      )}-${Date.now()}.${thumbExt}`;
      const vidName = `${safeBaseName(
        video.videoFile.name
      )}-${Date.now()}.${vidExt}`;

      const thumbPath = `${tutorialId}/${thumbName}`;
      const vidPath = `${tutorialId}/${vidName}`;

      toast.loading("Uploading thumbnail...", { id: toastId });
      const thumbnailUrl = await uploadToBucket(
        THUMB_BUCKET,
        thumbPath,
        video.thumbnailFile
      );

      toast.loading("Uploading video...", { id: toastId });
      const videoUrl = await uploadToBucket(
        VIDEO_BUCKET,
        vidPath,
        video.videoFile
      );

      toast.loading("Finalizing tutorial...", { id: toastId });

      const updatePromise = supabase
        .from("tutorials")
        .update({
          thumbnail_url: thumbnailUrl,
          video_url: videoUrl,
          updated_at: now,
        })
        .eq("tutorial_id", tutorialId);

      const { error: updErr } = await withTimeout(
        updatePromise,
        15000,
        "Update tutorial"
      );
      if (updErr) throw updErr;

      const stepsPayload = (video.steps || [])
        .map((s) => ({
          tutorial_id: tutorialId,
          step_number: Number(s?.number),
          title: null,
          description: (s?.text || "").trim() || null,
        }))
        .filter(
          (s) => Number.isFinite(s.step_number) && (s.description || "").trim()
        );

      if (stepsPayload.length) {
        const stepsInsertPromise = supabase
          .from("tutorialsteps")
          .insert(stepsPayload);
        const { error: stepsErr } = await withTimeout(
          stepsInsertPromise,
          15000,
          "Insert steps"
        );
        if (stepsErr) throw stepsErr;
      }

      const productIds = Array.from(
        new Set((video.products || []).map((p) => p?.productId).filter(Boolean))
      );

      const productsPayload = productIds.map((pid) => ({
        tutorial_id: tutorialId,
        product_id: pid,
      }));

      if (productsPayload.length) {
        const prodInsertPromise = supabase
          .from("tutorialproducts")
          .insert(productsPayload);
        const { error: tpErr } = await withTimeout(
          prodInsertPromise,
          15000,
          "Insert tutorial products"
        );
        if (tpErr) throw tpErr;
      }

      toast.success("Created successfully", { id: toastId });

      setVideo({
        ...initialVideo,
        creator: {
          id: session?.user?.id ?? session?.id ?? null,
          full_name: session?.user?.name ?? session?.name ?? "",
          avatar_url:
            session?.avatar_url ??
            session?.user?.avatar_url ??
            "/images/users/default-avatar.png",
        },
      });
      setActiveTab("details");
    } catch (err) {
      console.error("Create failed:", err);
      toast.error("Something went wrong.", { id: toastId });
    } finally {
      setCreating(false);
    }
  }

  const readyToCreate =
    (video.title || "").trim() &&
    Boolean(video.thumbnailFile) &&
    Boolean(video.videoFile);

  return (
    <div className="max-w-7xl mx-auto p-6 mt-12 mb-20 flex flex-col md:flex-row gap-12">
      <Toaster position="top-right" />

      <div className="w-full md:w-[420px] shrink-0">
        <Preview video={video} />
      </div>

      <div className="flex-1">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
          {activeTab === "details" && (
            <DetailsTab video={video} setVideo={setVideo} />
          )}

          {activeTab === "products" && (
            <ProductsTab video={video} setVideo={setVideo} />
          )}

          {activeTab === "steps" && (
            <StepsTab video={video} setVideo={setVideo} />
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleCreate}
            disabled={creating || !readyToCreate}
            className="rounded-xl bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
