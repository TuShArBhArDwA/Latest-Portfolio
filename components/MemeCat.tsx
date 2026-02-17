"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { catPhrases, catQuestions } from "@/data";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";

const MemeCat = () => {
    const controls = useAnimation();

    // Track exact position for pausing and resuming
    const positionRef = useRef({ x: 0, y: -100 });
    // Guard to prevent race conditions with hover
    const isHoveredRef = useRef(false);
    // Guard to prevent stale closure with modal
    const modalOpenRef = useRef(false);

    const [content, setContent] = useState("");
    const [showBubble, setShowBubble] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);

    // States: falling, walking, sitting, waiting
    const [state, setState] = useState<'falling' | 'walking' | 'sitting' | 'waiting'>('falling');
    const stateRef = useRef<'falling' | 'walking' | 'sitting' | 'waiting'>('falling');

    const [direction, setDirection] = useState(1);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isMobile, setIsMobile] = useState(false);

    // Timers
    const sitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Helper to set state and ref in sync
    const setStateSynced = useCallback((newState: 'falling' | 'walking' | 'sitting' | 'waiting') => {
        stateRef.current = newState;
        setState(newState);
    }, []);

    // Clear all timeouts
    const clearAllTimeouts = useCallback(() => {
        if (sitTimeoutRef.current) {
            clearTimeout(sitTimeoutRef.current);
            sitTimeoutRef.current = null;
        }
    }, []);

    // Initialize
    useEffect(() => {
        const updateDimensions = () => {
            if (typeof window !== 'undefined') {
                setDimensions({ width: window.innerWidth, height: window.innerHeight });
                setIsMobile(window.innerWidth < 768);
            }
        };
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Roaming Logic: Walk to a random point on the screen edge
    const startRoaming = useCallback(async () => {
        // Don't start if hovered or modal open (use ref for synchronous check)
        if (isHoveredRef.current || modalOpenRef.current) return;

        setStateSynced('walking');

        const catSize = isMobile ? 56 : 80;
        // Pick a random edge: 0=Top, 1=Right, 2=Bottom, 3=Left
        const edge = Math.floor(Math.random() * 4);

        let newX: number, newY: number;

        switch (edge) {
            case 0: // Top edge
                newX = Math.random() * (dimensions.width - catSize);
                newY = 0;
                break;
            case 1: // Right edge
                newX = dimensions.width - catSize;
                newY = Math.random() * (dimensions.height - catSize);
                break;
            case 2: // Bottom edge
                newX = Math.random() * (dimensions.width - catSize);
                newY = dimensions.height - catSize;
                break;
            case 3: // Left edge
                newX = 0;
                newY = Math.random() * (dimensions.height - catSize);
                break;
            default:
                newX = dimensions.width / 2;
                newY = dimensions.height / 2;
        }

        const currentX = positionRef.current.x;
        const currentY = positionRef.current.y;

        const dx = newX - currentX;
        const dy = newY - currentY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const speed = 80;
        const duration = Math.max(2, dist / speed);

        setDirection(dx > 0 ? 1 : -1);

        try {
            await controls.start({
                x: newX,
                y: newY,
                transition: { duration: duration, ease: "linear" }
            });

            // After animation completes, check if still not hovered
            if (isHoveredRef.current) return;

            // Reached edge -> Sit for exactly 2 seconds
            setStateSynced('sitting');

            sitTimeoutRef.current = setTimeout(() => {
                if (!isHoveredRef.current) {
                    startRoaming();
                }
            }, 2000);

        } catch {
            // Animation was stopped (hover or modal)
        }
    }, [controls, dimensions, isMobile, modalOpen, setStateSynced]);

    // Initial Fall
    useEffect(() => {
        if (dimensions.width === 0) return;

        const startFall = async () => {
            // Start from center top
            const startX = dimensions.width / 2 - 50;
            positionRef.current = { x: startX, y: -100 };
            controls.set({ x: startX, y: -100 });

            // Fall to bottom-right area
            const targetY = dimensions.height - 150;
            const targetX = dimensions.width - 150;

            await controls.start({
                x: targetX,
                y: targetY,
                transition: { duration: 2, ease: "easeIn" }
            });

            positionRef.current = { x: targetX, y: targetY };
            setStateSynced('sitting');

            // Sit for 2 seconds then start roaming
            sitTimeoutRef.current = setTimeout(() => {
                startRoaming();
            }, 2000);
        };

        startFall();

        return () => clearAllTimeouts();
    }, [dimensions.width]);

    // Handle hover start
    const handleMouseEnter = useCallback(() => {
        if (modalOpen || stateRef.current === 'falling') return;

        isHoveredRef.current = true;

        // Stop animation immediately
        controls.stop();

        // Clear any pending sit timeout
        clearAllTimeouts();

        // Switch to waiting state
        setStateSynced('waiting');
    }, [modalOpen, controls, clearAllTimeouts, setStateSynced]);

    // Handle hover end
    const handleMouseLeave = useCallback(() => {
        if (modalOpen || stateRef.current === 'falling') return;

        isHoveredRef.current = false;

        // Resume roaming
        startRoaming();
    }, [modalOpen, startRoaming]);

    // Handle click -> open modal
    const handleCatClick = useCallback(() => {
        modalOpenRef.current = true;
        setModalOpen(true);
        setShowBubble(false);
        controls.stop();
        clearAllTimeouts();
    }, [controls, clearAllTimeouts]);

    // Determine which image to show
    const getCatImage = useCallback(() => {
        switch (stateRef.current) {
            case 'waiting':
                return "/cat-wait.gif";
            case 'sitting':
                return "/cat-sit.gif";
            case 'walking':
            case 'falling':
            default:
                return "/cat-walk.gif";
        }
    }, [state]); // state dependency to trigger re-render

    // Track position via onUpdate
    const handleAnimationUpdate = useCallback((latest: { [key: string]: string | number }) => {
        if (typeof latest.x === 'number') positionRef.current.x = latest.x;
        if (typeof latest.y === 'number') positionRef.current.y = latest.y;
    }, []);

    // Mumbling Logic
    useEffect(() => {
        if (modalOpen) return;
        const mumble = () => {
            if (stateRef.current === 'falling' || stateRef.current === 'waiting') return;

            const phrase = catPhrases[Math.floor(Math.random() * catPhrases.length)];
            setContent(phrase);
            setShowBubble(true);
            setTimeout(() => setShowBubble(false), 3000);
        };
        const interval = setInterval(mumble, 7000);
        return () => clearInterval(interval);
    }, [modalOpen, state]);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 z-[9999] cursor-pointer pointer-events-auto"
                animate={controls}
                onUpdate={handleAnimationUpdate}
                onClick={handleCatClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.1 }}
            >
                {/* Thought Bubble */}
                <AnimatePresence>
                    {showBubble && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: -10 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute -top-16 md:-top-20 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] md:text-sm p-2 md:p-3 rounded-2xl shadow-lg w-32 md:w-40 text-center pointer-events-none z-50"
                        >
                            <div className="relative">
                                {content}
                                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Cat Image with Border */}
                <div className="flex flex-col items-center justify-center">
                    <motion.div
                        animate={{ scaleX: direction }}
                        transition={{ duration: 0.1 }}
                        className="relative w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-purple/60 shadow-[0_0_15px_rgba(139,92,246,0.3)] bg-black-200/50 p-1"
                    >
                        <Image
                            src={getCatImage()}
                            alt="Meme Cat"
                            fill
                            className="object-contain drop-shadow-lg rounded-full"
                            unoptimized
                        />
                    </motion.div>
                    {/* Name Tag */}
                    <span className="mt-1 text-[8px] md:text-[10px] font-bold text-purple bg-black-200/80 px-2 py-0.5 rounded-full border border-purple/30 whitespace-nowrap tracking-wider">
                        MINI ANON
                    </span>
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
                            <button
                                onClick={() => {
                                    modalOpenRef.current = false;
                                    setModalOpen(false);
                                    isHoveredRef.current = false;
                                    // Small delay to let React state sync, then resume
                                    setTimeout(() => startRoaming(), 50);
                                }}
                                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-50"
                            >
                                <IoMdClose size={24} />
                            </button>

                            <div className="flex flex-col items-center mb-6">
                                <div className="relative w-32 h-32 mb-4 rounded-full border-2 border-purple/60 shadow-[0_0_20px_rgba(139,92,246,0.4)] bg-black-200/50 p-1">
                                    <Image
                                        src="/cat-intro.gif"
                                        alt="Cat Intro"
                                        fill
                                        className="object-contain rounded-full"
                                        unoptimized
                                    />
                                </div>
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
