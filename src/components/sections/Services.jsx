import React from 'react';
import { motion } from 'framer-motion';
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

    return (
        <section id="services" className="py-24 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                        {language === 'fr' ? 'Mes Services' : 'My Services'}
                    </h2>
                    <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full mb-8"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {services.map((service, index) => {
                        const IconComponent = icons[service.icon];
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700"
                            >
                                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                                    {IconComponent && <IconComponent size={24} />}
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">{service.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
