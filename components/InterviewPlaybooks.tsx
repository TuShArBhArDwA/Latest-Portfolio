import { interviewPlaybooks } from "@/data";
import { BookFlip } from "./ui/book-flip";
import React from "react";

const InterviewPlaybooks = () => {
    return (
        <div className="py-20 w-full relative" id="playbooks">
            {/* Subtle background glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[600px] h-[400px] bg-purple/5 rounded-full blur-[120px]" />
            </div>

            <h1 className="heading text-center text-4xl font-semibold text-gray-900 dark:text-white mb-4">
                Interview <span className="text-purple">Playbooks</span>
            </h1>
            <p className="text-center text-white-200/50 text-sm md:text-base mb-16 max-w-lg mx-auto">
                Curated guides and strategies to ace technical interviews
            </p>
            <div className="h-full w-full px-4 md:px-10 flex justify-center relative z-10">
                <BookFlip items={interviewPlaybooks} />
            </div>
        </div>
    );
};



export default InterviewPlaybooks;
