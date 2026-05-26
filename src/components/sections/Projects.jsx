import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { projectsData } from '../../data/portfolio';

const Projects = () => {
    const { language } = useLanguage();

    return (
        <section id="projects" className="py-24 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-300">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 border-l-4 border-[#ffcc00] pl-8"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-gray-900 dark:text-white">
                        {language === 'fr' ? 'Mes Projets' : 'Featured Projects'}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg">
                        {language === 'fr'
                            ? "Une sélection de mes travaux récents, alliant technicité et design."
                            : "A selection of my recent works, combining technicality and design."}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projectsData.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col h-full group"
                        >
                            {/* Image Container */}
                            <div className="relative overflow-hidden aspect-[16/9] mb-8 border-l-4 border-[#ffcc00]">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {project.category && (
                                    <div className="absolute top-4 right-4 bg-[#ffcc00] text-black text-[10px] font-black px-3 py-1 uppercase tracking-wider">
                                        {project.category}
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                            </div>

                            {/* Content */}
                            <div className="flex-grow">
                                <h3 className="text-xl font-black mb-3 text-gray-900 dark:text-white tracking-widest uppercase">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                                    {project.description[language]}
                                </p>

                                {/* Tech badges */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map(t => (
                                        <span key={t} className="px-2 py-0.5 bg-gray-200 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 text-[10px] font-mono tracking-widest rounded-sm">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Challenge/Success Grid */}
                                <div className="grid grid-cols-2 gap-6">
                                    {project.challenge && (
                                        <div>
                                            <h4 className="text-[10px] font-black text-[#ffcc00] uppercase tracking-[0.2em] mb-2">
                                                Challenge
                                            </h4>
                                            <p className="text-gray-500 dark:text-gray-300 text-[11px] leading-relaxed italic opacity-80">
                                                {project.challenge[language]}
                                            </p>
                                        </div>
                                    )}
                                    {project.success && (
                                        <div>
                                            <h4 className="text-[10px] font-black text-[#ffcc00] uppercase tracking-[0.2em] mb-2">
                                                Success
                                            </h4>
                                            <p className="text-gray-500 dark:text-gray-300 text-[11px] leading-relaxed opacity-80">
                                                {project.success[language]}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Links */}
                            <div className="flex gap-5 pt-4 border-t border-gray-100 dark:border-white/5 mt-auto">
                                {project.links?.repo && (
                                    <a
                                        href={project.links.repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-[#ffcc00] uppercase tracking-widest transition-all group/link"
                                    >
                                        <Github size={16} className="group-hover/link:scale-110 transition-transform" />
                                        <span>Code</span>
                                    </a>
                                )}
                                {project.links?.demo && (
                                    <a
                                        href={project.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-[#ffcc00] uppercase tracking-widest transition-all group/link"
                                    >
                                        <ExternalLink size={16} className="group-hover/link:scale-110 transition-transform" />
                                        <span>Demo</span>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
