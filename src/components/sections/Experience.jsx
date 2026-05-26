import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight, Terminal, FileCode, Search, Files } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { experienceData } from '../../data/portfolio';

const TypewriterCode = ({ code }) => {
    const [displayedCode, setDisplayedCode] = useState("");
    const [restartKey, setRestartKey] = useState(0);

    useEffect(() => {
        setDisplayedCode("");
        let index = 0;
        const interval = setInterval(() => {
            if (index < code.length) {
                setDisplayedCode(code.slice(0, index + 1));
                index++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setRestartKey(prev => prev + 1);
                }, 3000);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [code, restartKey]);

    return (
        <pre className="text-gray-300">
            {displayedCode.split('\n').map((line, i) => (
                <div key={i} className="flex gap-6">
                    <span className="text-gray-600 text-right w-6 select-none">{i + 1}</span>
                    <span className="whitespace-pre">
                        {line}
                        {i === displayedCode.split('\n').length - 1 && (
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="inline-block w-[2px] h-[1.2em] bg-orange-500 ml-1 align-middle"
                            />
                        )}
                    </span>
                </div>
            ))}
        </pre>
    );
};

const Experience = () => {
    const { language } = useLanguage();
    const data = experienceData[language];
    const [activeIndex, setActiveIndex] = useState(0);

    const codeSnippets = [
        {
            language: 'javascript',
            filename: 'FullStackDev.jsx',
            code: `import React from 'react';

const FullStackExperience = () => {
  const skills = ['React', 'Node.js', 'MongoDB'];
  
  return (
    <Project 
      role="Senior Full Stack"
      mission="Scale products & innovate"
      stack={skills}
    />
  );
};

export default FullStackExperience;`
        },
        {
            language: 'javascript',
            filename: 'JuniorDev.js',
            code: `const express = require('express');
const app = express();

app.get('/api/journey', (req, res) => {
  res.status(200).json({
    role: "Web Junior Developer",
    focus: "Modern Web Apps",
    motivation: 100
  });
});

app.listen(3000);`
        }
    ];

    const nextExperience = () => {
        setActiveIndex((prev) => (prev + 1) % data.length);
    };

    return (
        <section id="experience" className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 border-l-4 border-orange-500 pl-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-gray-900 dark:text-white">
                            {language === 'fr' ? 'Expérience' : 'Experience'}
                        </h2>
                        <p className="text-xl text-gray-500 dark:text-gray-400 font-light">
                            {language === 'fr' 
                                ? "Découvrez mon parcours à travers mon environnement de travail."
                                : "Explore my journey through my workspace."}
                        </p>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row gap-12 items-start pl-8">
                    {/* Left Side: Experience Text */}
                    <div className="lg:w-5/12 space-y-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="px-4 py-1.5 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest rounded-sm border border-orange-200 dark:border-orange-500/20">
                                        {data[activeIndex].period}
                                    </span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">
                                    {data[activeIndex].role}
                                </h3>
                                <div className="flex items-center gap-3 text-xl text-gray-500 dark:text-gray-400 font-medium">
                                    <Briefcase size={22} className="text-orange-500" />
                                    {data[activeIndex].company}
                                </div>
                                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light py-6 border-y border-gray-100 dark:border-white/5">
                                    {data[activeIndex].description}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <button 
                            onClick={nextExperience}
                            className="group flex items-center gap-4 bg-transparent border border-gray-900 dark:border-white text-gray-900 dark:text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
                        >
                            {language === 'fr' ? 'Expérience Suivante' : 'Next Experience'}
                            <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>

                    {/* Vertical Divider */}
                    <div className="hidden lg:block w-px bg-gray-200 dark:bg-white/10 self-stretch"></div>

                    {/* Right Side: VS Code Editor Mockup */}
                    <div className="lg:w-6/12 w-full">
                        <div className="bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden border border-white/10">
                            {/* Editor Header */}
                            <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between border-b border-black/20">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                </div>
                                <div className="text-xs text-gray-400 font-mono flex items-center gap-2">
                                    <FileCode size={14} className="text-blue-400" />
                                    {codeSnippets[activeIndex].filename}
                                </div>
                                <div className="w-12"></div>
                            </div>
                            
                            {/* Editor Layout */}
                            <div className="flex">
                                {/* Sidebar Thin Strip */}
                                <div className="hidden sm:flex flex-col items-center py-4 gap-6 w-12 bg-[#333333] border-r border-black/20">
                                    <Files size={20} className="text-white/40" />
                                    <Search size={20} className="text-white/40" />
                                    <Terminal size={20} className="text-white/40" />
                                </div>
                                
                                {/* Code Content with Typewriter Effect */}
                                <div className="p-6 md:p-10 font-mono text-sm leading-relaxed overflow-x-auto w-full h-[400px]">
                                    <TypewriterCode key={activeIndex} code={codeSnippets[activeIndex].code} />
                                </div>
                            </div>
                            
                            {/* Editor Footer */}
                            <div className="bg-[#007acc] px-4 py-1 flex items-center justify-between text-[10px] text-white/80 font-mono uppercase tracking-wider">
                                <div className="flex items-center gap-4">
                                    <span>Main*</span>
                                    <span>UTF-8</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span>{codeSnippets[activeIndex].language}</span>
                                    <span>Prettier</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
