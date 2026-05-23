import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { testimonialsData } from '../../data/portfolio';
import bgImage from '../../assets/images/testimonials-bg.png';

const Testimonials = () => {
    const { language } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="testimonials" className="relative py-24 overflow-hidden text-white">
            {/* Background Image - Sharp/Clear as requested */}
            <div className="absolute inset-0 z-0">
                <img
                    src={bgImage}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                {/* Minimal overlay for text readability without heavy blur */}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="container mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        {language === 'fr' ? 'Témoignages' : 'Testimonials'}
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="max-w-4xl mx-auto relative">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/10 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-white/10"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
                                    <Quote size={32} className="text-white" />
                                </div>
                                <p className="text-xl md:text-2xl font-medium italic mb-8 leading-relaxed text-gray-100">
                                    "{testimonialsData[currentIndex].content[language]}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={testimonialsData[currentIndex].image}
                                        alt={testimonialsData[currentIndex].name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                                    />
                                    <div className="text-left">
                                        <h4 className="font-bold text-lg">{testimonialsData[currentIndex].name}</h4>
                                        <p className="text-gray-400 text-sm">{testimonialsData[currentIndex].role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-primary transition-colors backdrop-blur-sm border border-white/10"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-primary transition-colors backdrop-blur-sm border border-white/10"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonialsData.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary w-6' : 'bg-gray-500 hover:bg-gray-400'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
