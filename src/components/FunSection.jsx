import {
    ContactShadows,
    Environment,
    Float,
    Html,
    PresentationControls,
    Text,
    useGLTF
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

// Loading component
const LoadingSpinner = () => (
    <Html center>
        <div style={{ color: 'white', fontSize: '18px' }}>Loading...</div>
    </Html>
)

// Device detection
const isMobile = () => {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// Browser detection function
const getBrowserType = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes('chrome') && !userAgent.includes('edg')) {
        return 'chrome';
    } else if (userAgent.includes('firefox')) {
        return 'firefox';
    } else if (userAgent.includes('edg')) {
        return 'edge';
    } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
        return 'safari';
    }
    return 'default';
}

// Browser-specific positions for desktop and mobile
const getBrowserSpecificPosition = (browser, mobile = false) => {
    if (mobile) {
        // Mobile positions - different for each browser
        switch (browser) {
            case 'chrome':
                return [0, 1.75, -1.4];
            case 'firefox':
                return [0, 1.55, -1.4];
            case 'edge':
                return [0, 1.63, -1.4];
            case 'safari':
                return [0, 1.60, -1.4];
            default:
                return [0, 1.58, -1.4];
        }
    } else {
        switch (browser) {
            case 'chrome':
                return [0,1.85,-1.4]; // Original position for Chrome
            case 'firefox':
                return [0, 1.55, -1.4]; // Slightly higher for Firefox
            case 'edge':
                return [0, 1.68, -1.4]; // Slightly lower for Edge
            case 'safari':
                return [0, 1.70, -1.4]; // Custom position for Safari
            default:
                return [0, 1.68, -1.4]; // Default position
        }
    }
}

// Computer model component with proper refs and cloning
const ComputerModel = () => {
    const { scene } = useGLTF('/models/model.gltf')
    const modelRef = useRef()
    const [browserType, setBrowserType] = useState('default')
    const [mobile, setMobile] = useState(false)

    // Clone the scene to prevent disposal issues
    const clonedScene = scene.clone()

    useEffect(() => {
        // Detect browser and device on component mount
        setBrowserType(getBrowserType())
        setMobile(isMobile())

        // Update on resize
        const handleResize = () => {
            setMobile(isMobile())
        }

        window.addEventListener('resize', handleResize)

        if (modelRef.current) {
            // Ensure the model stays visible during interactions
            modelRef.current.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true
                    child.receiveShadow = true
                    // Prevent frustum culling issues
                    child.frustumCulled = false
                }
            })
        }

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const htmlPosition = getBrowserSpecificPosition(browserType, mobile)

    return (
        <group ref={modelRef} position={[0, -1.5, 0]}>
            <primitive object={clonedScene}>
                <Html
                    transform
                    wrapperClass='htmlScreen'
                    distanceFactor={1.16}
                    position={htmlPosition}
                    rotation-x={-0.256}
                >
                    <iframe frameBorder="0" src='https://portfoliosection.vercel.app/' />
                </Html>
            </primitive>
        </group>
    )
}

// Scroll to top button component
const ScrollToTopButton = ({ funSectionRef }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            const isMobileDevice = isMobile()
            setMobile(isMobileDevice)
            return isMobileDevice
        }

        checkMobile() // Initial check

        const handleResize = () => {
            checkMobile()
        }

        const handleScroll = () => {
            if (!checkMobile() || !funSectionRef.current) {
                setIsVisible(false)
                return
            }

            const funSectionRect = funSectionRef.current.getBoundingClientRect()
            // Show button as soon as FunSection comes into view
            const isInFunSection = funSectionRect.top <= window.innerHeight && funSectionRect.bottom >= 0

            setIsVisible(isInFunSection)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleResize)

        // Initial check after a short delay to ensure DOM is ready
        setTimeout(() => {
            handleScroll()
        }, 100)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [funSectionRef])

    const scrollUpFromFunSection = () => {
        // Scroll up by 100vh to leave the FunSection
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
        const targetPosition = currentScrollPosition - window.innerHeight // Move up by 100vh

        window.scrollTo({
            top: Math.max(0, targetPosition), // Ensure we don't scroll above the top of the page
            behavior: 'smooth'
        })
    }

    if (!mobile || !isVisible) return null

    return (
        <button
            onClick={scrollUpFromFunSection}
            style={{
                position: 'fixed',
                top: '10vh',
                right: '10vw',
                zIndex: 1000,
                background: '#ff6900',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease',
                color: 'white',
                fontSize: '20px'
            }}
            onTouchStart={(e) => {
                e.target.style.transform = 'scale(1.1)'
                e.target.style.background = '#e55a00'
            }}
            onTouchEnd={(e) => {
                e.target.style.transform = 'scale(1)'
                e.target.style.background = '#ff6900'
            }}
            onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)'
                e.target.style.background = '#e55a00'
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)'
                e.target.style.background = '#ff6900'
            }}
        >
            ↑
        </button>
    )
}

const FunSection = () => {
    const funSectionRef = useRef()
    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        setMobile(isMobile())

        const handleResize = () => {
            setMobile(isMobile())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <>
            <div
                ref={funSectionRef}
                style={{
                    height: '100vh',
                    width: '100vw',
                    overflow: mobile ? 'auto' : 'hidden' // Enable scrolling for mobile
                }}
            >
                <Canvas
                    camera={{
                        fov: mobile ? 60 : 45, // Wider FOV for mobile
                        near: 0.1,
                        far: 2000,
                        position: mobile ? [-2.5, 1.2, 3.5] : [-3, 1.5, 4] // Closer position for mobile
                    }}
                    style={{
                        touchAction: mobile ? 'auto' : 'none', // Enable touch actions for mobile
                    }}
                    gl={{
                        antialias: true,
                        alpha: false,
                        preserveDrawingBuffer: true,
                        powerPreference: "high-performance"
                    }}
                    dpr={[1, 2]}
                    shadows
                >
                    <color args={['#212020']} attach="background" />
                    <Environment preset='city' />

                    {/* Add ambient light to prevent model from going dark */}
                    <ambientLight intensity={0.2} />

                    <Suspense fallback={<LoadingSpinner />}>
                        <PresentationControls
                            global
                            snap={false}
                            speed={0.5}
                            rotation={[0.13, 0.1, 0]}
                            polar={[-0.4, 0.2]}
                            azimuth={[-1, 0.75]}
                            config={{ mass: 2, tension: 200 }}
                            enableZoom={mobile} // Enable zoom only for mobile
                            enablePan={mobile} // Enable pan for mobile
                            enableRotate={true} // Keep rotation enabled for both
                            zoomSpeed={0.5}
                            panSpeed={0.5}
                            rotateSpeed={0.5}
                        >
                            <Float
                                floatIntensity={mobile ? 0.2 : 0.4} // Reduced float intensity for mobile
                            >
                                <rectAreaLight
                                    width={2.5}
                                    height={1.65}
                                    intensity={65}
                                    color={'#ff6900'}
                                    rotation={[-0.1, Math.PI, 0]}
                                    position={[0, 0.55, -1.15]}
                                />

                                <ComputerModel />

                                <Text
                                    font='./bangers-v20-latin-regular.woff'
                                    fontSize={mobile ? 0.8 : 1} // Smaller text for mobile
                                    position={mobile ? [1.5, 0.5, 0.5] : [2, 0.75, 0.75]} // Adjusted position for mobile
                                    rotation-y={-1.25}
                                    maxWidth={2}
                                    textAlign='center'
                                    letterSpacing={0.05}
                                    color="white"
                                    anchorX="center"
                                    anchorY="middle"
                                >
                                    SHYAM GUPTA
                                </Text>
                            </Float>
                        </PresentationControls>
                    </Suspense>

                    {/* Contact shadows - lighter for mobile */}
                    <ContactShadows
                        position-y={-1.4}
                        opacity={mobile ? 0.2 : 0.4}
                        scale={5}
                        blur={2.8}
                    />
                </Canvas>
            </div>

            {/* Scroll to top button - only visible on mobile when in FunSection */}
            <ScrollToTopButton funSectionRef={funSectionRef} />
        </>
    )
}

// Preload the model
useGLTF.preload('/models/model.gltf')

export default FunSection