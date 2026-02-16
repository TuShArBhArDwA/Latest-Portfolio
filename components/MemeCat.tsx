"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { catPhrases, catQuestions } from "@/data";
import { IoMdClose } from "react-icons/io";
import { FaCat } from "react-icons/fa";

const MemeCat = () => {
    const [isFalling, setIsFalling] = useState(true);
    const [position, setPosition] = useState({ x: 0, y: -100 }); // Initial position off-screen
    const [content, setContent] = useState("");
    const [showBubble, setShowBubble] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);

    // State to track direction and movement duration
    const [direction, setDirection] = useState(1); // 1 for right, -1 for left
    const [duration, setDuration] = useState(2);

    // Screen dimensions for roaming boundaries
    const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        // Update dimensions on mount and resize
        const updateDimensions = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Initial Falling Animation
    useEffect(() => {
        // Start falling from top center
        setPosition({ x: dimensions.width / 2 - 50, y: -100 });

        const timeout = setTimeout(() => {
            setIsFalling(false);
            // Land somewhere near bottom right initially
            setPosition({ x: dimensions.width - 150, y: dimensions.height - 150 });
        }, 100);

        return () => clearTimeout(timeout);
    }, [dimensions.width, dimensions.height]);

    // Better Roaming Logic with direction
    useEffect(() => {
        if (isFalling || modalOpen) return;

        const moveCat = () => {
            const padding = dimensions.width < 768 ? 40 : 100;
            const newX = Math.random() * (dimensions.width - padding);
            const newY = Math.random() * (dimensions.height - padding);

            // Determine direction based on current position (approximate)
            setPosition((prev) => {
                const dx = newX - prev.x;
                setDirection(dx > 0 ? 1 : -1);

                // Calculate duration based on distance (speed = distance / time)
                // Minimal duration of 3s, max of 10s roughly
                const distance = Math.sqrt(Math.pow(newX - prev.x, 2) + Math.pow(newY - prev.y, 2));
                const speed = 70; // pixels per second (slower is more realistic)
                const newDuration = Math.max(3, distance / speed);
                setDuration(newDuration);

                return { x: newX, y: newY };
            });
        };

        // Move immediately then interval
        moveCat();
        // Since duration is variable, we can't use a fixed interval easily without potential overlap
        // But for simplicity, a long enough interval is fine.
        const intervalId = setInterval(() => {
            moveCat();
        }, 12000); // Allow enough time for movement before next move

        return () => clearInterval(intervalId);
    }, [isFalling, modalOpen, dimensions]);

    // Mumbling Logic
    useEffect(() => {
        if (modalOpen) return;

        const mumble = () => {
            const phrase = catPhrases[Math.floor(Math.random() * catPhrases.length)];
            setContent(phrase);
            setShowBubble(true);
            setTimeout(() => setShowBubble(false), 3000);
        };

        const interval = setInterval(mumble, 7000 + Math.random() * 5000); // Talk every 7-12 seconds
        return () => clearInterval(interval);
    }, [modalOpen]);

    const handleCatClick = () => {
        setModalOpen(true);
        setShowBubble(false);
    };

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 z-[9999] cursor-pointer pointer-events-auto"
                initial={{ y: -200, x: 0, scaleX: 1 }}
                animate={{
                    x: position.x,
                    y: position.y,
                    rotate: isFalling ? 360 : 0,
                }}
                transition={{
                    duration: isFalling ? 2 : duration,
                    ease: "linear", // Smooth roaming movement
                    rotate: { duration: 2 } // Rotate faster if falling
                }}
                onClick={handleCatClick}
                whileHover={{ scale: 1.1, rotate: 10 }} // Maintain direction on hover
            >
                {/* Thought Bubble */}
                <AnimatePresence>
                    {showBubble && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: -10 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute -top-16 md:-top-20 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] md:text-sm p-2 md:p-3 rounded-2xl shadow-lg w-32 md:w-40 text-center pointer-events-none"
                        >
                            <div className="relative">
                                {content}
                                {/* Bubble Tail */}
                                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Cat Image - Fallback to Icon */}
                <div className="flex flex-col items-center justify-center">
                    <motion.div
                        animate={{ scaleX: direction }}
                        transition={{ duration: 0.2 }}
                    >
                        <FaCat size={isMobile ? 50 : 80} className="text-white drop-shadow-lg" />
                    </motion.div>
                    <p className="text-white text-[10px] md:text-xs font-bold bg-black/50 px-2 rounded mt-1">Meow!</p>
                </div>
            </motion.div>

            {/* Q&A Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <div className="fixed inset-0 bg-black/60 z-[10000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="bg-[#1a1a2e] border border-purple/50 p-4 md:p-6 rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setModalOpen(false)}
                                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                            >
                                <IoMdClose size={24} />
                            </button>

                            <div className="flex flex-col items-center mb-6">
                                <FaCat size={80} className="text-purple mb-4" />
                                <h2 className="text-xl font-bold text-white text-center">
                                    I am <span className="text-purple">Mini Anon</span>!
                                </h2>
                                <p className="text-white-200 text-sm text-center">
                                    Ask me anything about Tushar!
                                </p>
                            </div>

                            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                                {catQuestions.map((q) => (
                                    <QuestionItem
                                        key={q.id}
                                        q={q}
                                        isOpen={activeQuestionId === q.id}
                                        onClick={() => setActiveQuestionId(activeQuestionId === q.id ? null : q.id)}
                                    />
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/10 flex justify-center">
                                <a
                                    href="https://www.buymeacoffee.com/tusharbhardwaj"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-[#FFDD00] text-black font-bold rounded-full hover:bg-[#ffea00] transition-transform hover:scale-105"
                                >
                                    ☕ Buy me pet food
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

const QuestionItem = ({ q, isOpen, onClick }: { q: { id: number, question: string, answer: string }, isOpen: boolean, onClick: () => void }) => {
    return (
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <button
                onClick={onClick}
                className="w-full text-left p-3 text-sm font-medium text-white hover:bg-white/5 transition-colors flex justify-between items-center"
            >
                {q.question}
                <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-3 pt-0 text-sm text-white-200 leading-relaxed border-t border-white/5">
                            {q.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MemeCat;
