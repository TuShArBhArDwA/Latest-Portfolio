"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { cn } from "@/utils/cn";
import { BsThreeDotsVertical } from "react-icons/bs";

interface CompareProps {
    firstImage: string;
    secondImage: string;
    className?: string;
    firstImageClassName?: string;
    secondImageClassname?: string;
    initialSliderPercentage?: number;
    slideMode?: "hover" | "drag";
    showHandlebar?: boolean;
}

export const Compare = ({
    firstImage,
    secondImage,
    className,
    firstImageClassName,
    secondImageClassname,
    initialSliderPercentage = 50,
    slideMode = "hover",
    showHandlebar = true,
}: CompareProps) => {
    const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage);
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!sliderRef.current) return;
        if (slideMode === "hover" || (slideMode === "drag" && isDragging)) {
            const rect = sliderRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = (x / rect.width) * 100;
            requestAnimationFrame(() => {
                setSliderXPercent(Math.max(0, Math.min(100, percent)));
            });
        }
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => {
        if (slideMode === "drag") setIsDragging(false);
    };

    return (
        <div
            ref={sliderRef}
            className={cn("w-full h-full overflow-hidden relative select-none", className)}
            style={{
                cursor: slideMode === "drag" ? "grab" : "col-resize",
            }}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            {/* Second Image (Background/Underneath) */}
            <img
                src={secondImage}
                className={cn(
                    "absolute top-0 left-0 w-full h-full object-cover object-left-top",
                    secondImageClassname
                )}
                alt="Second Image"
                draggable={false}
            />

            {/* First Image (Foreground/Over) */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full overflow-hidden select-none"
                animate={{
                    clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
                }}
                transition={{ duration: 0 }} // Instant update for responsiveness
            >
                <img
                    src={firstImage}
                    className={cn(
                        "absolute top-0 left-0 w-full h-full object-cover object-left-top select-none",
                        firstImageClassName
                    )}
                    alt="First Image"
                    draggable={false}
                />
            </motion.div>

            {/* Slider Handle */}
            {showHandlebar && (
                <motion.div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                    style={{
                        left: `${sliderXPercent}%`,
                    }}
                    animate={{
                        left: `${sliderXPercent}%`,
                    }}
                    transition={{ duration: 0 }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                        <BsThreeDotsVertical size={16} className="text-black opacity-50" />
                    </div>
                </motion.div>
            )}
        </div>
    );
};
