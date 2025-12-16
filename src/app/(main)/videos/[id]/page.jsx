"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import supabase from "@/lib/supabaseClient";

import VideoPlayer from "@/components/video/VideoPlayer.jsx";
import Link from "next/link.js";
import { ThumbsUp, ThumbsDown, Bookmark, Redo2, Dot } from "lucide-react";
import { timeAgo } from "@/scripts/helper-functions.js";
import Steps from "@/components/video/Steps.jsx";
import SmallProductCard from "@/components/ui/SmallProductCard.jsx";

function normalizePublicUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  if (url.startsWith("/")) return url;
  return `/${url}`;
}

async function incrementTutorialField(tutorialId, field) {
  const { data, error } = await supabase
    .from("tutorials")
    .select(field)
    .eq("tutorial_id", tutorialId)
    .single();

  if (error) throw error;

  const next = (data[field] || 0) + 1;

  const { error: updErr } = await supabase
    .from("tutorials")
    .update({ [field]: next })
    .eq("tutorial_id", tutorialId);

  if (updErr) throw updErr;

  return next;
}

export default function Video() {
  const { id } = useParams();

  const tutorialId = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) ? n : null;
  }, [id]);

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    let alive = true;

    async function loadVideo() {
      if (!tutorialId) {
        setLoading(false);
        return;
      }

      try {
        const { data: tut } = await supabase
          .from("tutorials")
          .select("*")
          .eq("tutorial_id", tutorialId)
          .single();

        if (!tut) throw new Error("Not found");

        const { data: creator } = await supabase
          .from("users")
          .select("user_id, name, avatar_url, followers_count")
          .eq("user_id", tut.creator_id)
          .maybeSingle();

        const { data: steps } = await supabase
          .from("tutorialsteps")
          .select("step_number, description")
          .eq("tutorial_id", tutorialId)
          .order("step_number");

        const { data: tp } = await supabase
          .from("tutorialproducts")
          .select("product_id")
          .eq("tutorial_id", tutorialId);

        let products = [];
        if (tp?.length) {
          const ids = tp.map((x) => x.product_id);
          const { data: prod } = await supabase
            .from("products")
            .select("product_id, name, price, images")
            .in("product_id", ids);

          products =
            prod?.map((p) => ({
              productId: p.product_id,
              name: p.name,
              price: p.price,
              images: (Array.isArray(p.images) ? p.images : [p.images])
                .filter(Boolean)
                .map(normalizePublicUrl),
            })) ?? [];
        }

        if (!alive) return;

        setVideo({
          id: tut.tutorial_id,
          thumbnail:
            normalizePublicUrl(tut.thumbnail_url) ||
            "/images/thumbnail/video-placeholder.png",
          src: normalizePublicUrl(tut.video_url),
          title: tut.title,
          likes: tut.likes ?? 0,
          dislikes: tut.dislikes ?? 0,
          views: tut.views ?? 0,
          created_at: tut.created_at,
          description: tut.description,
          steps:
            steps?.map((s) => ({
              number: s.step_number,
              text: s.description,
            })) ?? [],
          products,
          creator: {
            id: creator?.user_id ?? tut.creator_id,
            full_name: creator?.name ?? "Unknown",
            avatar_url:
              creator?.avatar_url || "/images/users/default-avatar.png",
            followers: creator?.followers_count ?? 0,
          },
        });
      } catch (err) {
        console.error(err);
        if (alive) setVideo(null);
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadVideo();
    return () => (alive = false);
  }, [tutorialId]);

  useEffect(() => {
    if (!video?.id) return;

    const key = `viewed_${video.id}`;
    if (localStorage.getItem(key)) return;

    localStorage.setItem(key, "1");

    incrementTutorialField(video.id, "views")
      .then((next) => setVideo((v) => ({ ...v, views: next })))
      .catch(console.error);
  }, [video?.id]);

  const handleLike = async () => {
    const key = `liked_${video.id}`;
    if (localStorage.getItem(key)) return;

    localStorage.setItem(key, "1");
    const next = await incrementTutorialField(video.id, "likes");
    setVideo((v) => ({ ...v, likes: next }));
  };

  const handleDislike = async () => {
    const key = `disliked_${video.id}`;
    if (localStorage.getItem(key)) return;

    localStorage.setItem(key, "1");
    const next = await incrementTutorialField(video.id, "dislikes");
    setVideo((v) => ({ ...v, dislikes: next }));
  };

  const handleFollow = () => {
    setIsFollowing((f) => !f);
    setVideo((v) => ({
      ...v,
      creator: {
        ...v.creator,
        followers: v.creator.followers + (isFollowing ? -1 : 1),
      },
    }));
  };

  if (!loading && !video) {
    return (
      <div className="max-w-4xl mx-auto mt-20 text-center">
        <h1 className="text-2xl font-bold">Video not found</h1>
        <Link href="/videos" className="text-primary underline">
          Go back to videos
        </Link>
      </div>
    );
  }

  if (loading) return null;

  return (
    <div className="max-w-7xl p-10 mx-auto mt-10 mb-12 flex flex-col lg:flex-row gap-8">
      <div className="left-col flex-1">
        <div className="mb-4">
          <VideoPlayer video={video.src} thumbnail={video.thumbnail} />
        </div>
        <div>
          <h1 className="text-[20px] font-bold mb-1">{video.title}</h1>
          <div className="flex justify-between items-center mb-2 flex-wrap gap-4">
            <div className="user-info flex gap-4 items-center">
              <div className="user-avatar-container h-12.5 w-12.5 rounded-full overflow-hidden">
                <img
                  src={video.creator.avatar_url}
                  alt={`${video.creator.full_name} Headshot`}
                  className="user-avatar"
                />
              </div>
              <div className="flex flex-col mr-4">
                <Link className="video__profile-link" href="/profile">
                  {video.creator.full_name}
                </Link>
                <span className="text-sm text-gray-500">
                  {video.creator.followers} Followers
                </span>
              </div>

              <button className="btn-primary" onClick={handleFollow}>
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center shadow-[0_0px_12px_rgba(0,0,0,0.25)] rounded-full">
                <button
                  onClick={handleLike}
                  className="flex items-center justify-center border-r border-r-gray-200 gap-2 py-2 px-4 rounded-l-full cursor-pointer hover:bg-gray-100"
                >
                  <ThumbsUp size={18} />
                  {video.likes}
                </button>
                <button
                  onClick={handleDislike}
                  className="flex items-center justify-center gap-2 py-2 px-4 rounded-r-full cursor-pointer hover:bg-gray-100"
                >
                  <ThumbsDown size={18} />
                </button>
              </div>
              <button className="shadow-[0_0px_12px_rgba(0,0,0,0.25)] flex items-center justify-center gap-2 py-2 px-4 rounded-full cursor-pointer hover:bg-gray-100">
                <Redo2 size={18} /> Share
              </button>
              <button className="shadow-[0_0px_12px_rgba(0,0,0,0.25)] flex items-center justify-center gap-2 py-2 px-4 rounded-full cursor-pointer hover:bg-gray-100">
                <Bookmark size={18} /> Save
              </button>
            </div>
          </div>
          <div className="description bg-gray-100 p-4 rounded-lg mb-4">
            <div className="flex items-center gap-0.5 font-semibold text-gray-600 mb-2 text-sm">
              <span>{video.views} views</span>
              <Dot />
              <span>{timeAgo(video.created_at)}</span>
            </div>
            <p className="text-gray-500 text-sm">{video.description}</p>
          </div>
        </div>

        <Steps steps={video.steps} />
      </div>
      <div className="right-col max-w-sm w-full">
        <div className="p-4 bg-orange-50 rounded-2xl">
          <h2 className="text-md font-bold mb-6 pl-4 pt-4">
            What You will Need:
          </h2>
          <div className="flex flex-col border-b border-gray-800 last:border-b-0">
            {video.products.map((p) => (
              <SmallProductCard key={p.productId} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
