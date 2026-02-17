"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconArrowRight, IconCoffee } from "@tabler/icons-react";
import Image from "next/image";
import { cn } from "@/utils/cn"; // Assuming you have a cn utility, if not I can inline or remove

// --- HELPER COMPONENT: Page Stack (Simulates thickness) ---
const PageStack = ({ side = "right", count = 3 }: { side: "left" | "right"; count?: number }) => {
    return (
        <div className="absolute top-0 bottom-0 w-full h-full -z-10">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={cn(
                        "absolute top-[2px] bottom-[2px] w-full bg-neutral-100 border border-neutral-200 rounded-sm shadow-sm",
                        side === "left"
                            ? "right-0 origin-right"
                            : "left-0 origin-left"
                    )}
                    style={{
                        [side === "left" ? "left" : "right"]: `-${(i + 1) * 2}px`, // Stack outwards
                        top: `${(i + 1) * 1}px`, // Slight vertical shift for depth
                        zIndex: -1 - i,
                        width: `calc(100% - ${(i + 1) * 2}px)`, // Taper slightly
                    }}
                />
            ))}
        </div>
    );
};

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

    const handleJump = (index: number) => {
        if (isAnimating || index === currentPage) return;
        setDirection(index > currentPage ? 1 : -1);
        setIsAnimating(true);
        setCurrentPage(index);
    };

    const bookmarkColors = [
        "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-yellow-500", "bg-lime-500", "bg-green-500",
        "bg-emerald-500", "bg-teal-500", "bg-cyan-500", "bg-sky-500", "bg-blue-500", "bg-indigo-500",
        "bg-violet-500", "bg-purple-500", "bg-fuchsia-500", "bg-pink-500", "bg-rose-500"
    ];

    const currentItem = items[currentPage];

    // Logic for Static Pages state management (same as before to prevent glitches)
    const leftStackItem = isAnimating && direction === 1
        ? (currentPage > 1 ? items[currentPage - 2] : null)
        : (currentPage > 0 ? items[currentPage - 1] : null);

    const rightStackItem = isAnimating && direction === -1
        ? (currentPage < items.length - 2 ? items[currentPage + 2] : null)
        : (currentPage < items.length - 1 ? items[currentPage + 1] : null);

    // Animation Variants
    const pageVariants = {
        enter: (direction: number) => ({
            rotateY: direction === 1 ? 0 : -180,
            zIndex: direction === 1 ? 20 : 30,
            opacity: 1,
        }),
        center: {
            rotateY: 0,
            zIndex: 20,
            opacity: 1,
            transition: {
                duration: 0.8, // Slightly slower for heavy book feel
                ease: [0.645, 0.045, 0.355, 1.0],
            },
        },
        exit: (direction: number) => ({
            rotateY: direction === 1 ? -180 : 0,
            zIndex: direction === 1 ? 30 : 10,
            opacity: direction === 1 ? 0 : 1,
            transition: {
                duration: 0.8,
                ease: [0.645, 0.045, 0.355, 1.0],
            },
        }),
    };

    return (
        <div className="flex flex-col items-center justify-center w-full py-10 perspective-[2000px] select-none">

            {/* 3D BOOK CONTAINER */}
            {/* 3D BOOK CONTAINER */}
            <div className="relative w-[280px] h-[420px] sm:w-[320px] sm:h-[480px] md:w-[900px] md:h-[600px] isolate">

                {/* --- Back Cover (The Physical Binding) --- */}
                <div
                    className="absolute top-0 bottom-0 left-[-10px] right-[-10px] bg-[#2e2e2e] rounded-lg shadow-2xl skew-x-1 origin-bottom -z-30"
                    style={{
                        transform: "translateZ(-25px) rotateX(15deg)",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
                    }}
                >
                    {/* Fake page block visible from bottom */}
                    <div className="absolute bottom-[-14px] left-[2%] w-[96%] h-[14px] bg-[#e3e3e3] rounded-b-sm shadow-inner opacity-90" />
                    {/* Fake page block visible from side */}
                    <div className="absolute right-[-14px] top-[2%] w-[14px] h-[96%] bg-[#e3e3e3] rounded-r-sm shadow-inner opacity-90" />
                </div>

                {/* --- BOOKMARKS --- */}
                <div className="absolute right-[-24px] top-[30px] bottom-[30px] flex flex-col gap-1 z-[-20] items-end"
                    style={{ transform: "rotateY(-20deg) translateZ(-10px)" }}>
                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleJump(index)}
                            className={cn(
                                "h-[24px] rounded-r-md transition-all duration-200 shadow-sm border-t border-b border-r border-white/20 hover:brightness-110 flex items-center justify-center pl-1 font-bold text-[10px] text-white/90 font-mono",
                                bookmarkColors[index % bookmarkColors.length],
                                currentPage === index ? "w-[55px] translate-x-2" : "w-[40px] hover:w-[50px] opacity-90"
                            )}
                            title={`Jump to ${items[index].title}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>


                {/* --- Main Pages Container --- */}
                <div className="relative w-full h-full flex bg-transparent preserve-3d">

                    {/* SPINE */}
                    <div className="absolute left-[50%] top-0 bottom-0 w-[48px] -ml-[24px] z-50 h-full preserve-3d pointer-events-none">
                        {/* Spine Gradient - Simulating roundness */}
                        <div className="w-full h-full bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 rounded-sm shadow-inner" />
                        {/* Binding Details */}
                        <div className="absolute top-[5%] left-[50%] -translate-x-1/2 w-[2px] h-[90%] border-l-2 border-dashed border-white/20" />
                        <div className="absolute bottom-[5%] left-[50%] -translate-x-1/2 w-full h-[1px] bg-white/10" />
                        <div className="absolute top-[5%] left-[50%] -translate-x-1/2 w-full h-[1px] bg-white/10" />
                    </div>

                    {/* --- LEFT STACK (Static) --- */}
                    <div className="relative flex-1 bg-[#fdfbf6] rounded-l-md border-r border-[#e0e0e0] z-0">
                        <PageStack side="left" count={Math.min(currentPage, 5)} /> {/* Dynamic stack height */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60 rounded-l-md" />

                        {/* Content */}
                        <div className="p-8 flex flex-col h-full relative z-10 opacity-60 overflow-hidden">
                            {leftStackItem ? (
                                <div className="flex flex-col h-full">
                                    <span className="font-serif text-xs text-gray-400 tracking-widest uppercase mb-4 border-b border-gray-200 pb-2">Archived: {leftStackItem.title}</span>
                                    <div className="w-full h-32 relative grayscale opacity-70 mb-4 rounded overflow-hidden">
                                        <Image src={leftStackItem.img} alt={leftStackItem.title} fill className="object-cover" />
                                    </div>
                                    <p className="text-xs text-gray-400 font-serif line-clamp-[8] leading-relaxed">{leftStackItem.description}</p>
                                    <span className="mt-auto text-center font-mono text-xs text-gray-300">{items.indexOf(leftStackItem) + 1}</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-300 font-serif italic text-center p-10 select-none pointer-events-none">
                                    <div className="w-16 h-16 rounded-full border-4 border-gray-200 mb-4 flex items-center justify-center opacity-50">
                                        <span className="text-2xl">Start</span>
                                    </div>
                                    The Beginning of<br />Your Journey
                                </div>
                            )}
                        </div>
                        {/* Shadow from Spine */}
                        <div className="absolute right-0 top-0 bottom-0 w-[40px] bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-20" />
                    </div>


                    {/* --- RIGHT STACK (Static) --- */}
                    <div className="relative flex-1 bg-white rounded-r-md z-0">
                        <PageStack side="right" count={Math.min(items.length - currentPage - 1, 5)} /> {/* Dynamic stack height */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60 rounded-r-md" />

                        {/* Content */}
                        <div className="p-4 md:p-8 flex flex-col h-full relative z-10 overflow-hidden">
                            {rightStackItem ? (
                                <div className="flex flex-col h-full opacity-60 blur-[0.5px]"> {/* Slightly blurred to indicate depth */}
                                    <div className="w-full h-48 relative mb-6 rounded-sm overflow-hidden border-[4px] border-white shadow-sm">
                                        <Image src={rightStackItem.img} alt={rightStackItem.title} fill className="object-cover" />
                                    </div>
                                    <h2 className="text-2xl font-bold font-serif text-neutral-400 mb-3">{rightStackItem.title}</h2>
                                    <span className="mt-auto text-right font-mono text-xs text-gray-300">{items.indexOf(rightStackItem) + 1}</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-300 font-serif italic text-center select-none pointer-events-none">
                                    <div className="opacity-50">End of Playbooks</div>
                                </div>
                            )}
                        </div>
                        {/* Shadow from Spine */}
                        <div className="absolute left-0 top-0 bottom-0 w-[40px] bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-20" />
                    </div>


                    {/* --- ANIMATION LAYER (Flipping Page) --- */}
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
                            {/* The Flipping Page Element */}
                            <motion.div
                                className="w-[50%] h-full relative pointer-events-auto"
                                style={{
                                    transformOrigin: "left center",
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                {/* FRONT FACE (Current Page) */}
                                <div className="absolute inset-0 bg-[#fffefb] backface-hidden flex flex-col p-4 md:p-8 border-l border-neutral-100 rounded-r-sm overflow-hidden transform-style-3d">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60 pointer-events-none" />

                                    {/* Dynamic Lighting Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-black/5 pointer-events-none z-50 mix-blend-overlay" />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-full flex justify-between items-center mb-6 border-b-2 border-neutral-100 pb-2">
                                            <span className="font-serif text-xs text-neutral-400 tracking-widest uppercase">Chapter {currentPage + 1}</span>
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 rounded-full bg-red-400/50" />
                                                <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
                                                <div className="w-2 h-2 rounded-full bg-green-400/50" />
                                            </div>
                                        </div>

                                        <div className="w-full h-32 md:h-48 relative mb-4 md:mb-6 rounded-sm overflow-hidden shadow-md border-[4px] md:border-[6px] border-white transform rotate-1 hover:rotate-0 transition-transform duration-300">
                                            <Image src={currentItem.img} alt={currentItem.title} fill className="object-cover" />
                                        </div>

                                        <h2 className="text-lg md:text-3xl font-bold font-serif text-neutral-800 mb-2 md:mb-3 leading-tight">{currentItem.title}</h2>
                                        <p className="text-xs md:text-base text-neutral-600 font-serif leading-relaxed line-clamp-3 md:line-clamp-none">
                                            {currentItem.content || currentItem.description}
                                        </p>

                                        <div className="mt-auto pt-6 flex justify-between items-center border-t border-neutral-100">
                                            <span className="font-mono text-xs text-neutral-400">Page {currentPage + 1}</span>
                                            <a
                                                href={currentItem.link}
                                                target="_blank"
                                                className="group flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-neutral-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                            >
                                                {currentPage === items.length - 1 ? (
                                                    <span className="flex items-center gap-2">Support Now <IconCoffee size={14} className="group-hover:rotate-12 transition-transform" /></span>
                                                ) : (
                                                    <span className="flex items-center gap-2">Read Guide <IconArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
                                                )}
                                            </a>
                                        </div>
                                    </div>
                                    {/* Spine Shadow on Page */}
                                    <div className="absolute left-0 top-0 bottom-0 w-[15px] bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-20" />
                                </div>

                                {/* BACK FACE (Previous State Visual) */}
                                <div
                                    className="absolute inset-0 bg-[#fdfbf6] backface-hidden flex flex-col p-8 border-r border-neutral-200 rounded-l-sm overflow-hidden"
                                    style={{ transform: "rotateY(180deg)" }}
                                >
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60 pointer-events-none" />

                                    {/* Dynamic Lighting Overlay for Back Face */}
                                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-black/5 pointer-events-none z-50 mix-blend-overlay" />

                                    <div className="relative z-10 flex flex-col h-full opacity-50 grayscale">
                                        <h3 className="text-xl font-bold font-serif text-neutral-800 mb-4">{currentItem.title}</h3>
                                        <div className="w-full h-40 relative rounded bg-gray-200 mb-4 overflow-hidden">
                                            <Image src={currentItem.img} alt={currentItem.title} fill className="object-cover" />
                                        </div>
                                        <p className="text-xs font-serif text-neutral-500 line-clamp-4">{currentItem.description}</p>
                                        <div className="mt-auto text-center font-mono text-xs text-gray-400">{currentPage + 1}</div>
                                    </div>
                                    {/* Spine Shadow on Page */}
                                    <div className="absolute right-0 top-0 bottom-0 w-[15px] bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-20" />
                                </div>
                            </motion.div>

                        </motion.div>
                    </AnimatePresence>

                </div>
            </div>

            {/* Modern Controls */}
            <div className="flex items-center gap-8 mt-16 z-50">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 0 || isAnimating}
                    className="group relative flex flex-col items-center gap-2 p-2 disabled:opacity-30 disabled:pointer-events-none transition-opacity"
                >
                    <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all">
                        <IconArrowLeft size={20} className="text-white" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 group-hover:translate-y-0">Prev</span>
                </button>

                <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <button
                    onClick={handleNext}
                    disabled={currentPage === items.length - 1 || isAnimating}
                    className="group relative flex flex-col items-center gap-2 p-2 disabled:opacity-30 disabled:pointer-events-none transition-opacity"
                >
                    <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all">
                        <IconArrowRight size={20} className="text-white" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 group-hover:translate-y-0">Next</span>
                </button>
            </div>
        </div>
    );
};
