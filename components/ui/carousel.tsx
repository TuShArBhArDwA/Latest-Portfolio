"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";

interface SlideData {
    title: string;
    button: string;
    src: string;
}

interface CarouselProps {
    slides: SlideData[];
    initialScroll?: number;
}

export default function Carousel({ slides, initialScroll = 0 }: CarouselProps) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
        checkScrollability();
    }, []);

    const checkScrollability = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
        <div className="relative w-full">
            <div
                className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
                ref={carouselRef}
                onScroll={checkScrollability}
            >
                <div className="absolute right-0  z-[1000] h-auto  w-[5%] overflow-hidden bg-gradient-to-l from-white dark:from-black-100"></div>

                <div className="flex flex-row justify-start gap-4 pl-4 max-w-7xl mx-auto">
                    {slides.map((slide, index) => (
                        <div
                            key={"slide-" + index}
                            className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
                        >
                            <Card slide={slide} index={index} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-end gap-2 mr-10">
                <button
                    className="relative z-40 h-10 w-10 rounded-full bg-gray-100 text-black dark:text-white dark:bg-neutral-800 flex items-center justify-center disabled:opacity-50"
                    onClick={scrollLeft}
                    disabled={!canScrollLeft}
                >
                    <IconArrowNarrowRight className="h-6 w-6 rotate-180 text-gray-500 text-black dark:text-white" />
                </button>
                <button
                    className="relative z-40 h-10 w-10 rounded-full bg-gray-100 text-black dark:bg-neutral-800 dark:text-white flex items-center justify-center disabled:opacity-50"
                    onClick={scrollRight}
                    disabled={!canScrollRight}
                >
                    <IconArrowNarrowRight className="h-6 w-6 text-gray-500 text-black dark:text-white" />
                </button>
            </div>
        </div>
    );
}

export const Card = ({
    slide,
    index,
}: {
    slide: SlideData;
    index: number;
}) => {
    return (
        <div
            key={index}
            className="group relative h-80 w-56 overflow-hidden rounded-3xl bg-gray-100 dark:bg-neutral-900 md:h-[30rem] md:w-80 border border-white/10"
        >
            <div
                className="absolute inset-0 z-10 transition duration-300 group-hover:z-20 group-hover:opacity-100"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6) 100%)",
                }}
            ></div>
            <div className="absolute inset-0 z-0 transition duration-300 group-hover:scale-110">
                <img
                    src={slide.src}
                    alt={slide.title}
                    className="h-full w-full object-cover rounded-3xl"
                />
            </div>
            <div className="absolute bottom-0 z-20 p-4 transition duration-300 group-hover:-translate-y-2">
                <span className="inline-block rounded-full border border-gray-500 bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md">
                    {slide.button}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                    {slide.title}
                </h3>
            </div>
        </div>
    );
};
