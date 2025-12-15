"use client";

import { Dot } from "lucide-react";
import { timeAgo } from "@/scripts/helper-functions.js";

export default function Preview({ video }) {
  return (
    <div
      className="
        video-card relative w-full
        after:content-['']
        after:absolute
        after:-top-8 after:-bottom-4 after:-left-4 after:-right-4
        after:rounded-[1.2rem]
        after:bg-orange-100
        after:opacity-0
        after:-z-10
        hover:after:opacity-100
        after:transition-opacity after:duration-300
      "
    >
      <div className="w-full rounded-lg overflow-hidden mb-3">
        <img
          className="h-full w-full object-cover"
          src={video.thumbnail}
          alt={video.title}
        />
      </div>

      <div className="flex gap-3 items-center">
        <div className="w-12 h-12 overflow-hidden rounded-full bg-gray-200 shrink-0">
          <img
            className="h-full w-full object-cover"
            src={video.creator.avatar_url}
            alt={video.creator.full_name}
          />
        </div>

        <div className="min-w-0">
          <h2 className="font-bold leading-tight line-clamp-2">
            {video.title}
          </h2>

          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span>{video.views} Views</span>
            <Dot className="w-4 h-4" />
            <span>{timeAgo(video.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
