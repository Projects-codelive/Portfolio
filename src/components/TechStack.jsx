import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Suspense, useMemo, useState, useEffect } from "react";

import TitleHeader from "./TitleHeader.jsx";
import Techicon from "./Techicon.jsx";

// Simple loading placeholder
const ModelPlaceholder = ({ name }) => (
    <div className="flex justify-center items-center w-52 h-60 relative bg-black-200 rounded-lg">
        <div className="text-zinc-400 text-sm text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-400 mx-auto mb-2"></div>
            Loading...
        </div>
    </div>
)

const TechStack = () => {
    const [isMobile, setIsMobile] = useState(false)

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const techStackIcons = useMemo(() => [
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
    ], [])

    // GSAP animation
    useGSAP(() => {
        gsap.fromTo(
            ".tech-card",
            {
                y: 50,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.inOut",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: "#skills",
                    start: "top center",
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
                    {techStackIcons.map((techStackIcon) => (
                        <div
                            key={techStackIcon.name}
                            className="card-border border border-black-50 bg-black-100 tech-card overflow-hidden group xl:rounded-full rounded-lg"
                        >
                            <div className="absolute left-0 bottom-[-100%] w-full h-full bg-[#2D3240] group-hover:bottom-0 transition-all duration-700" />
                            <div className="flex flex-col md:justify-center items-center xl:gap-5 xl:h-[50vh] overflow-hidden relative z-10 group-hover:cursor-grab">
                                <div className="flex justify-center items-center w-52 h-60 relative">
                                    <Suspense fallback={<ModelPlaceholder name={techStackIcon.name} />}>
                                        <Techicon model={techStackIcon} />
                                    </Suspense>
                                </div>
                                <div className="px-6 md:px-10 text-zinc-50 text-center w-full">
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