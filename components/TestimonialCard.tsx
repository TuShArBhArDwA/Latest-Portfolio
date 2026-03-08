import React from 'react';

export const TestimonialCard = ({ quote, author }: { quote: string, author: string }) => {
  return (
    <div className="group relative bg-white dark:bg-black-100 border border-black/[0.1] dark:border-white/[0.1] rounded-3xl p-8 flex flex-col justify-between h-full hover:border-purple/50 transition-colors duration-300 overflow-hidden shadow-sm hover:shadow-xl">
      {/* Background decoration */}
      <div className="absolute opacity-0 group-hover:opacity-10 transition-opacity duration-300 top-0 left-0 w-full h-full bg-gradient-to-br from-purple to-transparent pointer-events-none" />

      <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg tracking-wide mb-8 italic relative z-10">
        &quot;{quote}&quot;
      </p>

      <div className="mt-auto flex items-center gap-4 relative z-10">
        <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gradient-to-br from-purple to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          {author.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold text-neutral-800 dark:text-white">
            {author}
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Verified Testimonial
          </span>
        </div>
      </div>
    </div>
  );
};
