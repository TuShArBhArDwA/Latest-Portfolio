import React from "react";

import { workExperience } from "@/data";
import { Timeline } from "@/components/ui/Timeline";

import Link from "next/link";
import { LinkPreview } from "./ui/link-preview";

const Experience = () => {
  const timelineData = workExperience.map((item) => ({
    title: item.date || "Date",
    content: (
      <div className="group relative flex flex-col gap-3 p-5 rounded-xl bg-black-200/40 backdrop-blur-sm border border-white/[0.08] hover:border-purple/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]">
        <div className="flex items-center gap-4">
          {item.link ? (
            <LinkPreview
              url={item.link}
              isStatic
              imageSrc={item.thumbnail}
              className="cursor-pointer shrink-0"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover ring-2 ring-purple/30 group-hover:ring-purple/60 transition-all duration-300 shadow-lg"
              />
            </LinkPreview>
          ) : (
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover ring-2 ring-purple/30 shadow-lg"
            />
          )}

          <div className="flex flex-col gap-0.5">
            {item.link ? (
              <LinkPreview
                url={item.link}
                isStatic
                imageSrc={item.thumbnail}
                className="cursor-pointer"
              >
                <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-purple transition-colors duration-300 leading-tight">
                  {item.title}
                </h3>
              </LinkPreview>
            ) : (
              <h3 className="text-base md:text-lg font-semibold text-white leading-tight">
                {item.title}
              </h3>
            )}
          </div>
        </div>
        <p className="text-white-200/70 text-sm leading-relaxed pl-0 md:pl-20">
          {item.desc}
        </p>
      </div>
    ),
  }));

  return (
    <div className="py-20 w-full mt-20" id="work">
      <h1 className="heading mb-10">
        My <span className="text-purple">work experience</span>
      </h1>
      <div className="w-full">
        <Timeline data={timelineData} />
      </div>
    </div>
  );
};

export default Experience;