import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Rocket, Code2, Layers, BarChart3, TrendingUp } from 'lucide-react';
import { servicesData } from '../../data/portfolio';
import { useLanguage } from '../../context/LanguageContext';

const icons = {
    Users,
    Rocket,
    Code2,
    Layers,
    BarChart3,
    TrendingUp
};

const Services = () => {
    const { language } = useLanguage();
    const services = servicesData[language];
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section id="services" className="py-24 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 border-l-4 border-orange-500 pl-8"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-gray-900 dark:text-white">
                        {language === 'fr' ? 'Mes Services' : 'My Services'}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg">
                        {language === 'fr' 
                            ? "Des solutions sur mesure pour répondre à vos besoins digitaux les plus exigeants."
                            : "Tailored solutions to meet your most demanding digital needs."}
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-20 max-w-7xl mx-auto">
                    {/* Left - Navigation List */}
                    <div className="lg:w-1/4 flex flex-col py-8 w-full">
                        <div className="flex flex-col">
                            {services.map((service, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`group flex items-center gap-6 py-6 transition-all duration-300 text-left ${
                                        index !== services.length - 1 ? "border-b border-gray-100 dark:border-white/5" : ""
                                    } ${
                                        activeIndex === index 
                                        ? "translate-x-4" 
                                        : "hover:translate-x-2"
                                    }`}
                                >
                                    <span className={`text-xl font-mono font-bold ${
                                        activeIndex === index ? "text-orange-500" : "text-gray-400"
                                    }`}>
                                        {(index + 1).toString().padStart(2, '0')}.
                                    </span>
                                    <span className={`text-xl font-black uppercase tracking-widest ${
                                        activeIndex === index ? "text-gray-900 dark:text-white" : "text-gray-500"
                                    }`}>
                                        {service.title}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Vertical Divider (Tiret vertical) */}
                    <div className="hidden lg:block w-[2px] bg-gray-200 dark:bg-gray-800 self-stretch my-12"></div>

                    {/* Right - Content (No Card) */}
                    <div className="lg:w-3/4 w-full flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="relative overflow-hidden"
                            >
                                <div className="z-10 relative">
                                    <h3 className="text-4xl md:text-5xl font-black mb-8 text-gray-900 dark:text-white uppercase tracking-tighter leading-none">
                                        {services[activeIndex].title}
                                    </h3>

                                    <div className="space-y-8">
                                        <div className="space-y-6">
                                            <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 leading-tight font-bold max-w-4xl">
                                                {services[activeIndex].description}
                                            </p>
                                            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed font-light max-w-3xl">
                                                {language === 'fr' 
                                                    ? "Nous adoptons une approche méthodique et centrée sur l'excellence pour chaque projet. De la conception initiale à l'implémentation technique finale, notre objectif est de créer une valeur ajoutée durable et une architecture logicielle robuste capable de soutenir votre croissance à long terme."
                                                    : "We adopt a methodical and excellence-centered approach for every project. From initial design to final technical implementation, our goal is to create sustainable added value and a robust software architecture capable of supporting your long-term growth."}
                                            </p>
                                        </div>

                                        <div className="pt-8 border-t border-gray-100 dark:border-white/5">
                                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed italic opacity-80 border-l-4 border-orange-500 pl-8 text-lg">
                                                {language === 'fr' 
                                                    ? "Expertise technique de pointe, optimisation des performances et accompagnement stratégique pour tous vos défis numériques."
                                                    : "Deep technical expertise, performance optimization, and strategic support for all your digital challenges."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
