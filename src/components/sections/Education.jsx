import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { educationData } from '../../data/portfolio';

const Education = () => {
    const { language } = useLanguage();
    const education = educationData[language];

    return (
        <section id="education" className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 border-l-4 border-orange-500 pl-8 text-left"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-gray-900 dark:text-white">
                            {language === 'fr' ? 'Formation' : 'Education'}
                        </h2>
                        <p className="text-xl text-gray-500 dark:text-gray-400 font-light">
                            {language === 'fr' 
                                ? "Les fondations académiques de mon expertise en ingénierie logicielle."
                                : "The academic foundations of my software engineering expertise."}
                        </p>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-2">
                    {education.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                        >
                            {/* Card with Glassmorphism Effect */}
                            <div className="relative z-10 bg-gray-50 dark:bg-gray-800/40 backdrop-blur-md p-8 rounded-sm border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 bg-orange-500/10 rounded-sm text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                                            <GraduationCap size={24} />
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700/50 px-4 py-2 rounded-sm border border-gray-100 dark:border-gray-600">
                                            <Calendar size={16} className="text-orange-500" />
                                            {item.period}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-orange-500 transition-colors">
                                            {item.degree}
                                        </h3>
                                        <div className="flex items-center gap-2 text-orange-500 font-medium mb-4">
                                            <MapPin size={16} />
                                            {item.school}
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Animated Accent Line */}
                                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-b-sm transition-all duration-500 group-hover:w-full"></div>
                            </div>
                        </motion.div>
                    ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
