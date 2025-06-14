import React, { useState, useEffect, useRef } from 'react';
import { useGLTF } from "@react-three/drei";

// Simple preloader hook that only loads model on desktop
const useModelPreloader = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            return window.innerWidth < 768;
        };

        const mobile = checkMobile();
        setIsMobile(mobile);

        // If mobile, skip model preloading entirely
        if (mobile) {
            setIsLoaded(true);
            return;
        }

        // Preload the model only on desktop
        const preloadModel = async () => {
            try {
                await useGLTF.preload("./desktop_pc/scene.gltf");
                setIsLoaded(true);
            } catch (error) {
                console.log("Model preload failed, continuing anyway");
                setIsLoaded(true); // Continue even if preload fails
            }
        };

        preloadModel();
    }, []);

    return { isLoaded, isMobile };
};

const Loader = ({ onLoadComplete }) => {
    const [progress, setProgress] = useState(0);
    const { isLoaded: modelLoaded, isMobile } = useModelPreloader();
    const loaderRef = useRef(null);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const line3Ref = useRef(null);
    const line1Part1Ref = useRef(null);
    const nowRef = useRef(null);
    const animationStarted = useRef(false);

    useEffect(() => {
        // Prevent multiple animations
        if (animationStarted.current) return;
        animationStarted.current = true;

        const animateElements = () => {
            // Initial setup - hide elements
            const elements = [line1Ref, line2Ref, line3Ref, nowRef];
            elements.forEach(ref => {
                if (ref.current) {
                    ref.current.style.transform = 'translateY(150px)';
                    ref.current.style.transition = 'none';
                }
            });

            if (line1Part1Ref.current) {
                line1Part1Ref.current.style.opacity = '0';
                line1Part1Ref.current.style.transition = 'none';
            }

            // Animate lines coming up with stagger
            const animateUp = (element, delay = 0) => {
                setTimeout(() => {
                    if (element && element.current) {
                        element.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        element.current.style.transform = 'translateY(0px)';
                    }
                }, delay);
            };

            // Start animations with delays
            setTimeout(() => {
                animateUp(line1Ref, 0);
                animateUp(line2Ref, 250);
                animateUp(line3Ref, 500);
                animateUp(nowRef, 850);

                // Show progress counter
                setTimeout(() => {
                    if (line1Part1Ref.current) {
                        line1Part1Ref.current.style.transition = 'opacity 0.3s ease';
                        line1Part1Ref.current.style.opacity = '1';
                    }

                    // Start progress counter - faster on mobile
                    let currentProgress = 0;
                    const progressSpeed = isMobile ? 50 : 30; // Faster loading on mobile
                    const progressInterval = setInterval(() => {
                        if (currentProgress < 100) {
                            currentProgress += 1;
                            setProgress(currentProgress);
                        } else {
                            clearInterval(progressInterval);
                        }
                    }, progressSpeed);

                }, 500);
            }, 500);

            // Complete loading - shorter time for mobile
            const loadingTime = isMobile ? 2500 : 4000; // Faster for mobile
            setTimeout(() => {
                if (loaderRef.current) {
                    loaderRef.current.style.transition = 'opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    loaderRef.current.style.opacity = '0';

                    setTimeout(() => {
                        onLoadComplete && onLoadComplete();
                    }, 200);
                }
            }, loadingTime);
        };

        // Start animation immediately
        animateElements();
    }, [isMobile]); // Include isMobile in dependencies

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-50 flex flex-col justify-center items-start pl-4 sm:pl-8 md:pl-16 lg:pl-20 font-sans"
            style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                height: '100vh',
                width: '100vw',
                minHeight: '100vh'
            }}
        >
            {/* Animated background elements - simplified for mobile */}
            <div className="absolute inset-0 opacity-10">
                <div className={`absolute top-1/4 left-1/4 ${isMobile ? 'w-48 h-48' : 'w-96 h-96'} bg-blue-500 rounded-full blur-3xl animate-pulse`}></div>
                <div className={`absolute bottom-1/4 right-1/4 ${isMobile ? 'w-32 h-32' : 'w-64 h-64'} bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000`}></div>
            </div>

            {/* Line 1 */}
            <div className="flex items-end mb-2 md:mb-4 lg:mb-6 relative z-10">
                <div
                    ref={line1Part1Ref}
                    className="flex items-end mr-4 sm:mr-8 md:mr-12 lg:mr-16 opacity-0"
                >
                    <h5 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mr-2 sm:mr-3 tracking-wider">
                        {progress.toString().padStart(2, '0')}
                    </h5>
                    <h6 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-400">- 100</h6>
                </div>
                <h1
                    ref={line1Ref}
                    className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-white leading-tight tracking-tight"
                    style={{ fontWeight: 900 }}
                >
                    Your
                </h1>
            </div>

            {/* Line 2 */}
            <div className="mb-2 md:mb-4 lg:mb-6 relative z-10">
                <h1
                    ref={line2Ref}
                    className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-white leading-tight tracking-tight"
                    style={{ fontWeight: 900 }}
                >
                    web <span className="text-blue-400">Experiences</span>
                </h1>
            </div>

            {/* Line 3 */}
            <div className="flex items-end flex-wrap relative z-10">
                <div className="mr-2 sm:mr-3 md:mr-6">
                    <h1
                        ref={line3Ref}
                        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-white leading-tight tracking-tight"
                        style={{ fontWeight: 900 }}
                    >
                        is loading right
                    </h1>
                </div>
                <div>
                    <h2
                        ref={nowRef}
                        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 italic leading-tight tracking-tight animate-pulse"
                        style={{
                            fontWeight: 900,
                            fontStyle: 'italic',
                            backgroundImage: 'linear-gradient(45deg, #60a5fa, #a855f7, #ec4899)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Now
                    </h2>
                </div>
            </div>

            {/* Loading bar at bottom */}
            <div className="absolute bottom-4 sm:bottom-8 left-4 right-4 sm:left-8 sm:right-8 md:left-16 md:right-16 lg:left-20 lg:right-20">
                <div className="w-full h-0.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-100 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs md:text-sm text-gray-500">
                    <span>{isMobile ? 'Optimizing for mobile...' : 'Loading your experience...'}</span>
                    <span>{progress}%</span>
                </div>
            </div>
        </div>
    );
};

export default Loader;