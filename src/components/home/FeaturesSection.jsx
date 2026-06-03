"use client";
import React from "react";
import Link from "next/link";
import { tutorials } from "@/data/tutorials";
import { ArrowRight } from "lucide-react";
import { HeartIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/solid";
import VideoCard from "@/components/ui/VideoCard.jsx";
import { useEffect, useState } from "react";
// import { data } from "@/data/videos.js";
import supabase from "@/lib/supabaseClient";

export default function FeaturedSection() {
  // const featured = data.slice(2, 5);
  const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      let isMounted = true;
  
      async function loadVideos() {
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
                avatar_url
              )
            `
            )
            .order("created_at", { ascending: false });
  
          if (error) throw error;
  
          const mapped = (data || []).map((row) => ({
            id: row.tutorial_id,
            title: row.title,
            description: row.description,
            video_url: row.video_url,
            thumbnail:
              row.thumbnail_url || "/images/thumbnail/video-placeholder.png",
            created_at: row.created_at,
            likes: row.likes ?? 0,
            creator: {
              id: row.users?.user_id ?? row.creator_id ?? null,
              full_name: row.users?.name ?? "Unknown",
              avatar_url:
                row.users?.avatar_url || "/images/users/default-avatar.png",
            },
          }));
  
          if (isMounted) setVideos(mapped);
        } catch (err) {
          console.error("Failed to load tutorials:", err);
          toast.error("Failed to load videos.");
          if (isMounted) setVideos([]);
        } finally {
          if (isMounted) setLoading(false);
        }
      }
  
      loadVideos();
  
      return () => {
        isMounted = false;
      };
    }, []); 
  const featured = videos.slice(2,5);
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Let{"'"}s Make Something Beautiful
          </h2>
          <p className="text-gray-500 mt-2 text-lg">
            Hand-picked projects to spark your creativity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featured.map((v) => (
            <VideoCard key={v.id} v={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
