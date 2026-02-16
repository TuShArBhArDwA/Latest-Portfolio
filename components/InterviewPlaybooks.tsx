import { interviewPlaybooks } from "@/data";
import { Card, Carousel } from "./ui/carousel";
import React from "react";

const InterviewPlaybooks = () => {

    const carouselItems = interviewPlaybooks.map((playbook, index) => (
        <Card key={playbook.id} card={{
            src: playbook.img,
            title: playbook.title,
            category: "INTERVIEW GUIDE",
            content: (
                <div className="flex flex-col gap-4">
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans max-w-3xl mx-auto">
                        {playbook.content}
                    </p>
                    <a href={playbook.link} target="_blank" className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full w-fit mx-auto mt-4 font-bold">
                        Read Guide
                    </a>
                </div>
            )
        }} index={index} />
    ));


    return (
        <div className="py-20 w-full" id="playbooks">
            <h1 className="heading text-center text-4xl font-semibold text-gray-900 dark:text-white mb-20">
                Interview <span className="text-purple">Playbooks</span>
            </h1>
            <div className="h-full w-full">
                <Carousel items={carouselItems} />
            </div>

        </div>
    );
};



export default InterviewPlaybooks;
