// export default function TutorialVideo({ video, thumbnails }) {
//   return (
//     <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden">
//       <img src={thumbnails[0]} alt="Video thumbnail" className="w-full h-full object-cover" />
//       <button className="absolute inset-0 flex items-center justify-center text-white text-4xl">
//         ▶
//       </button>
//     </div>
//   );
// }
export default function TutorialVideo({ video, thumbnails }) {
  return (
    <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden">
      <video
        src={video}
        poster={thumbnails[0]}
        controls
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
  );
}
