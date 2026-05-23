import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Numbers from '../components/sections/Numbers';
import Skills from '../components/sections/Skills';
import Services from '../components/sections/Services';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Education from '../components/sections/Education';
import Certifications from '../components/sections/Certifications';
import Contact from '../components/sections/Contact';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Hero />
            <About />
            <Numbers />
            <Skills />
            <Services />
            <Projects />
            <Experience />
            <Education />
            <Certifications />
            <Contact />
        </div>
    );
};

export default Home;
