"use client";
import { FaLocationArrow } from "react-icons/fa"
import MagicButton from "./ui/MagicButton"
import { Spotlight } from "./ui/Spotlight"
import { TypewriterEffectSmooth } from "./ui/typewriter-effect"
import { HeroHighlight, Highlight } from "./ui/hero-highlight"
import { motion } from "framer-motion"


const Hero = () => {
    const words = [
        {
            text: "Transforming",
        },
        {
            text: "Concepts",
        },
        {
            text: "into",
        },
        {
            text: "Seamless",
        },
        {
            text: "User",
        },
        {
            text: "Experiences",
            className: "text-purple dark:text-purple",
        },
    ];
    return (
        <div className="pb-20 pt-36">
            <div>
                <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
                <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple" />
                <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
            </div>
            <div className="h-screen w-full dark:bg-black-100 bg-white  dark:bg-grid-white/[0.3] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
                {/* Radial gradient for the container to give a faded look */}
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

            </div>
            <div className="flex justify-center relative my-20-z-10">
                <div className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center '>


                    <div className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
                        Hi, I&apos;m Tushar, a Software Developer based in India.
                    </div>

                    <HeroHighlight containerClassName="h-auto w-full bg-transparent dark:bg-transparent">
                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: [20, -5, 0],
                            }}
                            transition={{
                                duration: 0.5,
                                ease: [0.4, 0.0, 0.2, 1],
                            }}
                            className="text-center text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl leading-relaxed lg:leading-snug tracking-tight mx-auto"
                        >
                            Transforming Concepts into{" "}
                            <Highlight className="text-black dark:text-white">
                                Seamless User Experiences
                            </Highlight>
                        </motion.h1>
                    </HeroHighlight>

                    <a href="#projects" className="mt-8 z-20">
                        <MagicButton title="Show my work" icon={<FaLocationArrow />} position='right' />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Hero
