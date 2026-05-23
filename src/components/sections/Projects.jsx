import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { projectsData } from '../../data/portfolio';

const Projects = () => {
    const { language } = useLanguage();

    return (
        <section id="projects" className="py-20 bg-gray-50 dark:bg-black/20">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        {language === 'fr' ? 'Mes Projets' : 'Featured Projects'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {language === 'fr'
                            ? "Une sélection de mes travaux récents."
                            : "A selection of my recent works."}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full"
                        >
                            <div className="relative overflow-hidden h-40">
                                <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/5 transition-colors z-10"></div>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            <div className="p-4 flex-grow flex flex-col">
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {project.tech.map(t => (
                                        <span key={t} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-medium rounded-full">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-lg font-bold mb-1.5 text-gray-800 dark:text-gray-100 group-hover:text-gray-600 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-xs mb-4 flex-grow line-clamp-2">
                                    {project.description[language]}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex gap-3">
                                        <a
                                            href={project.links.demo}
                                            className="flex items-center gap-1.5 text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors"
                                        >
                                            <ExternalLink size={14} />
                                            Demo
                                        </a>
                                        <a
                                            href={project.links.repo}
                                            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                                        >
                                            <Github size={14} />
                                            Code
                                        </a>
                                    </div>
                                    {project.caseStudy && (
                                        <button className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                                            {language === 'fr' ? 'Case Study' : 'Case Study'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
