"use client";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

export const NoiseBackground = ({
    children,
    className,
    containerClassName,
    gradientColors = [
        "rgb(255, 100, 150)",
        "rgb(100, 150, 255)",
        "rgb(255, 200, 100)",
    ],
    noiseOpacity = 0.05,
    speed = 10,
    backdropBlur = false,
    animated = true,
}: {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    gradientColors?: string[];
    noiseOpacity?: number;
    speed?: number;
    backdropBlur?: boolean;
    animated?: boolean;
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={cn(
                "relative overflow-hidden bg-white dark:bg-neutral-950",
                containerClassName
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={cn(
                    "absolute inset-0 z-0 opacity-30",
                    animated && "animate-noise"
                )}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opactiy='${noiseOpacity}'/%3E%3C/svg%3E")`,
                    opacity: noiseOpacity,
                }}
            />
            <div className="absolute inset-0 z-0 overflow-hidden">
                {gradientColors.map((color, idx) => (
                    <motion.div
                        key={idx}
                        className="absolute w-[150%] h-[150%] rounded-full mix-blend-multiply filter blur-[80px] opacity-70"
                        style={{
                            backgroundColor: color,
                            left: "-25%",
                            top: "-25%",
                        }}
                        animate={{
                            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
                            y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
                            scale: [1, 1.2, 0.8, 1],
                        }}
                        transition={{
                            duration: speed + idx * 2,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {backdropBlur && (
                <div className="absolute inset-0 z-10 backdrop-blur-xl bg-white/10 dark:bg-black/10" />
            )}

            <div className={cn("relative z-20", className)}>{children}</div>
        </div>
    );
};
