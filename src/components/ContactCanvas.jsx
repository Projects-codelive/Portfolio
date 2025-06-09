import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";

const Fox = () => {
    const { scene } = useGLTF('/models/fox.glb');

    // Clone the scene to avoid issues with multiple instances
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    return (
        <Float
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.8}
            floatDelay={0.5}
        >
            <primitive
                object={clonedScene}
                scale={0.9}
                position={[0, 0.5, 0]}
                rotation={[0, -Math.PI / 6, 0]}
            />
        </Float>
    );
};

const ContactCanvas = () => {
    return (
        <Canvas
            camera={{
                position: [15, 2, 8],
                fov: 30,
                near: 0.1,
                far: 100
            }}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            }}
            shadows
        >
            {/* Optimized Lighting Setup */}
            <ambientLight intensity={0.4} color="#ffffff" />
            <directionalLight
                position={[10, 10, 5]}
                intensity={1.2}
                color="#ffffff"
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />
            <pointLight
                position={[-5, 5, 5]}
                intensity={0.6}
                color="#4f46e5"
                distance={20}
                decay={2}
            />
            <spotLight
                position={[0, 10, 0]}
                angle={0.3}
                penumbra={0.5}
                intensity={0.8}
                color="#fbbf24"
                castShadow
            />

            {/* Environment with optimized settings */}
            <Environment
                preset="city"
                background={false}
                blur={0.8}
            />

            {/* Restricted OrbitControls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableDamping={true}
                dampingFactor={0.05}
                autoRotate={false}
                autoRotateSpeed={0.5}
                minAzimuthAngle={Math.PI / 3} // -60 degrees
                maxAzimuthAngle={-Math.PI / 3}  // 60 degrees
                minPolarAngle={Math.PI / 2.5}  // Restrict vertical movement
                maxPolarAngle={Math.PI / 1.8}  // Restrict vertical movement
                rotateSpeed={0.8}
                target={[0, 0, 0]}
            />

            {/* Model with Suspense for loading */}
            <Suspense fallback={null}>
                <Fox />
            </Suspense>
        </Canvas>
    );
};

// Preload the model for better performance
useGLTF.preload('/models/fox.glb');

export default ContactCanvas;