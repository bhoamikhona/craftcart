// "use client";

// import { useEffect, useState } from "react";
// import supabase from "@/lib/supabaseClient";
// import Sidebar, { SidebarItem } from "@/components/ui/Sidebar";
// import VideoCard from "@/components/ui/VideoCard";
// import SearchBar from "@/components/ui/SearchBar";
// import { LayoutGrid, CheckCircle, Tag } from "lucide-react";

// function toEmbed(url) {
//   if (!url) return null;
//   if (url.includes("embed")) return url;
//   if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
//   if (url.includes("youtu.be/"))
//     return `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
//   return url;
// }

// export default function VideosPage() {
//   const [videos, setVideos] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   // const [activeVideo, setActiveVideo] = useState(null);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     async function load() {
//       const { data } = await supabase
//         .from("tutorials")
//         .select("*")
//         .not("thumbnail_url", "is", null)
//         .not("video_url", "is", null);

//       setVideos(data || []);
//       setFiltered(data || []);
//     }

//     load();
//   }, []);

//   useEffect(() => {
//     if (!search.trim()) {
//       setFiltered(videos);
//       return;
//     }

//     const q = search.toLowerCase();

//     setFiltered(
//       videos.filter((v) =>
//         [v.title, v.category_name, v.tags, v.difficulty_level]
//           .filter(Boolean)
//           .some((field) => field.toLowerCase().includes(q))
//       )
//     );
//   }, [search, videos]);

//   return (
//     <main className="flex gap-6 my-12">
//       {/* <div className="z-10">
//         <Sidebar>
//           <SidebarItem
//             icon={<LayoutGrid size={18} />}
//             text="Category"
//             checkList={[
//               "Paper Crafts",
//               "Yarn & Fabric",
//               "Clay & Resin",
//               "Kids Crafts",
//             ]}
//           />
//           <SidebarItem
//             icon={<CheckCircle size={18} />}
//             text="Difficulty"
//             checkList={["Beginner", "Intermediate", "Advanced"]}
//           />
//           <SidebarItem
//             icon={<Tag size={18} />}
//             text="Availability"
//             checkList={["Free", "Premium"]}
//           />
//         </Sidebar>
//       </div> */}

//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-12">
//         <SearchBar
//           value={search}
//           onChange={setSearch}
//           onSearch={() => {}}
//           placeholder="Search craft videos"
//         />

//         <div className=" grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
//           {filtered.map((video) => (
//             <VideoCard
//               key={video.tutorial_id}
//               video={video}
//               // onClick={() => setActiveVideo(video)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* {activeVideo && (
//         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
//           <div className="relative w-[90%] max-w-5xl bg-black rounded-xl">
//             <button
//               onClick={() => setActiveVideo(null)}
//               className="absolute top-3 right-4 text-white text-2xl z-10"
//             >
//               ×
//             </button>

//             <iframe
//               src={toEmbed(activeVideo.video_url)}
//               className="w-full h-[70vh]"
//               allowFullScreen
//             />
//           </div>
//         </div>
//       )} */}
//     </main>
//   );
// }
