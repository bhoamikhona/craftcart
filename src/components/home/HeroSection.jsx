import React from "react";

function HeroSection() {
  return (
    <section className="gradient-bg text-white py-25 flex justify-center items-center">
      <div className="text-center px-4 max-w-3xl">
        <h1 className="text-2xl md:text-6xl font-bold mb-6">
          Learn, Create, and Shop
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Watch DIY tutorials, shop craft supplies, and join workshops to get hands-on experience.
        </p>

        {/* <div className="flex max-w-xl mx-auto">
          <input 
            type="text" 
            placeholder="Search tutorials, supplies...." 
            className="flex-1 input-primary rounded-l-lg px-4 py-3 text-black focus:outline-none bg-white border-gray-300"/>
            <button className="btn- btn-search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M16.65 16.65a7 7 0 111-9.9 7 7 0 01-1 9.9z"
                />
              </svg>
            </button>
        </div> */}
      </div>
    </section>
  );
}

export default HeroSection;
