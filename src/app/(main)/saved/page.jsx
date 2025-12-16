"use client";

import useSavedVideos from "@/hooks/useSavedVideos";
import VideoCard from "@/components/ui/VideoCard";

export default function Saved() {
  const { savedVideos } = useSavedVideos();

  if (!savedVideos.length) {
    return (
      <div className="p-10 text-center text-gray-500">
        No saved videos yet
      </div>
    );
  }

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedVideos.map((v) => (
        <VideoCard key={v.id} v={v} />
      ))}
    </div>
  );
}
