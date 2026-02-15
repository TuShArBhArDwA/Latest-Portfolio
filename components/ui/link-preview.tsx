"use client";
import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { cn } from "@/utils/cn";

// Helper to encode params without external library
const encode = (params: Record<string, any>) => {
    return Object.keys(params)
        .map((key) => `${key}=${encodeURIComponent(params[key])}`)
        .join("&");
};

type LinkPreviewProps = {
    children: React.ReactNode;
    url: string;
    className?: string;
    width?: number;
    height?: number;
    quality?: number;
    layout?: string;
} & (
        | { isStatic: true; imageSrc: string }
        | { isStatic?: false; imageSrc?: never }
    );

export const LinkPreview = ({
    children,
    url,
    className,
    width = 200,
    height = 125,
    quality = 50,
    layout = "fixed",
    isStatic = false,
    imageSrc = "",
}: LinkPreviewProps) => {
    let src;
    if (!isStatic) {
        const params = encode({
            url,
            screenshot: true,
            meta: false,
            embed: "screenshot.url",
            colorScheme: "dark",
            "viewport.isMobile": true,
            "viewport.deviceScaleFactor": 1,
            "viewport.width": width * 3,
            "viewport.height": height * 3,
        });
        src = `https://api.microlink.io/?${params}`;
    } else {
        src = imageSrc;
    }

    const [isOpen, setOpen] = React.useState(false);

    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const springConfig = { stiffness: 100, damping: 15 };
    const x = useMotionValue(0);

    const translateX = useSpring(x, springConfig);

    const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const targetRect = event.currentTarget.getBoundingClientRect();
        const eventOffsetX = event.clientX - targetRect.left;
        const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2; // Reduce the effect to make it subtle
        x.set(offsetFromCenter);
    };

    return (
        <>
            {isMounted ? (
                <div className="hidden">
                    <img src={src} width={width} height={height} quality={quality} priority={true} alt="hidden image" />
                </div>
            ) : null}

            <Link
                href={url}
                className={cn("text-black dark:text-white", className)}
                target="_blank"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
            >
                {children}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.6 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                            },
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.6 }}
                        className="absolute z-50 -top-40 -left-10 translate-x-1/2 shadow-xl rounded-xl"
                        style={{
                            x: translateX,
                        }}
                    >
                        <Link
                            href={url}
                            className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={src}
                                width={width}
                                height={height}
                                className="rounded-lg object-cover"
                                alt="preview image"
                            />
                        </Link>
                    </motion.div>
                )}
            </Link>
        </>
    );
};
