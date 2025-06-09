import React, { useRef } from 'react'

const GlowCard = ({ card, children, index }) => {
    const cardRef = useRef(null)

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;

        // Get the mouse position relative to card
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        // Calculate the angle
        let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
        angle = (angle + 360) % 360;

        // Set the CSS custom property for the gradient start position
        card.style.setProperty('--start', angle + 60);
    }

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;

        // Reset the gradient when mouse leaves
        card.style.setProperty('--start', 0);
    }

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className='card timeline-card rounded-xl p-10 relative bg-transparent'
        >
            <div className="flex items-center gap-1 mb-5 relative z-10">
                {Array.from({length: 5}, (_, i) => (
                    <img src="/images/star.png" key={i} alt="star" className='size-5' />
                ))}
            </div>

            <div className="mb-5 relative z-10">
                <p className='text-white text-lg whitespace-pre-line'>
                    {card.review.replace(/•/g, '\n•')}
                </p>
            </div>

            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}

export default GlowCard