import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./CanvasLoader.jsx";

const Computers = ({ isMobile }) => {
    const computer = useGLTF("./desktop_pc/scene.gltf");
    return (
        <mesh>
            <hemisphereLight intensity={2} groundColor="black" />
            <pointLight intensity={2} castShadow={true} />
            <spotLight
                position={[-5, 50, 5]}
                angle={0.3} // Wider angle for better spread
                penumbra={0.5} // Softer edges
                intensity={2} // Brighter light
                castShadow
                shadow-mapSize={1024}
            />
            <primitive
                object={computer.scene}
                scale={isMobile ? 0.8 : 0.9}
                position={isMobile ? [0, -2.5, -1.5] : [0, -2.7, -0.7]}
                rotation={[-0.01, -0.7, -0.1]}
            />
        </mesh>
    );
};

const HeroModel = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');

        // Set initial value
        setIsMobile(mediaQuery.matches);

        // Only render 3D model on desktop
        setShouldRender(!mediaQuery.matches);

        // Handler for media query changes
        const handleMediaQueryChange = (e) => {
            setIsMobile(e.matches);
            setShouldRender(!e.matches); // Only render on desktop
        };

        // Add event listener
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        // Cleanup listener on unmount or dependency change
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    // Don't render anything on mobile to save resources
    if (!shouldRender || isMobile) {
        return null;
    }

    const getCameraSettings = () => {
        return {
            position: [20, 3, 5],
            fov: 25
        };
    };

    const cameraSettings = getCameraSettings();

    return (
        <Canvas
            frameloop="demand"
            shadows
            camera={{ position: cameraSettings.position, fov: cameraSettings.fov }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Computers isMobile={false} />
            </Suspense>
            <Preload all />
        </Canvas>
    );
};

export default HeroModel;