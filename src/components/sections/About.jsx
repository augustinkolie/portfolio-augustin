import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Coffee, Zap, Target, Award, Briefcase, GraduationCap, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { bioData, languageSkills, hobbiesData } from '../../data/portfolio';
import aboutImg from '../../assets/images/about-professional.png';
import ClipPaths from '../ui/ClipPaths';

const About = () => {
    const { language } = useLanguage();
    const content = bioData[language];

    const highlights = [
        {
            icon: Code2,
            title: language === 'fr' ? 'Code Propre' : 'Clean Code',
            description: language === 'fr' ? 'Écriture de code maintenable et évolutif' : 'Writing maintainable and scalable code'
        },
        {
            icon: Zap,
            title: language === 'fr' ? 'Performance' : 'Performance',
            description: language === 'fr' ? 'Optimisation pour une expérience fluide' : 'Optimization for smooth experience'
        },
        {
            icon: Target,
            title: language === 'fr' ? 'Orienté Solutions' : 'Solution-Oriented',
            description: language === 'fr' ? 'Résolution créative de problèmes complexes' : 'Creative problem-solving approach'
        },
        {
            icon: Heart,
            title: language === 'fr' ? 'Passion' : 'Passion',
            description: language === 'fr' ? 'Amour pour la technologie et l\'innovation' : 'Love for technology and innovation'
        }
    ];

    const stats = [
        { icon: Briefcase, value: '3+', label: language === 'fr' ? 'Années d\'expérience' : 'Years Experience' },
        { icon: Award, value: '15+', label: language === 'fr' ? 'Projets réalisés' : 'Projects Completed' },
        { icon: GraduationCap, value: '2023', label: language === 'fr' ? 'Début études supérieures' : 'Started University' },
    ];

    return (
        <section id="about" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
            <ClipPaths />
            <div className="container mx-auto">


                {/* Main Content Grid - Swapped Order */}
                <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
                    {/* Left Side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-10 order-1"
                    >
                        <div>
                            <span className="text-orange-500 font-semibold uppercase tracking-wider text-sm mb-4 block">
                                {language === 'fr' ? 'Découvrez-moi' : 'Get To Know Me'}
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black mb-8 text-gray-900 dark:text-gray-100 leading-tight">
                                {language === 'fr' ? 'Passionné par le Développement Web & l\'Innovation' : 'Passionate about Web Development & Innovation'}
                            </h2>
                            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                                {content.about}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                                {language === 'fr'
                                    ? "Actuellement étudiant en informatique à l'Université de Labé, je combine apprentissage académique et projets pratiques pour développer mes compétences en développement web full-stack."
                                    : "Currently studying Computer Science at the University of Labé, I combine academic learning with practical projects to develop my full-stack web development skills."}
                            </p>
                        </div>

                        {/* Action Buttons as in Image 2 */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <a 
                                href="#contact" 
                                className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-red-500/20"
                            >
                                {language === 'fr' ? 'Planifier une consultation' : 'Schedule a consultation'}
                            </a>
                            <a 
                                href="#services" 
                                className="px-8 py-4 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 text-white font-bold rounded-lg transition-colors"
                            >
                                {language === 'fr' ? 'Mes Services' : 'My Services'}
                            </a>
                        </div>

                        {/* Highlights Grid - Slightly restyled for the new layout */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-orange-500/10 rounded-lg group-hover:bg-orange-500 transition-colors shrink-0">
                                            <item.icon className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-1">{item.title}</h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{item.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side - Image with Side Curve */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative order-2"
                    >
                        <div className="relative group">
                            <motion.div 
                                className="relative z-10"
                                style={{ 
                                    clipPath: 'url(#parabolic-left)',
                                }}
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.4 }}
                            >
                                <img
                                    src={aboutImg}
                                    alt="Web Development Workspace"
                                    className="w-full h-full object-cover min-h-[500px]"
                                />
                                {/* Red accent border on the right */}
                                <div className="absolute top-0 right-0 w-2 h-full bg-red-500 z-20"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
                            </motion.div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-[100px]"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[100px]"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
