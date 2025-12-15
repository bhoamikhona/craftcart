export default function VideoPlayer({ video, thumbnail }) {
  return (
    <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden">
      <video
        src={video}
        poster={thumbnail}
        controls
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
  );
}
