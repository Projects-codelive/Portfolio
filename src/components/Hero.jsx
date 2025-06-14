import { motion } from 'framer-motion'
import { useState, useEffect } from "react";
import Button from "./Button.jsx";
import HeroModel from "./HeroModel.jsx";
import AnimatedCounter from "./AnimatedCounter.jsx";
import React from "react";

// Mobile Hero Background Component - Pure CSS alternative to 3D model

// Arrow components for navigation

const Hero = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isInTextSection, setIsInTextSection] = useState(true);
    const [isInBackgroundSection, setIsInBackgroundSection] = useState(false);

    // Check if mobile and handle resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle scroll events for mobile navigation
    useEffect(() => {
        if (!isMobile) return;

        const handleScroll = () => {
            const textSection = document.querySelector('.text-section');
            const backgroundSection = document.querySelector('.background-section');

            if (textSection && backgroundSection) {
                const textRect = textSection.getBoundingClientRect();
                const backgroundRect = backgroundSection.getBoundingClientRect();

                // Check if text section is in viewport (show down arrow)
                const isTextVisible = textRect.top < window.innerHeight && textRect.bottom > 0;
                // Check if background section is in viewport (show up arrow)
                const isBackgroundVisible = backgroundRect.top < window.innerHeight && backgroundRect.bottom > 0;

                setIsInTextSection(isTextVisible && !isBackgroundVisible);
                setIsInBackgroundSection(isBackgroundVisible && !isTextVisible);
            }
        };

        handleScroll(); // Check initial state
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    // Navigation handlers for mobile
    const handleScrollUp = () => {
        if (!isMobile) return;
        const textSection = document.querySelector('.text-section');
        if (textSection) {
            textSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const handleScrollDown = () => {
        if (!isMobile) return;
        const backgroundSection = document.querySelector('.background-section');
        if (backgroundSection) {
            backgroundSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <>
            {/* Navigation Arrows - Mobile Only */}
            {/*{isMobile && (*/}
            {/*    <>*/}
            {/*        /!* Show Up arrow when in background section *!/*/}
            {/*        {isInBackgroundSection && (*/}
            {/*            <ScrollArrow*/}
            {/*                direction="up"*/}
            {/*                onClick={handleScrollUp}*/}
            {/*                isVisible={true}*/}
            {/*            />*/}
            {/*        )}*/}
            {/*        /!* Show Down arrow when in text section *!/*/}
            {/*        {isInTextSection && (*/}
            {/*            <ScrollArrow*/}
            {/*                direction="down"*/}
            {/*                onClick={handleScrollDown}*/}
            {/*                isVisible={true}*/}
            {/*            />*/}
            {/*        )}*/}
            {/*    </>*/}
            {/*)}*/}

            {/* Hero Section */}
            <section className='hero-section relative w-full min-h-screen mx-auto overflow-hidden'>
                {/* Mobile Layout */}
                <div className="block md:hidden">
                    {/* Text Content - Mobile */}
                    <div className="text-section px-4 pt-20 pb-8 min-h-screen flex flex-col justify-center relative">
                        {/* Background for text section */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#151030] to-[#0a0a0a]"></div>

                        <div className="flex flex-row items-start gap-5 relative z-10">
                            <div className="flex flex-col justify-center items-center mt-5">
                                <div className='w-5 h-5 rounded-full bg-[#915eff]' />
                                <div className="w-1 h-20 violet-gradient" />
                            </div>
                            <div className="hero-text flex-1">
                                <motion.h1
                                    initial={{ x: 150, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                    className="text-white font-black text-[28px] xs:text-[32px]"
                                >
                                    Hi, I'm <span className='text-[#915eef]'>Shyam</span>
                                </motion.h1>
                                <motion.h1
                                    initial={{ x: 150, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                                    className="text-[#dfd9ff] font-medium text-[16px] xs:text-[18px] leading-[24px] mt-2"
                                >
                                    I develop 3D Visual, user Interfaces and Applications.
                                </motion.h1>
                                <motion.h1
                                    initial={{ x: 150, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
                                    className="text-[#dfd9ff] text-sm xs:text-base leading-[22px] mt-2"
                                >
                                    That Deliver Results
                                </motion.h1>
                                <motion.h1
                                    initial={{ x: 150, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
                                    className="text-[#dfd9ff] text-sm xs:text-base leading-[22px] mt-1"
                                >
                                    Into Real Projects
                                </motion.h1>
                                <motion.div
                                    initial={{ x: 150, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
                                    className="gsap-btn mt-4"
                                >
                                    <Button id="counter" />
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Background Section - Mobile (replaces 3D model) */}
                    {/*<div className="background-section relative w-full h-screen">*/}
                    {/*    <MobileHeroBackground />*/}

                    {/*    /!* Content overlay *!/*/}
                    {/*    <div className="absolute inset-0 flex flex-col justify-center items-center px-4 z-10">*/}
                    {/*        <motion.div*/}
                    {/*            initial={{ opacity: 0, y: 50 }}*/}
                    {/*            whileInView={{ opacity: 1, y: 0 }}*/}
                    {/*            transition={{ duration: 1, ease: "easeOut" }}*/}
                    {/*            className="text-center"*/}
                    {/*        >*/}
                    {/*            <h2 className="text-2xl font-bold text-white mb-4">*/}
                    {/*                Creating Digital Experiences*/}
                    {/*            </h2>*/}
                    {/*            <p className="text-[#dfd9ff] text-sm max-w-sm mx-auto leading-relaxed">*/}
                    {/*                Transforming ideas into interactive digital solutions with modern technologies and innovative design approaches.*/}
                    {/*            </p>*/}
                    {/*        </motion.div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                {/* Desktop Layout - 3D Model Enabled */}
                <div className="hidden md:block relative w-full h-screen">
                    <div className={`sm:px-16 absolute top-[18vh] w-[40vw] mx-auto flex flex-row items-start gap-5`}>
                        <div className="flex flex-col justify-center items-center mt-5">
                            <div className='w-5 h-5 rounded-full bg-[#915eff]' />
                            <div className="w-1 sm:h-80 h-40 violet-gradient" />
                        </div>
                        <div className="hero-text">
                            <motion.h1
                                initial={{ x: 150, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                                className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]"
                            >
                                Hi, I'm <span className='text-[#915eef]'>Shyam</span>
                            </motion.h1>
                            <motion.h1
                                initial={{ x: 150, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                                className="text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2 text-white-100"
                            >
                                I develop 3D Visual, user <br className='sm:block hidden' /> Interfaces and Applications.
                            </motion.h1>
                            <motion.h1
                                initial={{ x: 150, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
                                className="text-[#dfd9ff] text-xs lg:text-lg sm:text-[26px] xs:text-[20px] lg:leading-[40px] mt-2"
                            >
                                That Deliver Results
                            </motion.h1>
                            <motion.h1
                                initial={{ x: 150, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
                                className="text-[#dfd9ff] text-xs lg:text-lg sm:text-[26px] xs:text-[20px] lg:leading-[40px] mt-1"
                            >
                                Into Real Projects
                            </motion.h1>
                            <motion.div
                                initial={{ x: 150, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
                                className="gsap-btn mt-4"
                            >
                                <Button id="counter" />
                            </motion.div>
                        </div>
                    </div>

                    {/* 3D Model - Desktop Only */}
                    <figure>
                        <div className="xl:w-[80%] w-full h-[90vh] absolute xl:top-5 top-14 xl:-right-20 right-0">
                            <HeroModel />
                        </div>
                    </figure>
                </div>

                {/* Scroll indicator for mobile */}
                {isMobile && isInTextSection && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
                        <div className="w-6 h-10 border-2 border-[#915eff] rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-[#915eff] rounded-full mt-2 animate-pulse"></div>
                        </div>
                    </div>
                )}
            </section>
        </>
    )
}

export default Hero