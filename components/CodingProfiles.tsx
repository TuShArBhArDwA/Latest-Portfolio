"use client";
import React from "react";
import { codingProfiles } from "@/data";
import { Compare } from "./ui/compare";

const CodingProfiles = () => {
  return (
    <div className="py-20 w-full" id="code">
      <h1 className="heading text-center text-4xl font-semibold text-gray-900 dark:text-white mb-16">
        My <span className="text-purple">Coding Profiles</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto px-4">
        {codingProfiles.map((profile) => (
          <div key={profile.id} className="h-[400px] w-full border rounded-3xl bg-white dark:bg-black-100 border-neutral-200 dark:border-white/[0.2] flex flex-col overflow-hidden">
            <div className="h-[250px] w-full px-4 pt-4">
              <Compare
                firstImage={profile.logo}
                secondImage={profile.statsImage}
                firstImageClassName="object-contain p-8 opacity-100"
                secondImageClassname="object-cover object-center opacity-100"
                className="h-full w-full rounded-2xl"
                slideMode="hover"
                initialSliderPercentage={50}
              />
            </div>
            <div className="p-4 flex flex-col items-center gap-2 flex-1 justify-center">
              <p className="text-gray-800 dark:text-gray-300 font-medium text-sm text-center px-2 line-clamp-2">
                {profile.description}
              </p>
              <a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full border border-purple/50 bg-[#1a1a2e] text-white font-bold hover:bg-purple hover:border-transparent transition-all shadow-lg text-sm"
              >
                Visit {profile.name}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodingProfiles;
