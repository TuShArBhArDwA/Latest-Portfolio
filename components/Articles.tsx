"use client";
import { FaLocationArrow } from "react-icons/fa6";
import { articles } from "@/data";
import { DraggableCardBody, DraggableCardContainer } from "./ui/draggable-card";
import { cn } from "@/utils/cn";
import { useMemo, useRef } from "react";

const RecentArticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoize positions so they don't change on re-renders
  const articlePositions = useMemo(() => {
    // Defines a set of scattered positions similar to the demo
    const positions = [
      "top-[10%] left-[5%] rotate-[-5deg]",     // Top Left
      "top-[15%] right-[10%] rotate-[4deg]",    // Top Right
      "top-[40%] left-[10%] rotate-[-7deg]",    // Middle Left
      "top-[35%] right-[15%] rotate-[8deg]",    // Middle Right
      "bottom-[15%] left-[20%] rotate-[2deg]",  // Bottom Left
      "bottom-[10%] right-[5%] rotate-[-5deg]", // Bottom Right
      "top-[25%] left-[40%] rotate-[10deg]",    // Center-ish
    ];
    return articles.map((_, index) => positions[index % positions.length]);
  }, []);

  return (
    <div className="py-20 relative w-full flex flex-col items-center justify-center overflow-hidden" id="articles">
      <h1 className="heading mb-10 z-50">
        Learn From <span className="text-purple">My Experience</span>
      </h1>

      <div
        ref={containerRef}
        className="relative h-[80vh] w-full max-w-7xl border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden bg-neutral-100/50 dark:bg-neutral-900/50"
      >
        <DraggableCardContainer className="relative flex h-full w-full items-center justify-center">
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-700 z-0 pointer-events-none opacity-50 select-none">
            Drag cards to explore my journey
          </p>

          {articles.map((item, index) => (
            <DraggableCardBody
              key={item.id}
              containerRef={containerRef}
              className={cn("absolute cursor-grab active:cursor-grabbing w-80 z-20", articlePositions[index])}
            >
              <div className="relative w-full h-40 overflow-hidden rounded-xl mb-4 group-hover/card:shadow-xl transition-shadow duration-300">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-contain pointer-events-none"
                  />
                </a>
              </div>

              <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                <h3 className="mt-2 text-center text-lg font-bold text-neutral-700 dark:text-white line-clamp-2 leading-tight hover:text-purple transition-colors duration-200">
                  {item.title}
                </h3>
              </a>

              <p className="text-xs text-neutral-500 dark:text-neutral-300 text-center mt-2 line-clamp-3 select-none">
                {item.des}
              </p>

              <a href={item.link} target="_blank" rel="noopener noreferrer" className="block mt-3">
                <div className="flex justify-center items-center text-purple text-xs font-bold hover:underline">
                  Read Article <FaLocationArrow className="ml-1 w-3 h-3" />
                </div>
              </a>
            </DraggableCardBody>
          ))}
        </DraggableCardContainer>
      </div>
    </div>
  );
};

export default RecentArticles;
