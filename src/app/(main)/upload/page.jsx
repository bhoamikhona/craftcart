"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function UploadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  if (status === "loading") return <p className="mt-10 text-center">Loading...</p>;
  if (!session) {
    router.push("/login");
    return null;
  }

  const userId = session.user.id;

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadError(null);

    if (!file || !title || !description) {
      setUploadError("Fill all fields.");
      return;
    }

    setIsUploading(true);

    const bucket = "tutorial-videos";
    const ext = file.name.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${ext}`;
    const filePath = `${userId}/${fileName}`;

    try {
      // Upload file
      const { error: uploadErr } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadErr) throw uploadErr;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      const videoUrl = urlData.publicUrl;

      // Insert tutorial into database
      const { error: insertErr } = await supabase
        .from("tutorials")
        .insert({
          creator_id: userId,
          title,
          description,
          video_url: videoUrl,
          thumbnail_url: null,  // optional
          duration: null        // optional
        });

      if (insertErr) throw insertErr;

      alert("Uploaded successfully!");
      router.push("/profile");

    } catch (err) {
      console.error("Upload failed:", err);
      setUploadError("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 flex justify-center bg-gray-50">
      <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">
          Post a Tutorial
        </h1>

        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Video File</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Description</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded-lg"
            ></textarea>
          </div>

          {uploadError && (
            <p className="text-red-600 text-sm">{uploadError}</p>
          )}

          <button
            type="submit"
            disabled={isUploading}
            className={`w-full py-3 rounded-lg text-white font-bold ${
              isUploading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {isUploading ? "Uploading..." : "Post Tutorial"}
          </button>
        </form>
      </div>
    </div>
  );
}
