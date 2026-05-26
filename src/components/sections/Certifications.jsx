import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { certificationsData } from '../../data/portfolio';
import { useLanguage } from '../../context/LanguageContext';

const Certifications = () => {
    const { language } = useLanguage();
    const certs = certificationsData[language];

    return (
        <section className="py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 border-l-4 border-orange-500 pl-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-gray-900 dark:text-white">
                            Certifications
                        </h2>
                        <p className="text-xl text-gray-500 dark:text-gray-400 font-light">
                            {language === 'fr' 
                                ? "Validation de mes compétences par des institutions technologiques reconnues."
                                : "Validation of my skills by recognized technological institutions."}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                    {certs.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-50 dark:bg-gray-800/50 rounded-sm border border-gray-100 dark:border-gray-700 hover:border-orange-500/50 transition-colors group"
                        >
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-gray-800 rounded-sm flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform shrink-0">
                                <Award className="text-orange-500 w-6 h-6 sm:w-8 sm:h-8" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 truncate sm:whitespace-normal">{cert.title}</h3>
                                <p className="text-orange-500 font-medium text-xs sm:text-sm mb-1">{cert.issuer}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs">{cert.date}</p>
                            </div>
                            <a
                                href={cert.link}
                                className="p-2 text-gray-400 hover:text-orange-500 transition-colors shrink-0"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ExternalLink size={20} />
                            </a>
                        </motion.div>
                    ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certifications;
