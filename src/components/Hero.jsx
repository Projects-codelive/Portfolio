import { motion } from 'framer-motion'
import {OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import Button from "./Button.jsx";
import HeroModel from "./HeroModel.jsx";
import AnimatedCounter from "./AnimatedCounter.jsx";
import React from "react";

const Hero = () => {
    useGSAP(()=>{
        gsap.fromTo('.hero-text h1', {
            x: 150,
            opacity: 0
        },{
            x: 0,
            opacity: 1,
            stagger: 1,
            duration: 1,
            ease: "power2.inOut"
        })
    })
    return (
        <section className='relative w-full h-[100vh] mx-auto'>
            <div className={`sm:px-16 absolute top-[18vh] w-[40vw] mx-auto flex flex-row items-start gap-5`}>
                <div className="flex flex-col justify-center items-center mt-5">
                    <div className='w-5 h-5 rounded-full bg-[#915eff]' />
                    <div className="w-1 sm:h-80 h-40 violet-gradient" />
                </div>
                <div className="hero-text">
                    <h1 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Hi, I'm <span className='text-[#915eef]'>Shyam</span></h1>
                    <h1 className="text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2 text-white-100">I develop 3D Visual, user <br className='sm:block  hidden' /> Interfaces and Applications.</h1>
                    <h1 className="text-[#dfd9ff] text-xs lg:text-lg sm:text-[26px] xs:text-[20px] lg:leading-[40px] mt-2">That Deliver Results</h1>
                    <h1 className="text-[#dfd9ff] text-xs lg:text-lg sm:text-[26px] xs:text-[20px] lg:leading-[40px] mt-1">Into Real Projects</h1>
                    <div className="gsap-btn mt-4">
                        <Button
                            id="counter"
                        />
                    </div>
                </div>
            </div>
            <figure>
                <div className="xl:w-[80%] w-full h-[90vh] absolute xl:top-5 top-14 xl:-right-20 right-0">
                    <HeroModel />
                </div>
            </figure>
        </section>
    )
}

export default Hero