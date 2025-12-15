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

        <Carousel className="relative">
          <CarouselPrevious />
          {/* <CarouselContent className="flex gap-6">
            {tutorials.map((tut) => (
              <CarouselItem key={tut.id}>
                <div
                  className="w-96 group bg-card-bg rounded-2xl overflow-hidden
                  shadow-[0_2.4rem_4.8rem_rgba(0,0,0,0.075)]
                  transition-all duration-400
                  hover:-translate-y-3 hover:shadow-[0_3.2rem_6.4rem_rgba(0,0,0,0.06)]
                  p-4"
                >
                  <div className="w-full aspect-video rounded-xl overflow-hidden mb-4">
                    <img src={tut.thumbnails[0]} alt={tut.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
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
              </CarouselItem>
            ))}
          </CarouselContent> */}
          <CarouselContent className="flex gap-8">
            {data.map((v) => (
              <CarouselItem
                key={v.id}
                className="basis-88 md:basis-104"
              >
                <VideoCard v={v} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
