"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const DraggableCardContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("relative w-full h-full overflow-hidden", className)}>
            {children}
        </div>
    );
};

export const DraggableCardBody = ({
    children,
    className,
    containerRef,
}: {
    children: React.ReactNode;
    className?: string;
    containerRef?: React.RefObject<HTMLDivElement>;
}) => {
    const ref = useRef(null);

    return (
        <motion.div
            ref={ref}
            drag
            dragConstraints={containerRef}
            whileDrag={{ scale: 1.1, zIndex: 100 }}
            dragElastic={0.1}
            className={cn(
                "bg-gray-50 relative group/card dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border cursor-grab active:cursor-grabbing",
                className
            )}
        >
            {children}
        </motion.div>
    );
};
