import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Database, Shield, Terminal, Zap } from 'lucide-react';
import { skillsData } from '../../data/portfolio';
import { useLanguage } from '../../context/LanguageContext';

const SkillItem = ({ name, level, index }) => (
    <div className="group mb-8 last:mb-0">
        <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-black uppercase tracking-widest text-gray-700 dark:text-gray-100 group-hover:text-orange-500 transition-colors duration-300">
                {name}
            </span>
            <span className="text-xs font-mono text-orange-500/60 font-bold">
                {level}%
            </span>
        </div>
        <div className="relative h-[2px] w-full bg-gray-200 dark:bg-white/5 overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
                className="absolute top-0 left-0 h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]"
            />
        </div>
    </div>
);

const Skills = () => {
    const { language } = useLanguage();

    const categories = [
        { 
            id: 'Frontend', 
            label: language === 'fr' ? 'Développement Frontend' : 'Frontend Development',
            icon: Globe,
            skills: skillsData.filter(s => s.category === 'Frontend')
        },
        { 
            id: 'Backend', 
            label: language === 'fr' ? 'Développement Backend' : 'Backend Development',
            icon: Database,
            skills: skillsData.filter(s => s.category === 'Backend')
        },
        { 
            id: 'Soft Skills', 
            label: language === 'fr' ? 'Intelligence & Soft Skills' : 'Intelligence & Soft Skills',
            icon: Zap,
            skills: skillsData.filter(s => s.category === 'Soft Skills')
        },
        { 
            id: 'Tools', 
            label: language === 'fr' ? 'Outils & Environnements' : 'Tools & Environments',
            icon: Terminal,
            skills: skillsData.filter(s => s.category === 'Tools')
        }
    ];

    return (
        <section id="skills" className="pt-12 pb-32 bg-white dark:bg-[#050505] relative overflow-hidden transition-colors duration-500">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent"></div>

            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 border-l-4 border-orange-500 pl-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-gray-900 dark:text-white">
                            {language === 'fr' ? 'Compétences' : 'Skills'}
                        </h2>
                        <p className="text-xl text-gray-500 dark:text-gray-400 font-light italic">
                            {language === 'fr' 
                                ? "Expertise technique structurée pour des performances maximales."
                                : "Structured technical expertise for maximum performance."}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-200 dark:border-white/5 rounded-sm overflow-hidden bg-white dark:bg-[#0a0a0a] transition-all duration-500">
                        {categories.map((cat, catIndex) => (
                            <div 
                                key={catIndex} 
                                className={`p-10 flex flex-col border-gray-200 dark:border-white/5 ${
                                    catIndex !== categories.length - 1 ? 'lg:border-r border-b lg:border-b-0' : ''
                                } ${catIndex === 1 || catIndex === 3 ? 'md:border-r-0 lg:border-r' : 'md:border-r'}`}
                            >
                                <div className="flex items-center gap-6 mb-12">
                                    <div className="w-14 h-14 bg-orange-500/5 dark:bg-orange-500/10 flex items-center justify-center rounded-sm border border-orange-500/20 text-orange-500">
                                        <cat.icon size={28} />
                                    </div>
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white leading-tight">
                                        {cat.label}
                                    </h3>
                                </div>

                                <div className="flex-grow">
                                    {cat.skills.map((skill, index) => (
                                        <SkillItem 
                                            key={index} 
                                            name={skill.name} 
                                            level={skill.level} 
                                            index={index} 
                                          />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
