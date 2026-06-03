"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import VideoCard from "@/components/ui/VideoCard.jsx";
import { data } from "@/data/videos.js";
import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function TutorialCarousel() {
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
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Creativity Begins Here
        </h2>

        <Carousel className="relative mt-12 mb-20">
          <CarouselPrevious />
          <CarouselContent className="flex gap-8">
            {videos.map((v) => (
              <CarouselItem key={v.id} className="basis-85 sm:basis-95 lg:basis-107.75">
                <div
                  className="
                    rounded-3xl
                    p-4
                    bg-transparent
                    hover:bg-[#FFF1DC]
                    transition-colors
                    duration-300
                  "
                  style={{ width: "431px" }}
                >
                  <div
                    className="
                      rounded-2xl
                      overflow-hidden
                    "
                  >
                    <VideoCard v={v} />
                  </div>
                </div>
              </CarouselItem>

            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
