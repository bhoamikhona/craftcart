import VideoPlayer from "@/components/video/VideoPlayer.jsx";
import Link from "next/link.js";
import { ThumbsUp, ThumbsDown, Bookmark, Redo2, Dot } from "lucide-react";
import { timeAgo } from "@/scripts/helper-functions.js";
import Steps from "@/components/video/Steps.jsx";
import SmallProductCard from "@/components/ui/SmallProductCard.jsx";
import { data } from "@/data/videos.js";

export default async function Video({params}) {

  const { id } = await params;

  const video = data.find(
    (video) => String(video.id) === id
  );

  if (!video) {
    return (
      <div className="max-w-4xl mx-auto mt-20 text-center">
        <h1 className="text-2xl font-bold">Video not found</h1>
        <Link href="/videos" className="text-primary underline">
          Go back to videos
        </Link>
        
      </div>
    );
  }
  return (
    <div className="max-w-7xl p-10 mx-auto mt-10 mb-12 flex gap-8">
      <div className="left-col flex-1">
        <div className="mb-4">
          <VideoPlayer video={video.src} thumbnail={video.thumbnail} />
        </div>
        <div>
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

              <button className="btn-primary">Follow</button>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center shadow-[0_0px_12px_rgba(0,0,0,0.25)] rounded-full">
                <button className="flex items-center justify-center border-r border-r-gray-200 gap-2 py-2 px-4 rounded-l-full cursor-pointer hover:bg-gray-100">
                  <ThumbsUp size={18} />
                  {video.likes}
                </button>
                <button className="flex items-center justify-center gap-2 py-2 px-4 rounded-r-full cursor-pointer h-full hover:bg-gray-100">
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
          <div className="description bg-gray-[#f8f8f8] p-2 rounded-lg mb-4">
            <div className="flex items-center gap-0.5 font-semibold text-gray-600 mb-2 text-sm">
              <span>{video.views} views</span>
              <Dot />
              <span>{timeAgo(video.created_at)}</span>
            </div>
            <p className="text-gray-500 text-sm">{video.description}</p>
          </div>
        </div>

        <div>
          <Steps steps={video.steps} />
        </div>
      </div>
      <div className="right-col max-w-sm">
        <div className="p-4 bg-orange-50 rounded-2xl">
          <h2 className="text-md font-bold mb-6 pl-4 pt-4">
            What You will Need:
          </h2>
          <div className="flex flex-col border-b border-gray-800 last:border-b-0">
            {video.products.map((p) => (
              <SmallProductCard key={p.name} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
