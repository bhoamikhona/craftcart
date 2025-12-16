"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function useSavedVideos() {
  const { data: session } = useSession();
  const [savedVideos, setSavedVideos] = useState([]);

  // user-scoped storage key
  const STORAGE_KEY = session?.user?.email
    ? `saved-videos-${session.user.email}`
    : null;

  useEffect(() => {
    if (!STORAGE_KEY) {
      setSavedVideos([]);
      return;
    }

    const loadSaved = () => {
      const stored = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );
      setSavedVideos(stored);
    };

    loadSaved();

    window.addEventListener("saved-videos-updated", loadSaved);
    window.addEventListener("storage", loadSaved);

    return () => {
      window.removeEventListener("saved-videos-updated", loadSaved);
      window.removeEventListener("storage", loadSaved);
    };
  }, [STORAGE_KEY]);

  const saveVideo = (video) => {
    if (!STORAGE_KEY) return;
    if (savedVideos.some((v) => v.id === video.id)) return;

    const updated = [...savedVideos, video];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSavedVideos(updated);
    window.dispatchEvent(new Event("saved-videos-updated"));
  };

  const unsaveVideo = (id) => {
    if (!STORAGE_KEY) return;

    const updated = savedVideos.filter((v) => v.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSavedVideos(updated);
    window.dispatchEvent(new Event("saved-videos-updated"));
  };

  const isSaved = (videoId) => {
    return savedVideos.some((v) => v.id === videoId);
  };

  return {
    savedVideos,
    saveVideo,
    unsaveVideo,
    isSaved,
  };
}
