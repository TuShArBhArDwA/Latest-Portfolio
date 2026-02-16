"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const LayoutTextFlip = ({
    text,
    words,
    className,
}: {
    text: string;
    words: string[];
    className?: string;
}) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <div className={cn("flex flex-col items-center justify-center w-full", className)}>
            {text && <span className="">{text}</span>}
            <div className="relative flex justify-center overflow-hidden h-[1.2em] w-full max-w-4xl">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={words[index]}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-x-0 text-center whitespace-nowrap font-bold text-purple"
                    >
                        {words[index]}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
};
