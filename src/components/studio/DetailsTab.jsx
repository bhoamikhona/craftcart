"use client";

import { useRef } from "react";

export default function DetailsTab({ video, setVideo }) {
  const thumbInputRef = useRef(null);
  const videoInputRef = useRef(null);

  function onPickThumbnailFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setVideo((prev) => ({
      ...prev,
      thumbnailFile: file,
      thumbnail: previewUrl,
    }));
  }

  function onPickVideoFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setVideo((prev) => ({
      ...prev,
      videoFile: file,
      videoFileName: file.name,
    }));
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Details</h3>
        <p className="text-sm text-gray-500 mt-1">
          Changes update the preview instantly.
        </p>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            value={video.title}
            onChange={(e) =>
              setVideo((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-orange-200"
            placeholder="Enter a title..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={video.description}
            onChange={(e) =>
              setVideo((prev) => ({ ...prev, description: e.target.value }))
            }
            rows={6}
            className="w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-orange-200 resize-none"
            placeholder="Write a short description..."
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <input
            ref={thumbInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onPickThumbnailFile}
          />
          <button
            type="button"
            onClick={() => thumbInputRef.current?.click()}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
          >
            Upload Thumbnail
          </button>

          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={onPickVideoFile}
          />
          <button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
          >
            Upload Video
          </button>

          {video.videoFileName ? (
            <span className="text-sm text-gray-500 self-center">
              {video.videoFileName}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
