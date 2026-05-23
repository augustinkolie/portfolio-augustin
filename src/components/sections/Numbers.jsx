import React from 'react';
import { motion } from 'framer-motion';
import { statsData } from '../../data/portfolio';
import { useLanguage } from '../../context/LanguageContext';
import { Star } from 'lucide-react';

const Numbers = () => {
    const { language } = useLanguage();

    return (
        <section className="py-12 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                    {/* Review Block - Centered on mobile, left on desktop */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left shrink-0">
                        <div className="flex items-center gap-1 mb-2">
                             {[...Array(5)].map((_, i) => (
                                 <Star key={i} size={14} className="fill-red-500 text-red-500" />
                             ))}
                        </div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            {language === 'fr' ? 'AVIS RÉDIGÉ LE' : 'REVIEW WRITTEN ON'}
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tighter italic">Augustin</span>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{language === 'fr' ? '4 AVIS' : '4 REVIEWS'}</span>
                        </div>
                    </div>

                    {/* Stats - Grid on Mobile, Flex justify-around on Desktop */}
                    <div className="w-full lg:flex-1 grid grid-cols-2 lg:flex lg:flex-row lg:items-center lg:justify-around gap-x-4 gap-y-10">
                        {statsData.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center lg:items-start lg:pl-12 lg:border-l border-gray-100 dark:border-gray-800 first:border-0"
                            >
                                <div className="text-center lg:text-left">
                                    <div className="flex items-baseline justify-center lg:justify-start gap-1 whitespace-nowrap">
                                        <span className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                                            {stat.value}
                                        </span>
                                        <span className="text-sm sm:text-base md:text-lg font-bold text-gray-700 dark:text-gray-300">
                                            {stat.unit}
                                        </span>
                                    </div>
                                    <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mt-1">
                                        {stat.label[language]}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Numbers;
