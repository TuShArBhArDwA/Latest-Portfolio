import { FaLocationArrow } from "react-icons/fa"
import MagicButton from "./ui/MagicButton"
import { Spotlight } from "./ui/Spotlight"
import { TypewriterEffectSmooth } from "./ui/typewriter-effect"

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
                    <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
                        {/* Dynamic Website */}
                    </h2>
                    <TypewriterEffectSmooth words={words} />
                    <p className="text-center md:tracking-wider mb-4 text-xs md:text-lg lg:text-2xl">
                        Hi, I&apos;m Tushar, a Software Developer based in India.
                    </p>
                    <a href="#projects">
                        <MagicButton title="Show my work" icon={<FaLocationArrow />} position='right' />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Hero
