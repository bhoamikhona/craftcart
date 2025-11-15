"use client";
import React from "react";
import { tutorials } from "@/data/tutorials"; 
import { ArrowRight } from "lucide-react";

export default function FeaturedSection() {
  const featured = tutorials.slice(0, 3); 

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
            <div
              key={item.id}
              className="group bg-card-bg border border-border rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition hover:-translate-y-1"
            >
              <div className="aspect-video w-full overflow-hidden">
                {/* <img
                  src={item.thumbnails[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                /> */}
                <img
                  src='https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800 '
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    ❤️ {item.likes} • 💬 {item.comments.length}
                  </div>

                  <a
                    href='#'
                    className="flex items-center gap-1 text-primary font-medium hover:underline"
                  >
                    View Tutorial
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
