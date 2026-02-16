import { interviewPlaybooks } from "@/data";
import { BookFlip } from "./ui/book-flip";
import React from "react";

const InterviewPlaybooks = () => {
    return (
        <div className="py-20 w-full" id="playbooks">
            <h1 className="heading text-center text-4xl font-semibold text-gray-900 dark:text-white mb-20">
                Interview <span className="text-purple">Playbooks</span>
            </h1>
            <div className="h-full w-full px-4 md:px-10 flex justify-center">
                <BookFlip items={interviewPlaybooks} />
            </div>
        </div>
    );
};



export default InterviewPlaybooks;
