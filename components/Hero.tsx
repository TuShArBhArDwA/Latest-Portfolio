"use client";
import { FaLocationArrow } from "react-icons/fa"
import MagicButton from "./ui/MagicButton"
import { Spotlight } from "./ui/Spotlight"
import { motion } from "framer-motion"

const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.04, duration: 0.3, ease: "easeOut" },
    }),
};

const wordVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { delay: 0.8 + i * 0.12, duration: 0.5, ease: "easeOut" },
    }),
};

const Hero = () => {
    const subtitle = "SOFTWARE DEVELOPER";
    const taglineWords = ["Building", "Ideas", "into"];

    return (
        <div className="pb-20 pt-36">

            <div>
                <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
                <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple" />
                <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
            </div>
            <div className="h-screen w-full dark:bg-black-100 bg-white  dark:bg-grid-white/[0.3] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>
            <div className="flex justify-center relative my-20-z-10">
                <div className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center '>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-center mb-8"
                    >
                        {/* Staggered letter animation for "SOFTWARE DEVELOPER" */}
                        <p className="text-sm md:text-base tracking-[0.25em] uppercase text-white-100/50 font-light mb-2 flex justify-center flex-wrap">
                            {subtitle.split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={letterVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className={char === " " ? "w-2" : ""}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </p>

                        {/* Name with glow */}
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-purple to-white bg-clip-text text-transparent"
                            style={{ textShadow: "0 0 40px rgba(203,172,249,0.15)" }}
                        >
                            Tushar Bhardwaj
                        </motion.h2>
                    </motion.div>

                    {/* Tagline */}
                    <h1
                        className="text-center text-3xl md:text-5xl lg:text-6xl font-bold max-w-4xl leading-relaxed lg:leading-snug tracking-tight mx-auto"
                    >
                        {taglineWords.map((word, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={wordVariants}
                                initial="hidden"
                                animate="visible"
                                className="inline-block mr-[0.3em] text-white"
                            >
                                {word}
                            </motion.span>
                        ))}
                        <br className="hidden md:block" />
                        {/* Highlighted phrase with shimmer gradient + glow underline */}
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
                            className="relative inline-block mt-1"
                        >
                            <span className="shimmer-text text-3xl md:text-5xl lg:text-6xl font-bold">
                                Scalable Digital Products
                            </span>
                            {/* Animated glow underline */}
                            <motion.span
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
                                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500 origin-left"
                            />
                            {/* Soft glow backdrop */}
                            <span
                                className="absolute -inset-x-4 -inset-y-2 rounded-xl pointer-events-none -z-10"
                                style={{
                                    background: "radial-gradient(ellipse at center, rgba(129,140,248,0.08) 0%, transparent 70%)",
                                    animation: "glow-pulse 3s ease-in-out infinite",
                                }}
                            />
                        </motion.span>
                    </h1>

                    <motion.a
                        href="#projects"
                        className="mt-10 z-20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8, duration: 0.5 }}
                    >
                        <MagicButton title="Show my work" icon={<FaLocationArrow />} position='right' />
                    </motion.a>
                </div>
            </div>
        </div>
    )
}

export default Hero
