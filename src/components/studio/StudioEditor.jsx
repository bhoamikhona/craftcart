// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import supabase from "@/lib/supabaseClient";

// import Preview from "./Preview.jsx";
// import Tabs from "./Tabs.jsx";
// import DetailsTab from "./DetailsTab.jsx";
// import ProductsTab from "./ProductsTab.jsx";
// import StepsTab from "./StepsTab.jsx";

// const emptyVideo = {
//   id: null,
//   title: "",
//   thumbnail: "",
//   created_at: new Date().toISOString(),
//   views: 0,
//   likes: 0,
//   description: "",
//   creator: {
//     id: null,
//     full_name: "",
//     avatar_url: "",
//     followers: 0,
//   },
//   products: [],
//   steps: [],
// };

// export default function StudioEditor() {
//   const params = useSearchParams();
//   const videoId = params.get("id");

//   const [activeTab, setActiveTab] = useState("details");
//   const [video, setVideo] = useState(emptyVideo);
//   const [loading, setLoading] = useState(false);
//   const [statusMsg, setStatusMsg] = useState("");

//   const mode = useMemo(() => (videoId ? "edit" : "create"), [videoId]);

//   useEffect(() => {
//     let ignore = false;

//     async function load() {
//       if (!videoId) {
//         setVideo(emptyVideo);
//         return;
//       }

//       setLoading(true);
//       setStatusMsg("");

//       const { data, error } = await supabase
//         .from("videos")
//         .select("*")
//         .eq("id", videoId)
//         .single();

//       if (ignore) return;

//       if (error) {
//         console.error("Studio load error:", error);
//         setStatusMsg("Could not load this video. Switching to a new draft.");
//         setVideo({ ...emptyVideo });
//       } else {
//         setVideo({
//           ...emptyVideo,
//           ...data,
//           creator: { ...emptyVideo.creator, ...(data.creator || {}) },
//           products: Array.isArray(data.products) ? data.products : [],
//           steps: Array.isArray(data.steps) ? data.steps : [],
//         });
//       }

//       setLoading(false);
//     }

//     load();
//     return () => {
//       ignore = true;
//     };
//   }, [videoId]);

//   function resetDraft() {
//     setVideo({ ...emptyVideo, created_at: new Date().toISOString() });
//     setStatusMsg("Draft reset.");
//   }

//   async function saveVideo() {
//     setStatusMsg("");
//     setLoading(true);

//     try {
//       if (!video.title.trim()) {
//         setStatusMsg("Please add a title before saving.");
//         setLoading(false);
//         return;
//       }

//       if (mode === "create") {
//         const payload = { ...video };
//         delete payload.id;

//         const { data, error } = await supabase
//           .from("videos")
//           .insert([payload])
//           .select()
//           .single();

//         if (error) throw error;

//         setVideo((prev) => ({ ...prev, id: data.id }));
//         setStatusMsg("Saved! (Created)");
//       } else {
//         const { error } = await supabase
//           .from("videos")
//           .update(video)
//           .eq("id", videoId);

//         if (error) throw error;

//         setStatusMsg("Saved! (Updated)");
//       }
//     } catch (e) {
//       console.error("Save error:", e);
//       setStatusMsg(e.message || "Save failed.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-6 mt-10 mb-20">
//       <div className="flex flex-col gap-2 mb-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-xs tracking-[0.22em] text-gray-400 uppercase">
//               Studio
//             </p>
//             <h1 className="text-2xl font-bold text-gray-900">
//               {mode === "create" ? "Create a new tutorial" : "Edit tutorial"}
//             </h1>
//           </div>

//           <div className="flex items-center gap-2">
//             {statusMsg ? (
//               <span className="text-sm text-gray-600">{statusMsg}</span>
//             ) : (
//               <span className="text-sm text-gray-400">
//                 {mode === "create" ? "Draft" : `ID: ${videoId}`}
//               </span>
//             )}
//             <span
//               className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                 mode === "create"
//                   ? "bg-orange-100 text-orange-700"
//                   : "bg-gray-100 text-gray-700"
//               }`}
//             >
//               {mode === "create" ? "New" : "Editing"}
//             </span>
//           </div>
//         </div>

//         <div className="h-px bg-gray-100" />
//       </div>

//       <div className="flex flex-col lg:flex-row gap-10">
//         <div className="w-full lg:w-[420px] shrink-0">
//           <div className="sticky top-24">
//             <div className="rounded-3xl border border-gray-100 bg-white shadow-[0_20px_48px_rgba(0,0,0,0.06)] p-5">
//               <Preview video={video} />
//             </div>

//             <div className="mt-4 flex gap-2">
//               <button
//                 type="button"
//                 onClick={resetDraft}
//                 className="flex-1 rounded-2xl border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
//               >
//                 Reset
//               </button>

//               <button
//                 type="button"
//                 onClick={saveVideo}
//                 disabled={loading}
//                 className="flex-1 rounded-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
//               >
//                 {loading ? "Saving..." : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="flex-1">
//           <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

//           <div className="mt-5 rounded-3xl border border-gray-100 bg-white shadow-[0_20px_48px_rgba(0,0,0,0.06)]">
//             <div className="p-6">
//               {activeTab === "details" && (
//                 <DetailsTab video={video} setVideo={setVideo} />
//               )}
//               {activeTab === "products" && (
//                 <ProductsTab video={video} setVideo={setVideo} />
//               )}
//               {activeTab === "steps" && (
//                 <StepsTab video={video} setVideo={setVideo} />
//               )}
//             </div>

//             <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
//               <p className="text-xs text-gray-400">
//                 Changes update the preview instantly.
//               </p>
//               <button
//                 type="button"
//                 onClick={saveVideo}
//                 disabled={loading}
//                 className="rounded-2xl bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
//               >
//                 {loading ? "Saving..." : "Save changes"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import supabase from "@/lib/supabaseClient";

import Preview from "@/components/studio/Preview.jsx";
import Tabs from "@/components/studio/Tabs.jsx";
import DetailsTab from "@/components/studio/DetailsTab.jsx";
import ProductsTab from "@/components/studio/ProductsTab.jsx";
import StepsTab from "@/components/studio/StepsTab.jsx";

/**
 * ✅ UPDATE THESE ONLY IF YOUR SUPABASE STORAGE BUCKET NAMES ARE DIFFERENT
 * - Create these buckets in Supabase Storage if you haven't:
 *   1) tutorial-videos
 *   2) tutorial-thumbnails
 */
const VIDEO_BUCKET = "tutorial-videos";
const THUMB_BUCKET = "tutorial-thumbnails";

const emptyTutorial = {
  tutorial_id: null,

  // tutorials table
  title: "",
  description: "",
  video_url: "",
  thumbnail_url: "",
  duration: "",
  category_name: "",
  tags: "",
  difficulty_level: "",

  // UI-only
  products: [],
  steps: [],
};

function safeFileExt(name = "") {
  const parts = name.split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
}

function makeStoragePath(prefix, file) {
  const ext = safeFileExt(file?.name);
  const id = crypto?.randomUUID ? crypto.randomUUID() : String(Date.now());
  const safeExt = ext ? `.${ext}` : "";
  return `${prefix}/${id}${safeExt}`;
}

async function uploadToBucket(bucket, path, file) {
  // Upload
  const { error: upErr } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      upsert: true,
      cacheControl: "3600",
      contentType: file?.type || "application/octet-stream",
    });
  if (upErr) throw upErr;

  // Public URL (works if bucket is public)
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  const publicUrl = data?.publicUrl;

  if (!publicUrl) {
    throw new Error(
      `Uploaded, but could not generate a public URL. Make sure bucket "${bucket}" is public or switch to signed URLs.`
    );
  }

  return publicUrl;
}

export default function StudioEditor() {
  const params = useSearchParams();
  const tutorialIdParam = params.get("id");
  const tutorialId = tutorialIdParam ? Number(tutorialIdParam) : null;

  const mode = useMemo(() => (tutorialId ? "edit" : "create"), [tutorialId]);

  const [activeTab, setActiveTab] = useState("details");
  const [tutorial, setTutorial] = useState(emptyTutorial);

  // file state (uploaded from computer)
  const [videoFile, setVideoFile] = useState(null);
  const [thumbFile, setThumbFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // LOAD (edit mode)
  useEffect(() => {
    let ignore = false;

    async function loadTutorial() {
      setStatusMsg("");

      if (!tutorialId) {
        setTutorial({ ...emptyTutorial });
        setVideoFile(null);
        setThumbFile(null);
        return;
      }

      setLoading(true);

      const { data: tData, error: tErr } = await supabase
        .from("tutorials")
        .select("*")
        .eq("tutorial_id", tutorialId)
        .single();

      if (ignore) return;

      if (tErr) {
        console.error("Load tutorials error:", tErr);
        setTutorial({ ...emptyTutorial });
        setStatusMsg("Could not load tutorial. Showing a new draft.");
        setLoading(false);
        return;
      }

      const { data: sData, error: sErr } = await supabase
        .from("tutorialsteps")
        .select("step_number, description")
        .eq("tutorial_id", tutorialId)
        .order("step_number", { ascending: true });

      if (ignore) return;
      if (sErr) console.error("Load tutorialsteps error:", sErr);

      const steps = Array.isArray(sData)
        ? sData.map((s) => ({
            step_number: Number(s.step_number),
            description: s.description ?? "",
          }))
        : [];

      const { data: tpData, error: tpErr } = await supabase
        .from("tutorialproducts")
        .select("product_id")
        .eq("tutorial_id", tutorialId);

      if (ignore) return;
      if (tpErr) console.error("Load tutorialproducts error:", tpErr);

      const productIds = Array.isArray(tpData)
        ? tpData.map((x) => x.product_id).filter(Boolean)
        : [];

      let products = [];
      if (productIds.length) {
        const { data: pData, error: pErr } = await supabase
          .from("products")
          .select("product_id, name, price")
          .in("product_id", productIds);

        if (pErr) {
          console.error("Load products (for tutorial) error:", pErr);
          products = productIds.map((id) => ({
            product_id: id,
            name: id,
            price: 0,
          }));
        } else {
          const map = new Map((pData || []).map((p) => [p.product_id, p]));
          products = productIds.map((id) => {
            const p = map.get(id);
            return {
              product_id: id,
              name: p?.name ?? id,
              price: Number(p?.price ?? 0),
            };
          });
        }
      }

      setTutorial({
        ...emptyTutorial,
        ...tData,
        tutorial_id: tData.tutorial_id,
        products,
        steps,
      });

      // files should start empty (user uploads if they want to replace)
      setVideoFile(null);
      setThumbFile(null);

      setLoading(false);
    }

    loadTutorial();
    return () => {
      ignore = true;
    };
  }, [tutorialId]);

  function resetDraft() {
    if (mode === "edit") {
      setStatusMsg("Tip: refresh the page to reload saved values.");
    } else {
      setTutorial({ ...emptyTutorial });
      setVideoFile(null);
      setThumbFile(null);
      setStatusMsg("Draft cleared.");
    }
  }

  async function saveTutorial() {
    setStatusMsg("");

    // ✅ Minimal required fields
    if (!tutorial.title.trim()) {
      setStatusMsg("Please add a title.");
      return;
    }

    // For create: require a video file (since you said there is no URL typed)
    if (mode === "create" && !videoFile) {
      setStatusMsg("Please upload a video file before submitting.");
      return;
    }

    setLoading(true);

    try {
      const now = new Date().toISOString();

      // 1) Upload files if provided
      let nextVideoUrl = tutorial.video_url || "";
      let nextThumbUrl = tutorial.thumbnail_url || "";

      // Upload video if user selected one
      if (videoFile) {
        const path = makeStoragePath("videos", videoFile);
        nextVideoUrl = await uploadToBucket(VIDEO_BUCKET, path, videoFile);
      }

      // Upload thumbnail if user selected one
      if (thumbFile) {
        const path = makeStoragePath("thumbnails", thumbFile);
        nextThumbUrl = await uploadToBucket(THUMB_BUCKET, path, thumbFile);
      }

      // 2) Upsert tutorials row
      let savedTutorialId = tutorial.tutorial_id;

      if (mode === "create") {
        const insertPayload = {
          title: tutorial.title.trim(),
          description: tutorial.description || null,
          video_url: nextVideoUrl || null,
          thumbnail_url: nextThumbUrl || null,
          duration: tutorial.duration || null,
          category_name: tutorial.category_name || null,
          tags: tutorial.tags || null,
          difficulty_level: tutorial.difficulty_level || null,
          created_at: now,
          updated_at: now,
          // creator_id: keep null unless you want to set from your auth/session
        };

        const { data, error } = await supabase
          .from("tutorials")
          .insert([insertPayload])
          .select("tutorial_id")
          .single();

        if (error) throw error;

        savedTutorialId = data.tutorial_id;

        setTutorial((prev) => ({
          ...prev,
          tutorial_id: savedTutorialId,
          video_url: nextVideoUrl,
          thumbnail_url: nextThumbUrl,
        }));
      } else {
        const updatePayload = {
          title: tutorial.title.trim(),
          description: tutorial.description || null,
          video_url: nextVideoUrl || null,
          thumbnail_url: nextThumbUrl || null,
          duration: tutorial.duration || null,
          category_name: tutorial.category_name || null,
          tags: tutorial.tags || null,
          difficulty_level: tutorial.difficulty_level || null,
          updated_at: now,
        };

        const { error } = await supabase
          .from("tutorials")
          .update(updatePayload)
          .eq("tutorial_id", savedTutorialId);

        if (error) throw error;

        setTutorial((prev) => ({
          ...prev,
          video_url: nextVideoUrl,
          thumbnail_url: nextThumbUrl,
        }));
      }

      // 3) Replace tutorialsteps
      await supabase
        .from("tutorialsteps")
        .delete()
        .eq("tutorial_id", savedTutorialId);

      const stepsPayload = (tutorial.steps || [])
        .map((s, idx) => ({
          tutorial_id: savedTutorialId,
          step_number: idx + 1,
          title: null,
          description: (s.description || "").trim() || null,
        }))
        .filter((s) => s.description);

      if (stepsPayload.length) {
        const { error } = await supabase
          .from("tutorialsteps")
          .insert(stepsPayload);
        if (error) throw error;
      }

      // 4) Replace tutorialproducts
      await supabase
        .from("tutorialproducts")
        .delete()
        .eq("tutorial_id", savedTutorialId);

      const tpPayload = (tutorial.products || [])
        .map((p) => p.product_id)
        .filter(Boolean)
        .map((product_id) => ({ tutorial_id: savedTutorialId, product_id }));

      if (tpPayload.length) {
        const { error } = await supabase
          .from("tutorialproducts")
          .insert(tpPayload);
        if (error) throw error;
      }

      // clear selected files after successful save
      setVideoFile(null);
      setThumbFile(null);

      setStatusMsg(
        mode === "create" ? "Submitted! Tutorial created." : "Saved!"
      );
    } catch (e) {
      console.error("Save tutorial error:", e);
      setStatusMsg(e?.message || "Submit failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 mt-10 mb-20">
      <div className="flex items-start justify-between gap-6 mb-6">
        <div>
          <p className="text-xs tracking-[0.22em] text-gray-400 uppercase">
            Studio
          </p>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === "create" ? "Create a tutorial" : "Edit tutorial"}
          </h1>
          {tutorialId ? (
            <p className="text-sm text-gray-500 mt-1">
              Tutorial ID: {tutorialId}
            </p>
          ) : (
            <p className="text-sm text-gray-500 mt-1">New draft</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {statusMsg ? (
            <span className="text-sm text-gray-700">{statusMsg}</span>
          ) : (
            <span className="text-sm text-gray-400">
              {loading ? "Working…" : "Ready"}
            </span>
          )}

          <button
            type="button"
            onClick={resetDraft}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={saveTutorial}
            disabled={loading}
            className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? "Submitting…" : "Submit"}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-[420px] shrink-0">
          <Preview
            tutorial={tutorial}
            videoFile={videoFile}
            thumbFile={thumbFile}
          />
        </div>

        <div className="flex-1">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
            {activeTab === "details" && (
              <DetailsTab
                tutorial={tutorial}
                setTutorial={setTutorial}
                mode={mode}
                videoFile={videoFile}
                setVideoFile={setVideoFile}
                thumbFile={thumbFile}
                setThumbFile={setThumbFile}
              />
            )}

            {activeTab === "products" && (
              <ProductsTab tutorial={tutorial} setTutorial={setTutorial} />
            )}

            {activeTab === "steps" && (
              <StepsTab tutorial={tutorial} setTutorial={setTutorial} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
