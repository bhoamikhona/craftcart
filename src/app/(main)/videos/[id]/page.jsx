"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import supabase from "@/lib/supabaseClient";

import VideoPlayer from "@/components/video/VideoPlayer.jsx";
import Link from "next/link.js";
import { Dot } from "lucide-react";
import { timeAgo } from "@/scripts/helper-functions.js";
import Steps from "@/components/video/Steps.jsx";
import SmallProductCard from "@/components/ui/SmallProductCard.jsx";
import VideoActions from "@/components/video/VideoActions.jsx";

function normalizePublicUrl(url) {
  if (!url) return url;
  if (url.startsWith("http")) return url;
  if (url.startsWith("/")) return url;
  return `/${url}`;
}

export default function Video() {
  const { id } = useParams();

  const tutorialId = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) ? n : null;
  }, [id]);

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function loadVideo() {
      if (!tutorialId) {
        setLoading(false);
        setVideo(null);
        return;
      }

      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("tutorials")
          .select(
            `
            tutorial_id,
            title,
            description,
            video_url,
            thumbnail_url,
            likes,
            created_at,
            creator_id,
            users:creator_id (
              user_id,
              name,
              avatar_url,
              followers_count
            ),
            tutorialsteps (
              step_number,
              description
            ),
            tutorialproducts (
              product_id,
              products:product_id (
                product_id,
                name,
                description,
                measurements,
                quantity,
                in_stock,
                price,
                currency,
                category,
                rating,
                review_count,
                material,
                brand,
                images,
                discount_percent,
                discount_price,
                on_sale,
                specs
              )
            )
          `
          )
          .eq("tutorial_id", tutorialId)
          .single();

        if (error) throw error;

        const mapped = {
          id: data.tutorial_id,
          title: data.title,
          description: data.description,
          src: data.video_url,
          thumbnail:
            data.thumbnail_url || "/images/thumbnail/video-placeholder.png",
          created_at: data.created_at,
          likes: data.likes ?? 0,
          views: data.views ?? 0,

          creator: {
            id: data.users?.user_id ?? data.creator_id ?? null,
            full_name: data.users?.name ?? "Unknown",
            avatar_url:
              data.users?.avatar_url || "/images/users/default-avatar.png",
            followers: data.users?.followers_count ?? 0,
          },

          steps: (data.tutorialsteps || [])
            .slice()
            .sort((a, b) => (a.step_number ?? 0) - (b.step_number ?? 0))
            .map((s) => ({
              number: s.step_number,
              text: s.description,
            })),

          products: (data.tutorialproducts || [])
            .map((tp) => tp.products)
            .filter(Boolean)
            .map((p) => {
              const rawImages = Array.isArray(p.images)
                ? p.images
                : p.images
                ? [p.images]
                : [];

              return {
                productId: p.product_id,
                name: p.name,
                description: p.description,
                measurements: p.measurements,
                quantity: p.quantity,
                inStock: p.in_stock,
                price: p.price,
                currency: p.currency,
                category: p.category,
                rating: p.rating,
                reviewCount: p.review_count,
                material: p.material,
                brand: p.brand,
                images: rawImages.map(normalizePublicUrl),
                discountPercent: p.discount_percent ?? 0,
                discountPrice: p.discount_price ?? null,
                onSale: p.on_sale ?? false,
                specs: p.specs ?? null,
              };
            }),
        };

        if (alive) setVideo(mapped);
      } catch (err) {
        console.error("Failed to load video:", err);
        if (alive) setVideo(null);
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadVideo();
    return () => {
      alive = false;
    };
  }, [tutorialId]);

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
    <div className="max-w-7xl p-10 mx-auto mt-10 mb-12 flex gap-8">
      <div className="left-col flex-1">
        <div className="mb-4">
          <VideoPlayer video={video.src} thumbnail={video.thumbnail} />
        </div>

        <h1 className="text-[20px] font-bold mb-1">{video.title}</h1>

        <div className="flex justify-between items-center mb-2">
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
          </div>

          <VideoActions video={video} />
        </div>

        <div className="description bg-gray-[#f8f8f8] p-2 rounded-lg mb-4">
          <div className="flex items-center gap-0.5 font-semibold text-gray-600 mb-2 text-sm">
            <span>{video.views} views</span>
            <Dot />
            <span>{timeAgo(video.created_at)}</span>
          </div>
          <p className="text-gray-500 text-sm">{video.description}</p>
        </div>

        <Steps steps={video.steps} />
      </div>

      <div className="right-col max-w-sm">
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
