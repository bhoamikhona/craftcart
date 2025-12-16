"use client";

import Link from "next/link.js";
import "./ui-styles/ProductCard.css";
import { timeAgo } from "@/scripts/helper-functions.js";
import { Dot, Bookmark } from "lucide-react";
import useSavedVideos from "@/hooks/useSavedVideos";

export default function VideoCard({ v }) {
  const { isSaved, saveVideo, unsaveVideo } = useSavedVideos();
  const saved = isSaved(v.id);

  const toggleSave = (e) => {
    e.preventDefault(); // do not navigate
    e.stopPropagation();

    if (saved) {
      unsaveVideo(v.id);
    } else {
      saveVideo(v);
    }
  };

  return (
    <Link className="product-link group" href={`/videos/${v.id}`}>
      <div
        className="
          video-card relative w-100
          after:content-['']
          after:absolute
          after:-top-6 after:-bottom-4 after:-left-4 after:-right-4
          after:rounded-[1.2rem]
          after:bg-orange-100
          after:opacity-0
          after:-z-10
          group-hover:after:opacity-100
          after:transition-opacity
          after:duration-300
        "
      >
        <div className="relative">
          <div className="video-card-img-container w-full h-[225px] rounded-lg overflow-hidden mb-2.5">
            <img src={v.thumbnail} alt={v.title} />
          </div>

          <div
            onClick={toggleSave}
            className="absolute top-0 right-0 bg-white h-12 w-10 rounded-bl-2xl rounded-tr-md flex items-center justify-center cursor-pointer"
          >
            {saved ? (
              <Bookmark fill="#ff6600" stroke="#ff6600" />
            ) : (
              <Bookmark stroke="#ff6600" />
            )}
          </div>
        </div>

        <div className="flex gap-3 items-center w-full">
          <div className="avatar-img-container w-12 h-12 overflow-hidden rounded-full">
            <img src={v.creator.avatar_url} alt={v.creator.full_name} />
          </div>

          <div>
            <h2 className="font-bold">{v.title}</h2>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span>{v.views} Views</span>
              <Dot className="w-4 h-4" />
              <span>{timeAgo(v.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
