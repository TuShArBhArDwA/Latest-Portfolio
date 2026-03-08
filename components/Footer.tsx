import { FaLocationArrow, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import MagicButton from "./ui/MagicButton";
import { LayoutTextFlip } from "./ui/layout-text-flip";

const Footer = () => {
  return (
    <footer className="w-full pb-10 mb-[100px] md:mb-5" id="contact">
      <div className="relative rounded-3xl border border-white/10 bg-white/5 dark:bg-black-200/50 backdrop-blur-md p-8 md:p-12 w-full mx-auto overflow-hidden flex flex-col items-center justify-center text-center shadow-2xl">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <h1 className="heading lg:max-w-[45vw] flex flex-col items-center justify-center gap-4 relative z-10">
          <span>Ready to take <span className="text-purple">your</span></span>
          <LayoutTextFlip
            text=""
            words={["digital presence", "business goals", "tech stack", "user experience"]}
            className="text-4xl md:text-5xl font-bold px-2 text-purple"
          />
          <span>to the next level?</span>
        </h1>
        <p className="text-white-200 mt-6 md:mt-10 mb-8 max-w-xl text-center relative z-10">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <a href="https://topmate.io/tusharbhardwaj" target="_blank" rel="noopener noreferrer" className="relative z-10">
          <MagicButton
            title="Book a Call / Message"
            icon={<FaCalendarAlt />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center gap-y-6 px-4 md:px-12">
        <p className="md:text-base text-sm md:font-normal font-light text-center">
          Copyright © 2026 <a href="https://buymeacoffee.com/tusharbhardwaj" target="_blank" rel="noopener noreferrer" className="text-purple font-semibold hover:text-purple/80 transition-colors">Tushar Bhardwaj</a>
        </p>

        <div className="flex items-center justify-center gap-4">
          <p className="md:text-base text-sm md:font-normal font-light">Find me on</p>
          <Link href="https://minianonlink.vercel.app/tusharbhardwaj" target="_blank" rel="noopener noreferrer">
            <button className="px-6 py-2 rounded-full border border-white/20 bg-black-200/50 text-purple font-semibold hover:text-purple/80 hover:bg-white/10 hover:border-white/40 transition-all flex items-center justify-center gap-2 backdrop-blur-sm shadow-md">
              MiniLink
            </button>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
