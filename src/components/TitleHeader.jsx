import React from 'react'

const TitleHeader = ({ title, sub }) => {
    return (
        <div className='flex flex-col items-center gap-5'>
            <div className="bg-zinc-700 py-2 px-4 rounded-full w-fit text-sm md:text-base text-nowrap text-zinc-50">
                <p>{sub}</p>
            </div>
            <div className="font-semibold md:text-5xl text-3xl text-center text-zinc-50">
                {title}
            </div>
        </div>
    )
}

export default TitleHeader
