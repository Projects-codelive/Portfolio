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
import { Suspense, useRef, useEffect } from 'react'
import * as THREE from 'three'

// Loading component
const LoadingSpinner = () => (
    <Html center>
        <div style={{ color: 'white', fontSize: '18px' }}>Loading...</div>
    </Html>
)

// Computer model component with proper refs and cloning
const ComputerModel = () => {
    const { scene } = useGLTF('/models/model.gltf')
    const modelRef = useRef()

    // Clone the scene to prevent disposal issues
    const clonedScene = scene.clone()

    useEffect(() => {
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
    }, [])

    return (
        <group ref={modelRef} position={[0, -1.5, 0]}>
            <primitive object={clonedScene}
            >
                <Html transform wrapperClass='htmlScreen' distanceFactor={1.17} position={[0,1.68,-1.4]} rotation-x={-0.256}>
                    <iframe src='https://project-demos-two.vercel.app/' />
                </Html>
            </primitive>
        </group>
    )
}

const FunSection = () => {
    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <Canvas
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 2000,
                    position: [-3, 1.5, 4]
                }}
                style={{
                    touchAction: 'none',
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
                    >
                        <Float
                            floatIntensity={0.4}
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
                                fontSize={1}
                                position={[2, 0.75, 0.75]}
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

                {/*<ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.8} />*/}
            </Canvas>
        </div>
    )
}

// Preload the model
useGLTF.preload('/models/model.gltf')

export default FunSection