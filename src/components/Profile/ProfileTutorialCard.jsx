
import React from "react";

const ProfileTutorialCard = ({ tutorial }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
      
      {/* Image / Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden">
        <img
          src={tutorial.image_url}
          alt={tutorial.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/60 transition">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 3l12 9-12 9z" />
            </svg>
          </div>
        </div>

        {/* Duration Badge */}
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-sm">
          {tutorial.duration}
        </span>
      </div>

      {/* Title & Views */}
      <div className="p-3">
        <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
          {tutorial.title}
        </h3>

        <div className="mt-1 flex justify-between items-center text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            {tutorial.views.toLocaleString()} views
          </span>

          <a
            href={`/tutorial/${tutorial.id}`}
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            Details →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileTutorialCard;
