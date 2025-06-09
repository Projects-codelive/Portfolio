import React from 'react'
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import SecondaPage from "./components/SecondaPage.jsx";

const App = () => {
    return (
        <div className="bg-zinc-900">
            <Navbar />
            <Hero />
            <SecondaPage />
        </div>
    )
}
export default App
