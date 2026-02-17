"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";
import Image from "next/image";

// --- Main Navbar Container ---
export const Navbar = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(true);
    const [shrink, setShrink] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            const direction = current - scrollYProgress.getPrevious()!;
            if (scrollYProgress.get() < 0.05) {
                setVisible(true);
                setShrink(false);
            } else {
                setVisible(direction < 0 || scrollYProgress.get() < 0.1);
                setShrink(true);
            }
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={cn(
                    "fixed top-4 inset-x-0 mx-auto z-[5000] w-[95%] max-w-5xl",
                    className
                )}
            >
                <motion.div
                    animate={{
                        paddingLeft: shrink ? "16px" : "24px",
                        paddingRight: shrink ? "16px" : "24px",
                        paddingTop: shrink ? "8px" : "12px",
                        paddingBottom: shrink ? "8px" : "12px",
                    }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                    style={{
                        backdropFilter: "blur(20px) saturate(180%)",
                        backgroundColor: "rgba(3, 0, 20, 0.85)",
                    }}
                >
                    {children}
                </motion.div>
            </motion.nav>
        </AnimatePresence>
    );
};

// --- Desktop Nav Body ---
export const NavBody = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={cn("hidden md:flex items-center justify-between w-full", className)}>
            {children}
        </div>
    );
};

// --- Nav Items ---
export const NavItems = ({
    items,
    className,
}: {
    items: { name: string; link: string; icon?: React.ReactNode }[];
    className?: string;
}) => {
    return (
        <div className={cn("flex items-center gap-1", className)}>
            {items.map((item, idx) => (
                <Link
                    key={`nav-${idx}`}
                    href={item.link}
                    className="relative px-3 py-2 text-sm text-white/60 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.05] group"
                >
                    <span className="relative z-10 flex items-center gap-1.5">
                        {item.icon && <span className="text-purple">{item.icon}</span>}
                        {item.name}
                    </span>
                </Link>
            ))}
        </div>
    );
};

// --- Navbar Logo ---
export const NavbarLogo = ({ className }: { className?: string }) => {
    return (
        <Link href="/" className={cn("flex items-center gap-2.5 shrink-0", className)}>
            <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-purple/40 shadow-sm">
                <Image
                    src="/favicon.svg"
                    alt="Logo"
                    width={28}
                    height={28}
                    className="object-cover w-full h-full"
                />
            </div>
            <span className="text-sm font-semibold text-white tracking-wide">
                Tushar
            </span>
        </Link>
    );
};

// --- Navbar Button ---
export const NavbarButton = ({
    children,
    variant = "primary",
    className,
    onClick,
    href,
}: {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    className?: string;
    onClick?: () => void;
    href?: string;
}) => {
    const baseStyles = "px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200";
    const variants = {
        primary:
            "bg-purple text-black hover:bg-purple/90 shadow-[0_0_15px_rgba(203,172,249,0.25)] hover:shadow-[0_0_25px_rgba(203,172,249,0.4)]",
        secondary:
            "text-white/70 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/[0.05]",
    };

    if (href) {
        return (
            <Link href={href} className={cn(baseStyles, variants[variant], className)}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={cn(baseStyles, variants[variant], className)}>
            {children}
        </button>
    );
};

// --- Mobile Nav ---
export const MobileNav = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={cn("md:hidden", className)}>{children}</div>;
};

// --- Mobile Nav Header ---
export const MobileNavHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={cn("flex items-center justify-between w-full", className)}>
            {children}
        </div>
    );
};

// --- Mobile Nav Toggle ---
export const MobileNavToggle = ({
    isOpen,
    onClick,
}: {
    isOpen: boolean;
    onClick: () => void;
}) => {
    return (
        <button
            onClick={onClick}
            className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 text-white"
            aria-label="Toggle menu"
        >
            <motion.span
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
                className="block w-5 h-[2px] bg-current rounded-full"
            />
            <motion.span
                animate={{ opacity: isOpen ? 0 : 1 }}
                className="block w-5 h-[2px] bg-current rounded-full"
            />
            <motion.span
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
                className="block w-5 h-[2px] bg-current rounded-full"
            />
        </button>
    );
};

// --- Mobile Nav Menu ---
export const MobileNavMenu = ({
    children,
    isOpen,
    onClose,
    className,
}: {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className={cn(
                        "overflow-hidden mt-3 flex flex-col gap-3 py-4 border-t border-white/[0.08]",
                        className
                    )}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
