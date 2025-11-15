"use client";
import React, { useState } from "react";
import { tutorials } from "@/data/tutorials";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TutorialCarousel() {
  const [index, setIndex] = useState(0);

  const ITEMS_PER_PAGE = 3;
  const maxIndex = Math.ceil(tutorials.length / ITEMS_PER_PAGE) - 1;

  const nextSlide = () => {
    setIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const visibleTutorials = tutorials.slice(
    index * ITEMS_PER_PAGE,
    index * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Tutorials
        </h2>

        <div className="relative flex items-center justify-center">

          <button
            onClick={prevSlide}
            disabled={index === 0}
            className={`absolute left-0 bg-white border shadow-lg p-2 rounded-full ${
              index === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Cards Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-10">
            {visibleTutorials.map((tut) => (
              <div
                key={tut.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 border border-gray-100"
              >
                <div className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                  {/* <img
                    src={tut.thumbnails[0]}
                    alt={tut.title}
                    className="object-cover w-full h-full"
                  /> */}
                  <img
                    src='https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800'
                    alt={tut.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{tut.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {tut.description}
                </p>
                <a
                  href={`/tutorial/${tut.id}`}
                  className="text-primary font-semibold hover:underline flex items-center gap-1"
                >
                  Watch Tutorial →
                </a>
              </div>
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            disabled={index === maxIndex}
            className={`absolute right-0 bg-white border shadow-lg p-2 rounded-full ${
              index === maxIndex
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
