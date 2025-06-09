import React from 'react'
import gsap from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import TitleHeader from "./TitleHeader.jsx";
import GlowCard from "./GlowCard.jsx";
gsap.registerPlugin(ScrollTrigger)


const ExperienceSection = () => {
    const expCards = [
        {
            review: "• HTML, CSS, and JavaScript" +
                "• Modern Frameworks and Libraries" +
                "• Responsive and Mobile-First Design" +
                "• Performance Optimization",
            imgPath: "/images/exp1.png",
            logoPath: "/images/vie.jpeg",
            title: "Frontend Developer",
            date: "",
            responsibilities: [
                "Developed and maintained user-friendly features for the website.",
                "Collaborated closely with UI/UX designers to ensure seamless user experiences.",
                "Optimized web applications for maximum speed and scalability.",
            ],
        },
        {
            review: "• API Development" +
                "• Problem Solving Skills" +
                "• Database Management" +
                "• Authentication and Authorization",
            imgPath: "/images/exp2.png",
            logoPath: "/images/logo2.png",
            title: "Backend Developer",
            date: "",
            responsibilities: [
                "Led the development of Docker's web applications, focusing on scalability.",
                "Worked with backend engineers to integrate APIs seamlessly with the frontend.",
            ],
        },
        {
            review: "• DevOps and Deployment" +
                "• Mobile Development" +
                "• Cross-Platform Development" +
                "• AI and Machine Learning Integration",
            imgPath: "/images/exp3.png",
            logoPath: "/images/tail.png",
            title: "Full Stack Developer",
            date: "",
            responsibilities: [
                "Built cross-platform mobile apps using React Native, integrating with Appwrite's backend services.",
                "Improved app performance and user experience through code optimization and testing.",
                "Coordinated with the product team to implement features based on feedback.",
            ],
        },
    ];
    useGSAP(() => {
        // Loop through each timeline card and animate them in
        // as the user scrolls to each card
        gsap.utils.toArray(".timeline-card").forEach((card) => {
            // Animate the card coming in from the left
            // and fade in
            gsap.from(card, {
                // Move the card in from the left
                xPercent: -100,
                // Make the card invisible at the start
                opacity: 0,
                // Set the origin of the animation to the left side of the card
                transformOrigin: "left left",
                // Animate over 1 second
                duration: 1,
                // Use a power2 ease-in-out curve
                ease: "power2.inOut",
                // Trigger the animation when the card is 80% of the way down the screen
                scrollTrigger: {
                    // The card is the trigger element
                    trigger: card,
                    // Trigger the animation when the card is 80% down the screen
                    start: "top 80%",
                },
            });
        });

        // Animate the timeline height as the user scrolls
        // from the top of the timeline to 70% down the screen
        // The timeline height should scale down from 1 to 0
        // as the user scrolls up the screen
        gsap.to(".timeline", {
            // Set the origin of the animation to the bottom of the timeline
            transformOrigin: "bottom bottom",
            // Animate the timeline height over 1 second
            ease: "power1.inOut",
            // Trigger the animation when the timeline is at the top of the screen
            // and end it when the timeline is at 70% down the screen
            scrollTrigger: {
                trigger: ".timeline",
                start: "top center",
                end: "70% center",
                // Update the animation as the user scrolls
                onUpdate: (self) => {
                    // Scale the timeline height as the user scrolls
                    // from 1 to 0 as the user scrolls up the screen
                    gsap.to(".timeline", {
                        scaleY: 1 - self.progress,
                    });
                },
            },
        });

        // Loop through each expText element and animate them in
        // as the user scrolls to each text element
        gsap.utils.toArray(".expText").forEach((text) => {
            // Animate the text opacity from 0 to 1
            // and move it from the left to its final position
            // over 1 second with a power2 ease-in-out curve
            gsap.from(text, {
                // Set the opacity of the text to 0
                opacity: 0,
                // Move the text from the left to its final position
                // (xPercent: 0 means the text is at its final position)
                xPercent: 0,
                // Animate over 1 second
                duration: 1,
                // Use a power2 ease-in-out curve
                ease: "power2.inOut",
                // Trigger the animation when the text is 60% down the screen
                scrollTrigger: {
                    // The text is the trigger element
                    trigger: text,
                    // Trigger the animation when the text is 60% down the screen
                    start: "top 60%",
                },
            });
        }, "<"); // position parameter - insert at the start of the animation
    }, []);

    return (
        <section id='about' className='w-full md:40 mt-20 section-padding xl:px-0'>
            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader title="Professional word Experience" sub="My Career Overwiew" />
                <div className="mt-32 relative">
                    <div className="relative z-50 xl:space-y-32 space-y-10">
                        {expCards.map((card,index)=>(
                            <div key={card.title} className="exp-card-wrapper flex flex-col-reverse xl:flex-row xl:gap-20 gap-10 justify-between">
                                <div className="xl:w-2/6">
                                    <GlowCard card={card} index={index}>
                                        <div className="">
                                            <img src={card.imgPath} alt={card.title} />
                                        </div>
                                    </GlowCard>
                                </div>
                                <div className="xl:w-4/6">
                                    <div className="flex items-start">
                                        <div className="timeline-wrapper absolute top-0 xl:left-[35.5vw] md:left-10 left-5 h-full flex justify-center">
                                            <div className='timeline absolute z-30 h-[110%] -top-10 w-14 md:w-28 bg-zinc-900' />
                                            <div className='gradient-line w-1 h-full' />
                                        </div>
                                        <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                                            <div className="timeline-logo md:size-20 size-10 flex-none rounded-full flex justify-center items-center md:-translate-y-7 border border-black-50 bg-black-100">
                                                <img className="w-full h-full rounded-full" src={card.logoPath} alt="logo" />
                                            </div>
                                            <div className="">
                                                <h1 className='font-semibold text-3xl text-zinc-50'>{card.title}</h1>
                                                <p className='my-5 text-zinc-50'>{card.date}</p>
                                                <p className='text-[#839cb5] italic'>Responsibilities</p>
                                                <ul className='list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50'>
                                                    {card.responsibilities.map((res)=>(
                                                        <li key={res} className='text-lg text-zinc-50'>{res}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ExperienceSection
