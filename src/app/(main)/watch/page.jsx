"use client";
import React, { useState } from "react";
import { tutorials } from "@/data/tutorials";
import SearchBar from "@/components/ui/SearchBar";

export default function WatchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTutorials = tutorials.filter((tut) =>
    tut.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* <h2 className="text-3xl font-bold text-center mb-6">All Tutorials</h2> */}

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutorials.length > 0 ? (
            filteredTutorials.map((tut) => (
              <div
                key={tut.id}
                className="w-full group bg-card-bg rounded-2xl overflow-hidden
                           shadow-[0_2.4rem_4.8rem_rgba(0,0,0,0.075)]
                           transition-all duration-400
                           hover:-translate-y-3 hover:shadow-[0_3.2rem_6.4rem_rgba(0,0,0,0.06)]
                           p-4"
              >
                <div className="w-full aspect-video rounded-xl overflow-hidden mb-4">
                  <img
                    src={tut.thumbnails[0] || "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800"}
                    alt={tut.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>

                <h3 className="text-xl font-semibold mb-2">{tut.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tut.description}</p>
                <a
                  href={`/tutorial/${tut.id}`}
                  className="text-primary font-semibold hover:underline flex items-center gap-1"
                >
                  Watch Tutorial →
                </a>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No tutorials found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
