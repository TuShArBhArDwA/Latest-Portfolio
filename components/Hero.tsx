"use client";
import { FaLocationArrow } from "react-icons/fa"
import MagicButton from "./ui/MagicButton"
import { Spotlight } from "./ui/Spotlight"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const roles = ["Software Developer", "Full-Stack Engineer", "Open Source Contributor", "Industry Evangelist"];

const Hero = () => {
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pb-10 pt-28">

            <div>
                <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
                <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple" />
                <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
            </div>
            <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>

            <div className="flex justify-center relative my-10 z-10">
                <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">

                    {/* Rotating role badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple/20 bg-purple/[0.05] backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={roleIndex}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-sm text-purple/80 font-medium tracking-wide"
                                >
                                    {roles[roleIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Name — large & bold */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center leading-tight"
                    >
                        Hi, I&apos;m{" "}
                        <span className="bg-gradient-to-r from-purple via-indigo-300 to-purple bg-clip-text text-transparent">
                            Tushar
                        </span>
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                        className="mt-6 text-xl md:text-2xl lg:text-3xl text-white/70 text-center font-light leading-relaxed max-w-2xl"
                    >
                        I build{" "}
                        <span className="shimmer-text font-semibold">
                            scalable digital products
                        </span>{" "}
                        that solve real problems
                    </motion.p>

                    {/* CTA buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.5 }}
                        className="flex items-center gap-4 mt-10 z-20"
                    >
                        <a href="#projects">
                            <MagicButton title="View Projects" icon={<FaLocationArrow />} position="right" />
                        </a>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}

export default Hero
