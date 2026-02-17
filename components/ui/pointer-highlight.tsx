"use client";
import { cn } from "@/utils/cn";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React from "react";

export const PointerHighlight = ({
    children,
    className,
    containerClassName,
}: {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}) => {
    return (
        <span
            className={cn(
                "relative inline-block pb-1   px-1 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500",
                containerClassName
            )}
        >
            <span
                className={cn(
                    "relative z-10 inline-block decoration-clone bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-300 dark:to-purple-300",
                    className
                )}
            >
                {children}
            </span>
            <motion.span
                initial={{
                    backgroundSize: "0% 100%",
                }}
                animate={{
                    backgroundSize: "100% 100%",
                }}
                transition={{
                    duration: 2,
                    ease: "linear",
                    delay: 0.5,
                }}
                style={{
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left center",
                    display: "inline",
                }}
                className={cn(
                    `absolute inset-0 z-0 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500`,
                    className
                )}
            ></motion.span>
        </span>
    );
};

export const HeroHighlight = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <motion.span
            initial={{
                backgroundSize: "0% 100%",
            }}
            animate={{
                backgroundSize: "100% 100%",
            }}
            transition={{
                duration: 2,
                ease: "linear",
                delay: 0.5,
            }}
            style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                display: "inline",
            }}
            className={cn(
                `relative inline-block pb-1   px-1 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500`,
                className
            )}
        >
            {children}
        </motion.span>
    );
};
