import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TitleHeader from "./TitleHeader.jsx";
import Techicon from "./Techicon.jsx";
// import { techStackImgs } from "../constants";

const TechStack = () => {
    const techStackIcons = [
        {
            name: "React Developer",
            modelPath: "/models/react_logo-transformed.glb",
            scale: 1,
            rotation: [0, 0, 0],
        },
        {
            name: "Java",
            modelPath: "/models/java.glb",
            scale: 0.8,
            rotation: [0, 0, 0],
        },
        {
            name: "Backend Developer",
            modelPath: "/models/node-transformed.glb",
            scale: 5,
            rotation: [0, -Math.PI / 2, 0],
        },
        {
            name: "Interactive Developer",
            modelPath: "/models/three.js-transformed.glb",
            scale: 0.05,
            rotation: [0, 0, 0],
        },
        {
            name: "Project Manager",
            modelPath: "/models/git-svg-transformed.glb",
            scale: 0.05,
            rotation: [0, -Math.PI / 4, 0],
        },
    ];
    // Animate the tech cards in the skills section
    useGSAP(() => {
        // This animation is triggered when the user scrolls to the #skills wrapper
        // The animation starts when the top of the wrapper is at the center of the screen
        // The animation is staggered, meaning each card will animate in sequence
        // The animation ease is set to "power2.inOut", which is a slow-in fast-out ease
        gsap.fromTo(
            ".tech-card",
            {
                // Initial values
                y: 50, // Move the cards down by 50px
                opacity: 0, // Set the opacity to 0
            },
            {
                // Final values
                y: 0, // Move the cards back to the top
                opacity: 1, // Set the opacity to 1
                duration: 1, // Duration of the animation
                ease: "power2.inOut", // Ease of the animation
                stagger: 0.2, // Stagger the animation by 0.2 seconds
                scrollTrigger: {
                    trigger: "#skills", // Trigger the animation when the user scrolls to the #skills wrapper
                    start: "top center", // Start the animation when the top of the wrapper is at the center of the screen
                },
            }
        );
    });

    return (
        <div id="skills" className="flex-center section-padding px-5 md:px-10 md:mt-40 mt-20">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="How I Can Contribute & My Key Skills"
                    sub="🤝 What I Bring to the Table"
                />
                <div className="tech-grid grid xl:grid-cols-5 md:grid-cols-3 grid-cols-1 xl:gap-16 md:gap-10 gap-5 mt-16">
                    {/* Loop through the techStackIcons array and create a component for each item.
              The key is set to the name of the tech stack icon, and the classnames are set to
              card-border, tech-card, overflow-hidden, and group. The xl:rounded-full and rounded-lg
              classes are only applied on larger screens. */}
                    {techStackIcons.map((techStackIcon) => (
                        <div
                            key={techStackIcon.name}
                            className="card-border border border-black-50 bg-black-100 tech-card overflow-hidden group xl:rounded-full rounded-lg"
                        >
                            {/* The tech-card-animated-bg div is used to create a background animation when the
                  component is hovered. */}
                            <div className="absolute left-0 bottom-[-100%] w-full h-full bg-[#2D3240] group-hover:bottom-0 transition-all duration-700" />
                            <div className="flex flex-col md:justify-center items-center xl:gap-5 xl:h-[50vh] overflow-hidden relative z-10 group-hover:cursor-grab">
                                {/* The tech-icon-wrapper div contains the TechIconCardExperience component,
                    which renders the 3D model of the tech stack icon. */}
                                <div className="flex justify-center items-center w-52 h-60 relative">
                                    <Techicon model={techStackIcon} />
                                </div>
                                {/* The padding-x and w-full classes are used to add horizontal padding to the
                    text and make it take up the full width of the component. */}
                                <div className="px-6 md:px-10 text-zinc-50 text-center w-full">
                                    {/* The p tag contains the name of the tech stack icon. */}
                                    <p>{techStackIcon.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TechStack;