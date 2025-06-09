import React from 'react'
import CountUp from "react-countup";
import {useInView} from "react-intersection-observer";

function AnimatedCounter() {
    const counterItems = [
        { value: 15, suffix: "+", label: "Projects Completed" },
        { value: 100, suffix: "+", label: "UI/UX Designs" },
        { value: 108, suffix: "+", label: "Reviews" },
        { value: 99, suffix: "%", label: "Satisfaction Rate" },
    ];
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5, // Start animation when 50% of the element is in view
    });
    return (
        <div id="counter" ref={ref} className="px-5 md:px-20 xl:mt-0 mt-32">
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
                {counterItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-zinc-800 rounded-lg p-10 flex flex-col justify-center"
                    >
                        <div className="counter-number text-zinc-50 text-5xl font-bold mb-2">
                            {/*0 {item.suffix}*/}
                            {inView && <CountUp suffix={item.suffix} end={item.value} />}
                        </div>
                        <div className="text-zinc-50 text-lg">{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AnimatedCounter
