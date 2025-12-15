import VideoCard from "@/components/ui/VideoCard.jsx";
import {data} from "@/data/videos.js";

export default function Videos() {
  return (
    <div className="mx-auto max-w-7xl grid grid-cols-3 gap-12 mt-12 mb-20">
      {data.map((v) => (
        <VideoCard key={v.id} v={v} />
      ))}
    </div>
  );
}
