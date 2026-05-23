import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../../data/portfolio';
import { useLanguage } from '../../context/LanguageContext';

const SkillCard = ({ skill, index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
    >
        <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-300">{skill.name}</span>
            <span className="text-orange-500 text-sm font-bold">{skill.level}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
            />
        </div>
    </motion.div>
);

const Skills = () => {
    const { language } = useLanguage();

    const categories = [...new Set(skillsData.map(s => s.category))];

    return (
        <section id="skills" className="py-24 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                        {language === 'fr' ? 'Compétences' : 'Skills'}
                    </h2>
                    <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
                </div>

                <div className="space-y-12 max-w-6xl mx-auto">
                    {categories.map((category, catIndex) => (
                        <div key={catIndex}>
                            <h3 className="text-xl font-bold mb-6 text-gray-700 dark:text-gray-300 uppercase tracking-wider pl-4 border-l-4 border-orange-500">
                                {category}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {skillsData
                                    .filter(s => s.category === category)
                                    .map((skill, index) => (
                                        <SkillCard key={index} skill={skill} index={index} />
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
