"use client";

export default function DetailsTab({ video, setVideo, initialVideo }) {
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
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setVideo(initialVideo)}
          className="rounded-xl border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
        >
          Reset
        </button>

        <button
          type="button"
          className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
        >
          Save
        </button>
      </div>
    </div>
  );
}
