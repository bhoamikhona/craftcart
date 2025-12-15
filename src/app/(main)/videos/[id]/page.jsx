import VideoPlayer from "@/components/video/VideoPlayer.jsx";
import Link from "next/link.js";
import { ThumbsUp, ThumbsDown, Bookmark, Redo2, Dot } from "lucide-react";
import { timeAgo } from "@/scripts/helper-functions.js";
import Steps from "@/components/video/Steps.jsx";
import SmallProductCard from "@/components/ui/SmallProductCard.jsx";

const data = [
  {
    id: 1,
    thumbnail: "/images/thumbnail/valentine-greeting-card.png",
    src: "https://bwghxdlvuijbpsjjhnvx.supabase.co/storage/v1/object/public/tutorial-videos/9/9-1765743355613.mp4",
    title: "Valentine Greeting Card",
    likes: 23,
    views: 100,
    created_at: "2025-12-15T00:00:00Z",
    description:
      "In this tutorial, you’ll make a premium-looking Valentine greeting card using cardstock, adhesive, and a few basic tools. We’ll cover clean cutting, neat layering, and simple finishing touches so it looks store-bought but still handmade.",
    steps: [
      {
        number: 1,
        text: "Cut the cardstock to size.",
      },
      {
        number: 2,
        text: "Fold and glue the layers.",
      },
    ],
    products: [
      {
        productId: "prod-001",
        name: "Stainless Steel Scissors",
        price: 12.99,
        images: [
          "/images/products/prod-001/445x448/scissor-1.png",
          "/images/products/prod-001/445x448/scissor-2.png",
        ],
      },
      {
        productId: "prod-011",
        name: "Wooden Ruler",
        price: 3.49,
        images: [
          "/images/products/prod-011/445x448/ruler-1.png",
          "/images/products/prod-011/445x448/ruler-2.png",
          "/images/products/prod-011/445x448/ruler-3.png",
        ],
      },
      {
        productId: "prod-003",
        name: "Cardstock Pack",
        price: 14.25,
        images: [
          "/images/products/prod-003/445x448/papers-1.png",
          "/images/products/prod-003/445x448/papers-2.png",
          "/images/products/prod-003/445x448/papers-3.png",
          "/images/products/prod-003/445x448/papers-4.png",
        ],
      },
    ],

    creator: {
      id: 9,
      full_name: "Bhoami K Khona",
      avatar_url: "/images/users/1.jpg",
      followers: 200,
    },
  },
];

export default function Video() {
  return (
    <div className="max-w-7xl p-10 mx-auto mt-10 mb-12 flex gap-8">
      <div className="left-col flex-1">
        <div className="mb-4">
          <VideoPlayer video={data[0].src} thumbnail={data[0].thumbnail} />
        </div>
        <div>
          <h1 className="text-[20px] font-bold mb-1">{data[0].title}</h1>
          <div className="flex justify-between items-center mb-2">
            <div className="user-info flex gap-4 items-center">
              <div className="user-avatar-container h-12.5 w-12.5 rounded-full overflow-hidden">
                <img
                  src={data[0].creator.avatar_url}
                  alt={`${data[0].creator.full_name} Headshot`}
                  className="user-avatar"
                />
              </div>
              <div className="flex flex-col mr-4">
                <Link className="video__profile-link" href="/profile">
                  {data[0].creator.full_name}
                </Link>
                <span className="text-sm text-gray-500">
                  {data[0].creator.followers} Followers
                </span>
              </div>

              <button className="btn-primary">Follow</button>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center shadow-[0_0px_12px_rgba(0,0,0,0.25)] rounded-full">
                <button className="flex items-center justify-center border-r border-r-gray-200 gap-2 py-2 px-4 rounded-l-full cursor-pointer hover:bg-gray-100">
                  <ThumbsUp size={18} />
                  {data[0].likes}
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
              <span>{data[0].views} views</span>
              <Dot />
              <span>{timeAgo(data[0].created_at)}</span>
            </div>
            <p className="text-gray-500 text-sm">{data[0].description}</p>
          </div>
        </div>

        <div>
          <Steps steps={data[0].steps} />
        </div>
      </div>
      <div className="right-col max-w-sm">
        <div className="p-4 bg-orange-50 rounded-2xl">
          <h2 className="text-md font-bold mb-6 pl-4 pt-4">
            What You will Need:
          </h2>
          <div className="flex flex-col border-b border-gray-800 last:border-b-0">
            {data[0].products.map((p) => (
              <SmallProductCard key={p.name} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
