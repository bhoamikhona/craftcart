"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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
  video_url: "",
  duration: "",
  category_name: "",
  tags: "",
  difficulty_level: "",
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
  const router = useRouter();
  const pathname = usePathname();

  const tutorialIdParam = params.get("id");

  const [activeTab, setActiveTab] = useState("details");
  const [video, setVideo] = useState(emptyVideo);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const isEditMode = useMemo(() => Boolean(tutorialIdParam), [tutorialIdParam]);

  function normalizeSteps(steps) {
    if (!Array.isArray(steps)) return [];
    return steps
      .map((s, idx) => {
        if (typeof s === "string") {
          return { title: `Step ${idx + 1}`, description: s };
        }
        const title = (s?.title ?? "").toString();
        const description = (s?.description ?? "").toString();
        const step_number = Number.isFinite(Number(s?.step_number))
          ? Number(s.step_number)
          : idx + 1;

        return { step_number, title, description };
      })
      .filter((s) => (s.title || "").trim() || (s.description || "").trim())
      .sort((a, b) => a.step_number - b.step_number);
  }

  function normalizeProductIds(products) {
    if (!Array.isArray(products)) return [];
    const ids = products
      .map((p) => {
        if (typeof p === "string") return p;
        return p?.product_id ?? p?.productId ?? null;
      })
      .filter(Boolean)
      .map(String);

    return Array.from(new Set(ids));
  }

  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      if (!tutorialIdParam) {
        setVideo(emptyVideo);
        return;
      }

      const tutorial_id = Number(tutorialIdParam);
      if (!Number.isFinite(tutorial_id)) {
        setStatusMsg("Invalid tutorial id in URL.");
        return;
      }

      setLoading(true);
      setStatusMsg("");

      try {
        const { data: tutorial, error: tutErr } = await supabase
          .from("tutorials")
          .select("*")
          .eq("tutorial_id", tutorial_id)
          .single();

        if (tutErr) throw tutErr;

        const { data: stepsRows, error: stepsErr } = await supabase
          .from("tutorialsteps")
          .select("step_number,title,description")
          .eq("tutorial_id", tutorial_id)
          .order("step_number", { ascending: true });

        if (stepsErr) throw stepsErr;

        const { data: tpRows, error: tpErr } = await supabase
          .from("tutorialproducts")
          .select("product_id")
          .eq("tutorial_id", tutorial_id);

        if (tpErr) throw tpErr;

        const productIds = (tpRows || [])
          .map((r) => r.product_id)
          .filter(Boolean);

        let productRows = [];
        if (productIds.length) {
          const { data: prods, error: prodErr } = await supabase
            .from("products")
            .select("*")
            .in("product_id", productIds);

          if (prodErr) throw prodErr;
          productRows = prods || [];
        }

        if (cancelled) return;

        setVideo((prev) => ({
          ...prev,
          id: tutorial.tutorial_id,
          title: tutorial.title ?? "",
          description: tutorial.description ?? "",
          video_url: tutorial.video_url ?? "",
          thumbnail: tutorial.thumbnail_url ?? "",
          likes: tutorial.likes ?? 0,
          created_at: tutorial.created_at ?? prev.created_at,
          duration: tutorial.duration ?? "",
          category_name: tutorial.category_name ?? "",
          tags: tutorial.tags ?? "",
          difficulty_level: tutorial.difficulty_level ?? "",
          creator: {
            ...prev.creator,
            id: tutorial.creator_id ?? prev.creator.id,
          },
          steps: stepsRows || [],
          products: productRows,
        }));
      } catch (err) {
        console.error("Load tutorial failed:", err);
        if (!cancelled)
          setStatusMsg(`Load failed: ${err?.message || "Unknown error"}`);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadAll();
    return () => {
      cancelled = true;
    };
  }, [tutorialIdParam]);

  async function handleSave() {
    setLoading(true);
    setStatusMsg("");

    try {
      const now = new Date().toISOString();

      const tutorialPayload = {
        title: (video.title || "").trim(),
        description: (video.description || "").trim() || null,
        video_url: (video.video_url || "").trim() || null,
        creator_id: Number.isFinite(Number(video.creator?.id))
          ? Number(video.creator.id)
          : null,
        thumbnail_url: (video.thumbnail || "").trim() || null,
        duration: (video.duration || "").trim() || null,
        category_name: (video.category_name || "").trim() || null,
        tags: (video.tags || "").trim() || null,
        difficulty_level: (video.difficulty_level || "").trim() || null,
        updated_at: now,
      };

      if (!tutorialPayload.title) {
        setStatusMsg("Title is required.");
        setLoading(false);
        return;
      }

      let savedTutorial;

      if (isEditMode) {
        const tutorial_id = Number(tutorialIdParam);
        const { data, error } = await supabase
          .from("tutorials")
          .update(tutorialPayload)
          .eq("tutorial_id", tutorial_id)
          .select("*")
          .single();

        if (error) throw error;
        savedTutorial = data;
      } else {
        const insertPayload = {
          ...tutorialPayload,
          created_at: now,
          likes: Number.isFinite(Number(video.likes)) ? Number(video.likes) : 0,
          dislikes: 0,
          shares: 0,
          comment_count: 0,
        };

        const { data, error } = await supabase
          .from("tutorials")
          .insert([insertPayload])
          .select("*")
          .single();

        if (error) throw error;
        savedTutorial = data;

        router.replace(`${pathname}?id=${savedTutorial.tutorial_id}`);
      }

      const tutorial_id = savedTutorial.tutorial_id;

      const normalizedSteps = normalizeSteps(video.steps);

      {
        const { error } = await supabase
          .from("tutorialsteps")
          .delete()
          .eq("tutorial_id", tutorial_id);

        if (error) throw error;
      }

      if (normalizedSteps.length) {
        const rowsToInsert = normalizedSteps.map((s) => ({
          tutorial_id,
          step_number: s.step_number,
          title: (s.title || "").trim() || null,
          description: (s.description || "").trim() || null,
          updated_at: now,
        }));

        const { error } = await supabase
          .from("tutorialsteps")
          .insert(rowsToInsert);
        if (error) throw error;
      }

      const productIds = normalizeProductIds(video.products);

      {
        const { error } = await supabase
          .from("tutorialproducts")
          .delete()
          .eq("tutorial_id", tutorial_id);

        if (error) throw error;
      }

      if (productIds.length) {
        const joinRows = productIds.map((pid) => ({
          tutorial_id,
          product_id: pid,
        }));
        const { error } = await supabase
          .from("tutorialproducts")
          .insert(joinRows);
        if (error) throw error;
      }

      setVideo((prev) => ({ ...prev, id: tutorial_id }));
      setStatusMsg("Saved ✅");
    } catch (err) {
      console.error("Save failed:", err);
      setStatusMsg(`Save failed: ${err?.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <Preview video={video} />

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {statusMsg ? statusMsg : loading ? "Working..." : ""}
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="px-5 py-2 rounded-full bg-black text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

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
    </div>
  );
}
