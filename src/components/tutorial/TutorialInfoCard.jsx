"use client";

import {
  ClockIcon,
  StarIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";

export default function TutorialInfoCard({ tutorial }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
      <div className="flex gap-2">
        {tutorial.tags?.map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="text-2xl font-bold">{tutorial.title}</h1>
      <p className="text-gray-700">{tutorial.description}</p>

      <div className="flex gap-6 text-gray-600">
        <div className="flex items-center gap-1">
          <ClockIcon className="w-5 h-5 text-orange-500" />
          <span>{tutorial.duration || "2 hours"}</span>
        </div>

        <div className="flex items-center gap-1">
          <StarIcon className="w-5 h-5 text-yellow-400" />
          <span>
            {tutorial.rating || "4.8"} ({tutorial.reviews?.length || 0} reviews)
          </span>
        </div>

        <div className="flex items-center gap-1">
          <HandThumbUpIcon className="w-5 h-5 text-blue-500" />
          <span>{tutorial.likes} likes</span>
        </div>
      </div>
    </div>
  );
}
