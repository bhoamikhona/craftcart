import VideoCard from "@/components/ui/VideoCard.jsx";
import { data } from "@/data/videos.js";

export default function Videos() {
  return (
    <div
      className="
        max-w-7xl
        mx-auto
        px-4 sm:px-6 lg:px-8
        mt-12 mb-20
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6 lg:gap-12
      "
    >
      {data.map((v) => (
        <VideoCard key={v.id} v={v} />
      ))}
    </div>
  );
}
