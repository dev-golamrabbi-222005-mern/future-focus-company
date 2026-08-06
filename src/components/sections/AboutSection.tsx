'use client';

import * as React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
    const t = useTranslations('HomeAbout');
    const containerRef = React.useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            gsap.fromTo(
                containerRef.current.querySelectorAll('.gsap-fade-up'),
                {
                    opacity: 0,
                    y: 40,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                    },
                }
            );
        },
        { scope: containerRef }
    );

    const features = [
        t('feature1'),
        t('feature2'),
        t('feature3'),
        t('feature4'),
        t('feature5'),
        t('feature6'),
    ];

    return (
        <section
            ref={containerRef}
            className="w-full max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20"
        >
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center pt-8 lg:pt-0">
                {/* IMAGE */}

                <div className="relative gsap-fade-up mb-10 lg:mb-0">

                    <div className="absolute top-8 -right-6 w-full h-full rounded-xl border-2 border-primary/30 hidden lg:block" />

                    <Image
                        src="/images/about/about-home.jpg"
                        alt="About"
                        width={700}
                        height={900}
                        className="relative rounded-xl object-cover shadow-xl w-full h-auto"
                    />

                    {/* Experience */}

                    <div className="absolute -bottom-8 right-2 sm:right-0">

                        <div className="w-24 h-24 sm:w-32 sm:h-32 p-2 rounded-full bg-primary text-primary-foreground border-[5px] sm:border-[6px] border-background shadow-xl flex flex-col justify-center items-center">

                            <h2 className="text-2xl sm:text-4xl font-black">15+</h2>

                            <p className="text-[9px] sm:text-xs uppercase tracking-widest text-center">
                                {t('experience')}
                            </p>

                        </div>

                    </div>

                </div>

                {/* CONTENT */}

                <div className="space-y-4">

                    <div className="gsap-fade-up">

                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">

                            <span className="w-2 h-2 rounded-full bg-primary" />

                            {t('tag')}

                        </span>

                    </div>

                    <div className="gsap-fade-up">

                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4 leading-snug">
                            {t('title')}
                        </h2>

                    </div>

                    <div className="gsap-fade-up w-20 h-[2px] bg-primary rounded-full" />

                    <div className="gsap-fade-up">

                        <p className="text-muted-foreground leading-8">
                            {t('description1')}
                        </p>

                    </div>

                    <div className="gsap-fade-up">

                        <p className="text-muted-foreground leading-8">
                            {t('description2')}
                        </p>

                    </div>

                    {/* FEATURES */}

                    <div className="grid sm:grid-cols-2 gap-y-5 gap-x-10 pt-3">

                        {features.map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-3"
                            >
                                <CheckCircle2
                                    className="text-primary shrink-0"
                                    size={22}
                                />

                                <span className="text-foreground font-medium">
                                    {item}
                                </span>

                            </div>
                        ))}

                    </div>

                    {/* BUTTON */}

                    <div className="gsap-fade-up pt-5">

                        <button className="inline-flex items-center rounded-xl bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:opacity-90 hover:scale-[1.02]">

                            {t('button')}

                        </button>

                    </div>

                </div>

            </div>
        </section>
    );
}