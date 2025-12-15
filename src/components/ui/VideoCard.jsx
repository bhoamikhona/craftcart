"use client";

export default function VideoCard({ video, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.12)] transition-all cursor-pointer"
    >
      <div className="relative">
        <img
          src={video.thumbnail_url || "/placeholder.jpg"}
          className="w-full h-52 object-cover"
        />

        {video.duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
            {video.duration}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>

        <p className="text-sm text-gray-600 mt-1">{video.category_name}</p>

        <p className="text-xs text-gray-500 mt-0.5">{video.likes || 0} likes</p>
      </div>
    </div>
  );
}
