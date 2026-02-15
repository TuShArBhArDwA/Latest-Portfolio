import React from "react";

import { workExperience } from "@/data";
import { Timeline } from "@/components/ui/Timeline";

import Link from "next/link";
import { LinkPreview } from "./ui/link-preview";

const Experience = () => {
  const timelineData = workExperience.map((item) => ({
    title: item.date || "Date",
    content: (
      <div className="flex flex-col gap-2 p-4 border border-neutral-200 dark:border-white/[0.2] rounded-xl bg-white dark:bg-black-100 shadow-sm">
        <div className="flex items-center gap-3">
          {item.link ? (
            <LinkPreview
              url={item.link}
              isStatic
              imageSrc={item.thumbnail}
              className="cursor-pointer"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-16 h-16 rounded-lg object-cover border border-gray-100 dark:border-white/[0.1]"
              />
            </LinkPreview>
          ) : (
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-16 h-16 rounded-lg object-cover border border-gray-100 dark:border-white/[0.1]"
            />
          )}

          <div className="flex flex-col">
            {item.link ? (
              <LinkPreview
                url={item.link}
                isStatic
                imageSrc={item.thumbnail}
                className="cursor-pointer"
              >
                <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white hover:text-purple transition-colors">
                  {item.title}
                </h3>
              </LinkPreview>
            ) : (
              <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white">
                {item.title}
              </h3>
            )}

          </div>
        </div>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed mt-2">
          {item.desc}
        </p>
      </div>
    ),
  }));

  return (
    <div className="py-20 w-full" id="work">
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