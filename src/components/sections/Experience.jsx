import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { experienceData } from '../../data/portfolio';

const Experience = () => {
    const { language } = useLanguage();
    const data = experienceData[language];

    return (
        <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-gray-400 font-semibold uppercase tracking-wider text-sm mb-2 block">Parcours</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                        {language === 'fr' ? 'Expérience Professionnelle' : 'Work Experience'}
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="max-w-5xl mx-auto relative px-4 md:px-0">
                    {/* Vertical Line with Gradient */}
                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-orange-500/10 via-orange-500/40 to-orange-500/10"></div>

                    {data.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative flex flex-col md:flex-row items-center justify-between mb-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Card Container */}
                            <div className="w-full md:w-5/12 pl-12 md:pl-0 group">
                                <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 relative overflow-hidden">
                                    {/* Card Glint Effect */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] sm:text-xs font-bold tracking-wide">
                                            <Calendar size={12} />
                                            {item.period}
                                        </span>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-bold mb-1 text-gray-800 dark:text-gray-100 group-hover:text-gray-600 transition-colors">
                                        {item.role}
                                    </h3>
                                    <h4 className="text-base sm:text-lg text-gray-500 dark:text-gray-400 font-medium mb-4 flex items-center gap-2">
                                        <Briefcase size={16} />
                                        {item.company}
                                    </h4>
                                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Center Dot */}
                            <div className="absolute left-2.5 md:left-1/2 transform md:-translate-x-1/2 w-11 h-11 flex items-center justify-center z-10">
                                <div className="w-11 h-11 bg-white dark:bg-gray-900 rounded-full border-4 border-gray-100 dark:border-gray-800 flex items-center justify-center shadow-lg relative">
                                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                                    <div className="absolute inset-0 rounded-full border border-orange-500/20 animate-ping"></div>
                                </div>
                            </div>

                            <div className="w-full md:w-5/12 hidden md:block">
                                {/* Empty side for spacing */}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
