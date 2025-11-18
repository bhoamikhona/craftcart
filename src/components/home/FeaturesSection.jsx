"use client";
import React from "react";
import Link from "next/link"; 
import { tutorials } from "@/data/tutorials"; 
import { ArrowRight } from "lucide-react";
import { HeartIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/solid";

export default function FeaturedSection() {
  const featured = tutorials.slice(2, 5); 

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary">Featured Tutorials</h2>
          <p className="text-gray-500 mt-2 text-lg">
            Hand-picked projects to spark your creativity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((item) => (
            <Link key={item.id} href={`/tutorial/${item.id}`} className="w-96 group">
              <div
                className="bg-card-bg rounded-2xl overflow-hidden
                           shadow-[0_2.4rem_4.8rem_rgba(0,0,0,0.075)]
                           transition-all duration-400
                           hover:-translate-y-3 de
                           hover:shadow-[0_3.2rem_6.4rem_rgba(0,0,0,0.06)]"
              >
                <div className="aspect-video w-full overflow-hidden">
                  {/* <img
                    src='https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800'
                    alt={item.title}
                    className="w-full aspect-video object-cover rounded-xl group-hover:scale-105 transition"
                  /> */}
                  <img src={item.thumbnails[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                      <span className="flex items-center gap-1">
                        <HeartIcon className="w-5 h-5" />
                        {item.likes}
                      </span>

                      <span className="flex items-center gap-1">
                        <ChatBubbleLeftIcon className="w-5 h-5" />
                        {item.comments.length}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-primary font-medium">
                      View Tutorial
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
