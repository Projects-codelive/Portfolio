import { ContactShadows, Environment, Float, Html, PresentationControls, Text, useGLTF } from '@react-three/drei'

export default function FunSectionModel()
{
    const computer = useGLTF('/models/model.gltf')
    return <>

        {/* <Snowfall count={1000} /> */}

        <Environment preset='city' />

        <color args={ [ '#212020' ] } attach="background" />

        <PresentationControls global rotation={[0.13, 0.1, 0]} polar={[-0.4,0.2]} azimuth={[-1,0.75]} config={ {mass:2, tension:200}} snap={ {mass:6,tension:100}}>
            <Float rotationIntensity={ 0.4 }>
                <rectAreaLight
                    width={2.5}
                    height={1.65}
                    intensity={65}
                    color={ '#ff6900'}
                    rotation={[-0.1,Math.PI,0]}
                    position={[0,0.55,-1.15]}
                />
                <primitive object={ computer.scene }
                           position-y={ -1.3 }
                >
                    <Html transform wrapperClass='htmlScreen' distanceFactor={1.17} position={[0,1.56,-1.4]} rotation-x={-0.256}>
                        <iframe src='https://portfoliosection.vercel.app/' />
                    </Html>
                </primitive>
                <Text
                    // font='./bangers-v20-latin-regular.woff'
                    fontSize={1}
                    position={[2,0.75,0.75]}
                    rotation-y={-1.25}
                    maxWidth={2}
                    textAlign='center'
                    letterSpacing={0.05}
                >SHYAM GUPTA</Text>
            </Float>
        </PresentationControls>

        <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
}