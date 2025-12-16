"use client";

import { ThumbsUp, ThumbsDown, Bookmark, Redo2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import supabase from "@/lib/supabaseClient";
import useSavedVideos from "@/hooks/useSavedVideos";

export default function VideoActions({ video }) {
  const { data: session } = useSession();
  const { isSaved, saveVideo, unsaveVideo } = useSavedVideos();

  const videoId = video.id;
  const creatorId = video.creator.id;

  /* ---------------- STATE ---------------- */
  const [likes, setLikes] = useState(video.likes || 0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [following, setFollowing] = useState(false);

  /* ---------------- INIT FROM localStorage ---------------- */
  useEffect(() => {
    const likedVideos = JSON.parse(localStorage.getItem("liked-videos") || "[]");
    const dislikedVideos = JSON.parse(
      localStorage.getItem("disliked-videos") || "[]"
    );
    const followedCreators = JSON.parse(
      localStorage.getItem("followed-creators") || "[]"
    );

    setLiked(likedVideos.includes(videoId));
    setDisliked(dislikedVideos.includes(videoId));
    setFollowing(followedCreators.includes(creatorId));
  }, [videoId, creatorId]);

  /* ---------------- LIKE ---------------- */
  const handleLike = () => {
    let likedArr = JSON.parse(localStorage.getItem("liked-videos") || "[]");
    let dislikedArr = JSON.parse(
      localStorage.getItem("disliked-videos") || "[]"
    );

    if (liked) {
      likedArr = likedArr.filter((id) => id !== videoId);
      setLikes((prev) => prev - 1);
      setLiked(false);
    } else {
      likedArr.push(videoId);
      setLikes((prev) => prev + 1);
      setLiked(true);

      if (disliked) {
        dislikedArr = dislikedArr.filter((id) => id !== videoId);
        setDisliked(false);
      }
    }

    localStorage.setItem("liked-videos", JSON.stringify(likedArr));
    localStorage.setItem("disliked-videos", JSON.stringify(dislikedArr));
  };

  /* ---------------- DISLIKE ---------------- */
  const handleDislike = () => {
    let dislikedArr = JSON.parse(
      localStorage.getItem("disliked-videos") || "[]"
    );
    let likedArr = JSON.parse(localStorage.getItem("liked-videos") || "[]");

    if (disliked) {
      dislikedArr = dislikedArr.filter((id) => id !== videoId);
      setDisliked(false);
    } else {
      dislikedArr.push(videoId);
      setDisliked(true);

      if (liked) {
        likedArr = likedArr.filter((id) => id !== videoId);
        setLiked(false);
        setLikes((prev) => prev - 1);
      }
    }

    localStorage.setItem("disliked-videos", JSON.stringify(dislikedArr));
    localStorage.setItem("liked-videos", JSON.stringify(likedArr));
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = () => {
    if (isSaved(videoId)) {
      unsaveVideo(videoId);
    } else {
      saveVideo(video);
    }
  };

  /* ---------------- SHARE ---------------- */
  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard");
  };

  /* ---------------- FOLLOW / UNFOLLOW ---------------- */
  const handleFollow = async () => {
    if (!session?.user?.email) return;

    const email = session.user.email;
    const followedCreators = JSON.parse(
      localStorage.getItem("followed-creators") || "[]"
    );

    const wasFollowing = followedCreators.includes(creatorId);

    // update localStorage
    const updatedCreators = wasFollowing
      ? followedCreators.filter((id) => id !== creatorId)
      : [...followedCreators, creatorId];

    localStorage.setItem(
      "followed-creators",
      JSON.stringify(updatedCreators)
    );

    setFollowing(!wasFollowing);

    // get current following_count
    const { data, error } = await supabase
      .from("users")
      .select("following_count")
      .eq("email", email)
      .single();

    if (error || !data) return;

    const newCount = wasFollowing
      ? data.following_count - 1
      : data.following_count + 1;

    await supabase
      .from("users")
      .update({ following_count: newCount })
      .eq("email", email);
  };

  return (
    <div className="flex gap-4">
      {/* LIKE / DISLIKE */}
      <div className="flex items-center shadow-[0_0px_12px_rgba(0,0,0,0.25)] rounded-full overflow-hidden">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 py-2 px-4 border-r border-gray-200 hover:bg-gray-100"
        >
          <ThumbsUp
            size={18}
            className={liked ? "text-orange-500" : ""}
          />
          <span className={liked ? "text-orange-500 font-semibold" : ""}>
            {likes}
          </span>
        </button>

        <button
          onClick={handleDislike}
          className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100"
        >
          <ThumbsDown
            size={18}
            className={disliked ? "text-orange-500" : ""}
          />
        </button>
      </div>

      {/* SHARE */}
      <button
        onClick={handleShare}
        className="shadow-[0_0px_12px_rgba(0,0,0,0.25)] flex items-center gap-2 py-2 px-4 rounded-full hover:bg-gray-100"
      >
        <Redo2 size={18} /> Share
      </button>

      {/* SAVE */}
      <button
        onClick={handleSave}
        className="shadow-[0_0px_12px_rgba(0,0,0,0.25)] flex items-center gap-2 py-2 px-4 rounded-full hover:bg-gray-100"
      >
        <Bookmark
          size={18}
          fill={isSaved(videoId) ? "#ff6600" : "none"}
          stroke={isSaved(videoId) ? "none" : "currentColor"}
        />
        Save
      </button>

      {/* FOLLOW */}
      <button onClick={handleFollow} className="btn-primary">
        {following ? "Following" : "Follow"}
      </button>
    </div>
  );
}
