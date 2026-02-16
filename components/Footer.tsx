import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "@/data";
import MagicButton from "./ui/MagicButton";
import { FloatingDock } from "./ui/floating-dock";
import { LayoutTextFlip } from "./ui/layout-text-flip";

const Footer = () => {
  return (
    <footer className="w-full pb-10 mb-[100px] md:mb-5" id="contact">
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw] flex flex-col items-center justify-center gap-4">
          <span>Ready to take <span className="text-purple">your</span></span>
          <LayoutTextFlip
            text=""
            words={["digital presence", "business goals", "tech stack", "user experience"]}
            className="text-4xl md:text-5xl font-bold px-2 text-purple"
          />
          <span>to the next level?</span>
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <a href="https://topmate.io/tusharbhardwaj" target="_blank">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2026 <a href="https://www.linkedin.com/in/bhardwajtushar2004/" target="_blank" rel="noopener noreferrer" className="text-purple font-semibold hover:text-purple/80 transition-colors">Tushar Bhardwaj</a>
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          <FloatingDock items={
            socialMedia.map((info) => ({
              title: info.id === 1 ? "GitHub" : info.id === 2 ? "Twitter" : info.id === 3 ? "LinkedIn" : info.id === 4 ? "YouTube" : "Medium",
              icon: <img src={info.img} alt="icons" width={20} height={20} className="h-full w-full object-contain" />,
              href: info.link
            }))
          } />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
