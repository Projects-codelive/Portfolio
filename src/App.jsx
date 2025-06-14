import React, { useState } from 'react'
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import SecondaPage from "./components/SecondaPage.jsx";
import Loader from "./components/Loader.jsx";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadComplete = () => {
        setIsLoading(false);
    };

    return (
        <div className="relative">
            {isLoading && <Loader onLoadComplete={handleLoadComplete} />}

            {!isLoading && (
                <div className="bg-zinc-900">
                    <Navbar />
                    <Hero />
                    <SecondaPage />
                </div>
            )}
        </div>
    );
};

export default App;