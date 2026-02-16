"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";

interface BookFlipProps {
    items: {
        title: string;
        description: string;
        img: string;
        link: string;
        content?: string;
    }[];
}

export const BookFlip = ({ items }: BookFlipProps) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState(0); // 1 = next, -1 = prev
    const [isAnimating, setIsAnimating] = useState(false);

    const handleNext = () => {
        if (currentPage < items.length - 1 && !isAnimating) {
            setDirection(1);
            setIsAnimating(true);
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0 && !isAnimating) {
            setDirection(-1);
            setIsAnimating(true);
            setCurrentPage((prev) => prev - 1);
        }
    };

    const currentItem = items[currentPage];

    // Logic for Static Pages:
    // When animating NEXT (0 -> 1):
    //   - Current: 1. Dir: 1. Anim: True.
    //   - Left Stack: Should be 0 (Visual Continuity with previous state). 
    //   - Right Stack: Should be 2 (Visual Continuity? No, new revealed page).

    // When animating PREV (1 -> 0):
    //   - Current: 0. Dir: -1. Anim: True.
    //   - Left Stack: Should be -1 (Nothing).
    //   - Right Stack: Should be 1 (Visual Continuity with previous state).

    // AFTER Anim (Anim: False):
    //   - Left Stack: Current - 1.
    //   - Right Stack: Current + 1.

    const leftStackItem = isAnimating && direction === 1
        ? (currentPage > 1 ? items[currentPage - 2] : null)
        : (currentPage > 0 ? items[currentPage - 1] : null);

    const rightStackItem = isAnimating && direction === -1
        ? (currentPage < items.length - 2 ? items[currentPage + 2] : null) // Was at Current+1, showing new Current+2
        : (currentPage < items.length - 1 ? items[currentPage + 1] : null);

    // Animation Variants
    const pageVariants = {
        enter: (direction: number) => ({
            rotateY: direction === 1 ? 0 : -180,
            zIndex: direction === 1 ? 20 : 30, // Prev: Enter (flipping back) starts on top
            opacity: 1,
        }),
        center: {
            rotateY: 0,
            zIndex: 20,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.645, 0.045, 0.355, 1.0],
            },
        },
        exit: (direction: number) => ({
            rotateY: direction === 1 ? -180 : 0,
            zIndex: direction === 1 ? 30 : 10, // Next: Exit (flipping away) starts on top
            opacity: direction === 1 ? 0 : 1, // Only fade out if moving away
            transition: {
                duration: 0.6,
                ease: [0.645, 0.045, 0.355, 1.0],
            },
        }),
    };

    return (
        <div className="flex flex-col items-center justify-center w-full py-10 perspective-[2000px] select-none">
            <div className="relative w-[320px] h-[480px] md:w-[640px] md:h-[520px] flex items-center justify-center preserve-3d">

                {/* Book Cover / Backing */}
                <div className="absolute inset-0 bg-[#2e2e2e] rounded-lg transform translate-z-[-20px] shadow-2xl skew-x-1 origin-bottom" style={{ transform: "translateZ(-20px) rotateX(10deg)" }}>
                    <div className="absolute bottom-[-10px] left-[2%] w-[96%] h-[10px] bg-[#e3e3e3] rounded-b-sm shadow-inner" />
                    <div className="absolute right-[-10px] top-[2%] w-[10px] h-[96%] bg-[#e3e3e3] rounded-r-sm shadow-inner" />
                </div>

                {/* The Open Book Container */}
                <div className="relative w-full h-full flex bg-[#fdfbf6] rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden preserve-3d">

                    {/* SPINE */}
                    <div className="absolute left-[50%] top-0 bottom-0 w-[40px] -ml-[20px] z-30 h-full preserve-3d">
                        <div className="w-full h-full bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-800 rounded-sm shadow-inner" />
                        <div className="absolute top-10 left-[50%] -translate-x-1/2 w-[2px] h-[90%] border-l-2 border-dashed border-white/20" />
                    </div>

                    {/* STATIC LEFT PAGE (Underneath) */}
                    <div className="relative flex-1 bg-[#fdfbf6] overflow-hidden border-r border-[#e0e0e0]">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50" />
                        <div className="p-8 flex flex-col h-full relative z-10 opacity-70">
                            {leftStackItem ? (
                                <>
                                    <span className="font-serif text-xs text-gray-500 tracking-widest uppercase mb-4">Previous: {leftStackItem.title}</span>
                                    <div className="w-full h-32 relative grayscale opacity-50 mb-4 rounded overflow-hidden">
                                        <Image src={leftStackItem.img} alt={leftStackItem.title} fill className="object-cover" />
                                    </div>
                                    <p className="text-xs text-gray-400 font-serif line-clamp-6">{leftStackItem.description}</p>
                                    <span className="mt-auto text-center font-mono text-xs text-gray-400">{items.indexOf(leftStackItem) + 1}</span>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-300 font-serif italic text-center p-10">
                                    Start of Playbooks
                                </div>
                            )}
                        </div>
                    </div>

                    {/* STATIC RIGHT PAGE (Underneath - showing NEXT item) */}
                    <div className="relative flex-1 bg-white overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50" />
                        <div className="p-8 flex flex-col h-full relative z-10">
                            {rightStackItem ? (
                                <>
                                    <div className="w-full h-48 relative mb-6 rounded-sm overflow-hidden border-[6px] border-white shadow-sm">
                                        <Image src={rightStackItem.img} alt={rightStackItem.title} fill className="object-cover" />
                                    </div>
                                    <h2 className="text-2xl font-bold font-serif text-neutral-800 mb-3">{rightStackItem.title}</h2>
                                    <span className="mt-auto text-right font-mono text-xs text-gray-400">{items.indexOf(rightStackItem) + 1}</span>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-300 font-serif italic text-center">End of Playbooks</div>
                            )}
                        </div>
                    </div>


                    {/* FLIPPING PAGE (Animation Layer) */}
                    <AnimatePresence
                        initial={false}
                        mode="popLayout"
                        custom={direction}
                        onExitComplete={() => setIsAnimating(false)}
                    >
                        <motion.div
                            key={currentPage}
                            custom={direction}
                            variants={pageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute inset-0 w-full h-full flex justify-end pointer-events-none"
                            style={{
                                transformStyle: "preserve-3d",
                                perspective: "2000px"
                            }}
                        >
                            {/* The Inner Flipping Element - Half Width (Right Side) */}
                            <motion.div
                                className="w-[50%] h-full relative pointer-events-auto"
                                style={{
                                    transformOrigin: "left center",
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                {/* FRONT FACE (Current Page Content) */}
                                <div className="absolute inset-0 bg-[#fffefb] backface-hidden flex flex-col p-6 md:p-8 border-l border-neutral-100">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none" />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-full h-48 relative mb-6 rounded-sm overflow-hidden shadow-md border-[6px] border-white transform rotate-1 hover:rotate-0 transition-transform duration-300">
                                            <Image src={currentItem.img} alt={currentItem.title} fill className="object-cover" />
                                        </div>

                                        <h2 className="text-2xl md:text-3xl font-bold font-serif text-neutral-800 mb-3 leading-tight">{currentItem.title}</h2>
                                        <p className="text-sm md:text-base text-neutral-600 font-serif leading-relaxed line-clamp-4 md:line-clamp-none">
                                            {currentItem.content || currentItem.description}
                                        </p>

                                        <div className="mt-auto pt-6 flex justify-between items-center border-t border-neutral-100">
                                            <span className="font-mono text-xs text-neutral-400">Page {currentPage + 1}</span>
                                            <a
                                                href={currentItem.link}
                                                target="_blank"
                                                className="group flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-neutral-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                            >
                                                Read Guide
                                                <IconArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* BACK FACE (Previous Page Visual) */}
                                <div
                                    className="absolute inset-0 bg-[#fdfbf6] backface-hidden flex flex-col p-8 border-r border-neutral-200"
                                    style={{ transform: "rotateY(180deg)" }}
                                >
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none" />
                                    <div className="relative z-10 flex flex-col h-full opacity-40 grayscale">
                                        <h3 className="text-xl font-bold font-serif text-neutral-800 mb-4">{currentItem.title}</h3>
                                        <div className="w-full h-40 relative rounded bg-gray-200 mb-4 overflow-hidden">
                                            <Image src={currentItem.img} alt={currentItem.title} fill className="object-cover" />
                                        </div>
                                        <p className="text-xs font-serif text-neutral-500 line-clamp-4">{currentItem.description}</p>
                                    </div>
                                </div>
                            </motion.div>

                        </motion.div>
                    </AnimatePresence>

                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6 mt-12 z-50">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 0 || isAnimating}
                    className="group relative px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative flex items-center gap-2">
                        <IconArrowLeft size={18} /> Previous
                    </span>
                </button>
                <div className="w-px h-8 bg-white/20" />
                <button
                    onClick={handleNext}
                    disabled={currentPage === items.length - 1 || isAnimating}
                    className="group relative px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative flex items-center gap-2">
                        Next <IconArrowRight size={18} />
                    </span>
                </button>
            </div>
        </div>
    );
};
