import { Environment, Float, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useMemo } from 'react'
import * as THREE from 'three'

const Techicon = ({ model }) => {
    const scene = useGLTF(model.modelPath)

    // Mobile detection
    const isMobile = useMemo(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 768
        }
        return false
    }, [])

    useEffect(() => {
        if (model.name === 'Interactive Developer') {
            scene.scene.traverse((child) => {
                if (child.isMesh && child.name === 'Object_5') {
                    child.material = new THREE.MeshStandardMaterial({ color: 'white' })
                }
            })
        }
    }, [scene, model.name])

    return (
        <Canvas
            gl={{
                antialias: !isMobile,
                alpha: true,
                powerPreference: isMobile ? "low-power" : "high-performance",
                stencil: false,
                depth: true,
                preserveDrawingBuffer: false
            }}
            dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
            performance={{ min: 0.5 }}
        >
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Environment preset='city' resolution={isMobile ? 64 : 256} />
            <OrbitControls enableZoom={false} />
            <Float
                speed={isMobile ? 3 : 5.5}
                rotationIntensity={isMobile ? 0.5 : 1}
                floatIntensity={isMobile ? 0.5 : 0.9}
            >
                <group scale={model.scale} rotation={model.rotation}>
                    <primitive object={scene.scene} />
                </group>
            </Float>
        </Canvas>
    )
}

export default Techicon