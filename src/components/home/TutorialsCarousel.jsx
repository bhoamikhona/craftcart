"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import VideoCard from "@/components/ui/VideoCard.jsx";
import { data } from "@/data/videos.js";

export default function TutorialCarousel() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Tutorials
        </h2>

        <Carousel className="relative mt-12 mb-20">
          <CarouselPrevious />
          <CarouselContent className="flex gap-8">
            {data.map((v) => (
              <CarouselItem key={v.id} className="basis-88 md:basis-104">
                <div
                  className="
                    rounded-3xl
                    p-4
                    bg-transparent
                    hover:bg-[#FFF1DC]
                    transition-colors
                    duration-300
                  "
                >
                  <div
                    className="
                      rounded-2xl
                      overflow-hidden
                      transition
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-md
                    "
                  >
                    <VideoCard v={v} />
                  </div>
                </div>
              </CarouselItem>

            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
