import React from 'react'

const Button = () => {
    const handleClick = (e) => {
        e.preventDefault();
        const scrollAmount = window.innerHeight * 0.5;  // About 50vh
        window.scrollBy({
            top: window.scrollY + scrollAmount,
            behavior: 'smooth'
        });
    }
    return (
        <>
            <div onClick={handleClick} className="px-2 py-4 xl:w-[27vw] md:w-[90vw] rounded-lg flex hover:text-white justify-center bg-[#915eff] items-center relative cursor-pointer overflow-hidden group ">
                <div className="absolute -right-10 origin-center bg-zinc-50 top-1/2 -translate-y-1/2 w-[120%] h-[120%] group-hover:size-10 group-hover:right-10 rounded-full transition-all duration-500" />
                <p className="uppercase  md:text-lg  transition-all  duration-500 group-hover:text-white-500 group-hover:-translate-x-5 xl:translate-x-0 -translate-x-5">See My Work</p>
                <div className=" size-10 rounded-full absolute right-10 top-1/2 -translate-y-1/2 flex justify-center items-center overflow-hidden">
                    <img src="/arrow-down.svg" alt="arrow" className="size-5 xl:-translate-y-32 translate-y-0 animate-bounce group-hover:translate-y-0 transition-all duration-500" />
                </div>
            </div>
        </>
    )
}
export default Button
