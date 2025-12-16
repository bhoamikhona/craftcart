"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "saved-videos";

export default function useSavedVideos() {
  const [savedVideos, setSavedVideos] = useState([]);

  useEffect(() => {
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
  }, []);

  const saveVideo = (video) => {
    if (savedVideos.some(v => v.id === video.id)) return;

    const updated = [...savedVideos, video];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSavedVideos(updated);
    window.dispatchEvent(new Event("saved-videos-updated"));
  };

  const unsaveVideo = (id) => {
    const updated = savedVideos.filter(v => v.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSavedVideos(updated);
    window.dispatchEvent(new Event("saved-videos-updated"));
  };

  const isSaved = (videoId) => {
    return savedVideos.some(v => v.id === videoId);
  };

  return {
    savedVideos,
    saveVideo,
    unsaveVideo,
    isSaved
  };
}
