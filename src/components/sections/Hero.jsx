import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { heroSlides } from '../../data/portfolio';
import bgImage from '../../assets/images/hero-bg-perfect.png';
import myCV from '../../assets/images/Cv homme professionnel simple bleu blanc.pdf';

const Hero = () => {
    const { language } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden w-full">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={bgImage}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
            </div>

            <div className="container mx-auto relative z-10 pt-24 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image for mobile - shown first */}
                    <div className="lg:hidden flex justify-center order-first mb-8">
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
                            <img
                                src="/Augustin.jpg"
                                alt="Augustin Kolié"
                                className="relative w-full h-full rounded-full shadow-xl object-cover object-top border-4 border-white/10 z-10"
                            />
                        </div>
                    </div>

                    <div className="text-white flex flex-col justify-center items-start text-left">
                        <div className="min-h-[200px] sm:min-h-[280px]"> {/* Adjusted height for mobile */}
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <motion.span
                                        className="inline-block py-1 px-4 rounded-full bg-primary/20 text-primary font-bold tracking-wider uppercase mb-8 border border-primary/20 text-[10px] sm:text-xs"
                                    >
                                        {heroSlides[currentIndex].title[language]}
                                    </motion.span>

                                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                        {heroSlides[currentIndex].subtitle[language]}
                                    </h1>

                                    <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed max-w-lg">
                                        {heroSlides[currentIndex].description[language]}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Static Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
                             <a
                                href={myCV}
                                download="CV-Augustin-Kolie.pdf"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-sm hover:scale-105 active:scale-95 text-center text-sm"
                            >
                                {language === 'fr' ? 'Télécharger CV' : 'Download CV'}
                            </a>
                        </div>
                    </div>

                    {/* Image for Desktop - Only rendered on large screens to prevent mobile overflow */}
                    <div className="relative hidden lg:flex items-center justify-center overflow-visible">
                        <div className="relative w-full max-w-xl aspect-square flex items-center justify-center">
                            {/* Animated Background Blob */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>

                            {/* Central Image */}
                            <img
                                src="/Augustin.jpg"
                                alt="Augustin Kolié"
                                className="relative w-80 h-80 rounded-full shadow-2xl object-cover object-top border-4 border-white/10 z-10"
                            />

                            {/* Orbiting Icons - 100% guaranteed hidden and not impacting layout on small screens */}
                            <div className="absolute inset-0 z-0 pointer-events-none">
                                <motion.div
                                    className="w-full h-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                >
                                    {[
                                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
                                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
                                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
                                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
                                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
                                        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
                                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                                    ].map((icon, index, array) => {
                                        const angle = (index / array.length) * 360;
                                        return (
                                            <motion.div
                                                key={index}
                                                className="absolute left-1/2 top-1/2 w-14 h-14 -ml-7 -mt-7 bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 shadow-lg"
                                                style={{
                                                    transform: `rotate(${angle}deg) translate(220px) rotate(-${angle}deg)`
                                                }}
                                            >
                                                <motion.img
                                                    src={icon}
                                                    alt="Tech Icon"
                                                    className="w-full h-full object-contain"
                                                    animate={{ rotate: -360 }}
                                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                                />
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Controls - Hidden on Mobile */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-primary text-white transition-all backdrop-blur-sm border border-white/10 z-20 group hidden md:flex"
                >
                    <ChevronLeft size={20} className="sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-primary text-white transition-all backdrop-blur-sm border border-white/10 z-20 group hidden md:flex"
                >
                    <ChevronRight size={20} className="sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                </button>

                {/* Bottom Dots */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-500 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
