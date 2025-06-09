import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import menu from '../assets/menu.svg';
import close from '../assets/close.svg';

const Navbar = () => {
    const navLinks = [
        {
            id: "about",
            title: "About",
        },
        {
            id: "work",
            title: "Work",
        },
        {
            id: "contact",
            title: "Contact",
        },
    ];

    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const cursorRef = useRef(null);
    const linkRefs = useRef([]);

    // Initialize refs array
    useEffect(() => {
        linkRefs.current = linkRefs.current.slice(0, navLinks.length);
    }, [navLinks.length]);

    // Custom cursor tracking
    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursor({ x: e.clientX, y: e.clientY });
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Magnet hover effect handler
    const handleMagnetMove = (e, index) => {
        const link = linkRefs.current[index];
        const span = link?.querySelector('span');
        if (!span || !link) return;

        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (x - centerX) / 1; // Adjust divisor for intensity
        const moveY = (y - centerY) / 1;

        span.style.transform = `translate(${moveX}px, ${moveY}px)`;

        // Change cursor background on hover
        if (cursorRef.current) {
            cursorRef.current.style.backgroundColor = '#fff';
            cursorRef.current.style.transform = 'translate(-50%, -50%) scale(4)';
        }
    };

    const handleMagnetLeave = (index) => {
        const link = linkRefs.current[index];
        const span = link?.querySelector('span');
        if (!span) return;

        span.style.transform = 'translate(0px, 0px)';

        // Reset cursor
        if (cursorRef.current) {
            cursorRef.current.style.backgroundColor = '#f6f6f6';
            cursorRef.current.style.transform = 'translate(-50%, -50%) scale(3)';
        }
    };

    // Add global styles
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            * {
                cursor: none !important;
            }
            body {
                cursor: none !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <>
            {/* Custom Cursor */}
            <div
                ref={cursorRef}
                style={{
                    position: 'fixed',
                    left: cursor.x + 'px',
                    top: cursor.y + 'px',
                    width: '18px',
                    height: '18px',
                    backgroundColor: '#f6f6f6',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'difference',
                    transform: 'translate(-50%, -50%) scale(3)',
                    transition: 'transform 300ms ease, background-color 300ms ease'
                }}
            />

            <nav className="sm:px-16 px-6 w-full flex items-center justify-center py-5 fixed top-0 z-20 bg-primary">
                <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                    <Link
                        to="/"
                        className="flex items-center gap-2"
                        onClick={() => {
                            setActive("");
                            window.scrollTo(0, 0);
                        }}
                    >
                        <img
                            src='https://as1.ftcdn.net/v2/jpg/05/57/21/40/1000_F_557214009_p9dGbATB8ulawXnUgLbXixSTHzD9TZjy.jpg'
                            alt="logo"
                            className="w-12 h-12 object-contain"
                        />
                        <p className="text-white text-[18px] font-bold">
                            Shyam <span className="sm:block hidden">| Developer</span>
                        </p>
                    </Link>

                    {/* Desktop Navigation with Magnet Effect */}
                    <ul className="list-none hidden sm:flex flex-row gap-10">
                        {navLinks.map((link, index) => (
                            <li
                                key={link.id}
                                ref={(el) => linkRefs.current[index] = el}
                                className={`${
                                    active === link.title ? "text-white" : "text-zinc-500"
                                } hover:text-white text-[18px] font-medium relative`}
                                style={{
                                    padding: '1rem 1.5rem',
                                    display: 'inline-block'
                                }}
                                onClick={() => setActive(link.title)}
                                onMouseMove={(e) => handleMagnetMove(e, index)}
                                onMouseLeave={() => handleMagnetLeave(index)}
                            >
                                <a href={`#${link.id}`}>
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            pointerEvents: 'none',
                                            transition: 'transform 300ms cubic-bezier(0.3, 1, 0.7, 1)',
                                            fontFamily: 'inherit',
                                            fontSize: 'inherit',
                                            fontWeight: 'inherit',
                                            color: 'inherit'
                                        }}
                                    >
                                        {link.title}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu */}
                    <div className="sm:hidden flex flex-1 justify-end items-center">
                        <img
                            src={toggle ? close : menu}
                            alt="menu"
                            className="w-[28px] h-[28px] object-contain"
                            onClick={() => setToggle(!toggle)}
                        />
                        <div
                            className={`${
                                !toggle ? "hidden" : "flex"
                            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
                        >
                            <ul className="list-none flex justify-end items-start flex-col gap-4">
                                {navLinks.map((link) => (
                                    <li
                                        key={link.id}
                                        className={`${
                                            active === link.title ? "text-white" : "text-zinc-500"
                                        } hover:text-white font-poppins text-[16px] font-medium`}
                                        onClick={() => {
                                            setToggle(!toggle);
                                            setActive(link.title);
                                        }}
                                    >
                                        <a href={`#${link.id}`}>{link.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;