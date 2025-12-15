"use client";
import React from "react";
import Link from "next/link"; 
import { tutorials } from "@/data/tutorials"; 
import { ArrowRight } from "lucide-react";
import { HeartIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/solid";
import VideoCard from "@/components/ui/VideoCard.jsx";
import { data } from "@/data/videos.js";

export default function FeaturedSection() {
  const featured = data.slice(2, 5);

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary">
            Featured Tutorials
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