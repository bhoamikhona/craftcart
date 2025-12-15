"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import supabase from "@/lib/supabaseClient";

import Preview from "./Preview.jsx";
import Tabs from "./Tabs.jsx";
import DetailsTab from "./DetailsTab.jsx";
import ProductsTab from "./ProductsTab.jsx";
import StepsTab from "./StepsTab.jsx";

const emptyVideo = {
  id: null,
  title: "",
  thumbnail: "",
  created_at: new Date().toISOString(),
  views: 0,
  likes: 0,
  description: "",
  creator: {
    id: null,
    full_name: "",
    avatar_url: "",
    followers: 0,
  },
  products: [],
  steps: [],
};

export default function StudioEditor() {
  const params = useSearchParams();
  const videoId = params.get("id");

  const [activeTab, setActiveTab] = useState("details");
  const [video, setVideo] = useState(emptyVideo);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const mode = useMemo(() => (videoId ? "edit" : "create"), [videoId]);

  useEffect(() => {
    let ignore = false;

    async function load() {
      if (!videoId) {
        setVideo(emptyVideo);
        return;
      }

      setLoading(true);
      setStatusMsg("");

      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .eq("id", videoId)
        .single();

      if (ignore) return;

      if (error) {
        console.error("Studio load error:", error);
        setStatusMsg("Could not load this video. Switching to a new draft.");
        setVideo({ ...emptyVideo });
      } else {
        setVideo({
          ...emptyVideo,
          ...data,
          creator: { ...emptyVideo.creator, ...(data.creator || {}) },
          products: Array.isArray(data.products) ? data.products : [],
          steps: Array.isArray(data.steps) ? data.steps : [],
        });
      }

      setLoading(false);
    }

    load();
    return () => {
      ignore = true;
    };
  }, [videoId]);

  function resetDraft() {
    setVideo({ ...emptyVideo, created_at: new Date().toISOString() });
    setStatusMsg("Draft reset.");
  }

  async function saveVideo() {
    setStatusMsg("");
    setLoading(true);

    try {
      if (!video.title.trim()) {
        setStatusMsg("Please add a title before saving.");
        setLoading(false);
        return;
      }

      if (mode === "create") {
        const payload = { ...video };
        delete payload.id;

        const { data, error } = await supabase
          .from("videos")
          .insert([payload])
          .select()
          .single();

        if (error) throw error;

        setVideo((prev) => ({ ...prev, id: data.id }));
        setStatusMsg("Saved! (Created)");
      } else {
        const { error } = await supabase
          .from("videos")
          .update(video)
          .eq("id", videoId);

        if (error) throw error;

        setStatusMsg("Saved! (Updated)");
      }
    } catch (e) {
      console.error("Save error:", e);
      setStatusMsg(e.message || "Save failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 mt-10 mb-20">
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.22em] text-gray-400 uppercase">
              Studio
            </p>
            <h1 className="text-2xl font-bold text-gray-900">
              {mode === "create" ? "Create a new tutorial" : "Edit tutorial"}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {statusMsg ? (
              <span className="text-sm text-gray-600">{statusMsg}</span>
            ) : (
              <span className="text-sm text-gray-400">
                {mode === "create" ? "Draft" : `ID: ${videoId}`}
              </span>
            )}
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                mode === "create"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {mode === "create" ? "New" : "Editing"}
            </span>
          </div>
        </div>

        <div className="h-px bg-gray-100" />
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-[420px] shrink-0">
          <div className="sticky top-24">
            <div className="rounded-3xl border border-gray-100 bg-white shadow-[0_20px_48px_rgba(0,0,0,0.06)] p-5">
              <Preview video={video} />
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={resetDraft}
                className="flex-1 rounded-2xl border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={saveVideo}
                disabled={loading}
                className="flex-1 rounded-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="mt-5 rounded-3xl border border-gray-100 bg-white shadow-[0_20px_48px_rgba(0,0,0,0.06)]">
            <div className="p-6">
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

            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-400">
                Changes update the preview instantly.
              </p>
              <button
                type="button"
                onClick={saveVideo}
                disabled={loading}
                className="rounded-2xl bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
