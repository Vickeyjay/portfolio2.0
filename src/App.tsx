import Navbar from './components/Navbar'
import Hero from './components/Hero'

import './App.css'
import CustomCursor from './components/CustomCursor';
import About from './components/About';
import Marquee from './components/Marquee';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

function App() {
    return (
        <>
            <Preloader />
            <CustomCursor />
            <Navbar />

            <main>
                <Hero />
                <Marquee />
                <About />
                <Skills />
                <Projects />
                <Services />
                <Contact />
                <Footer />
            </main>
        </>
    )
}

export default App
