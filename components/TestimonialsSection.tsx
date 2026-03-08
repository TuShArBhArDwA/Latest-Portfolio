import React from 'react';
import { TestimonialCard } from './TestimonialCard';
import MagicButton from './ui/MagicButton';
import { FaLocationArrow } from 'react-icons/fa6';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';

const TestimonialsSection = () => {
    const testimonials = [
        {
            id: 1,
            quote: "Tushar consistently builds tools that are simple, practical, and genuinely useful.",
            author: "Developer"
        },
        {
            id: 2,
            quote: "What I appreciate about Tushar is that he focuses on solving real problems instead of overcomplicating things.",
            author: "Founder"
        }
    ];

    return (
        <div className="py-20 w-full" id="testimonials">
            <div className="flex flex-col items-center justify-center mb-12">
                <h1 className="heading text-center text-4xl font-semibold text-gray-900 dark:text-white mb-4">
                    What <span className="text-purple">People Say</span>
                </h1>
                <p className="text-center text-white-200/50 text-sm md:text-base mb-12 max-w-lg mx-auto">
                    I let my community speak for me
                </p>
            </div>

            <div className="flex flex-wrap items-center justify-center p-4 gap-4 md:gap-x-10 md:gap-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
                    {testimonials.map((item) => (
                        <TestimonialCard key={item.id} quote={item.quote} author={item.author} />
                    ))}
                </div>
            </div>

            <div className="mt-16 flex justify-center w-full">
                <Link href="https://minianonvouch.vercel.app/" target="_blank">
                    <MagicButton
                        title="Read more testimonials"
                        icon={<FaExternalLinkAlt />}
                        position="right"
                    />
                </Link>
            </div>
        </div>
    );
};

export default TestimonialsSection;
