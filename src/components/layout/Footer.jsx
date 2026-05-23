import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin, Phone, ArrowUpRight, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { bioData, servicesData, socialLinks, contactInfo } from '../../data/portfolio';

const Footer = () => {
    const { language } = useLanguage();
    const bio = bioData[language];
    const services = servicesData[language];

    const iconMap = {
        Github: <Github size={20} />,
        Linkedin: <Linkedin size={20} />,
        Twitter: <Twitter size={20} />,
        Instagram: <Instagram size={20} />
    };

    return (
        <footer className="relative bg-[#0B0F1A] text-gray-400 py-20 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-4xl" style={{ fontFamily: "'Great Vibes', cursive", color: '#f97316' }}>P</span>
                            <span className="text-2xl font-bold text-white tracking-tight">ortfolio<span style={{ color: '#f97316' }}>.</span></span>
                        </div>
                        <p className="text-gray-400 leading-relaxed max-w-xs">
                            {bio.description}
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                                    aria-label={social.name}
                                >
                                    {iconMap[social.icon]}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Services Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-6"
                    >
                        <h4 className="text-white font-bold text-lg uppercase tracking-wider">
                            {language === 'fr' ? 'Services' : 'Services'}
                        </h4>
                        <ul className="space-y-4">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <a href="#services" className="hover:text-orange-500 transition-colors flex items-center gap-2 group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500/40 group-hover:bg-orange-500 transition-colors"></div>
                                        {service.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Quick Links Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h4 className="text-white font-bold text-lg uppercase tracking-wider">
                            {language === 'fr' ? 'Liens Rapides' : 'Quick Links'}
                        </h4>
                        <ul className="space-y-4">
                            {['hero', 'about', 'projects', 'blog', 'contact'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item}`} className="hover:text-orange-500 transition-colors capitalize flex items-center justify-between group">
                                        {item}
                                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-6"
                    >
                        <h4 className="text-white font-bold text-lg uppercase tracking-wider">
                            {language === 'fr' ? 'Informations' : 'Information'}
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Mail className="text-orange-500 shrink-0 mt-1" size={18} />
                                <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">{contactInfo.email}</a>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="text-orange-500 shrink-0 mt-1" size={18} />
                                <a href={`tel:${contactInfo.phone}`} className="hover:text-white transition-colors">{contactInfo.phone}</a>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="text-orange-500 shrink-0 mt-1" size={18} />
                                <span>{contactInfo.address}</span>
                            </div>
                            <div className="pt-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    {contactInfo.availability[language]}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm">
                        © {new Date().getFullYear()} {language === 'fr' ? 'Tous droits réservés' : 'All rights reserved'}
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                        <a href="#" className="hover:text-white transition-colors">{language === 'fr' ? 'Confidentialité' : 'Privacy Policy'}</a>
                        <a href="#" className="hover:text-white transition-colors">{language === 'fr' ? 'Conditions' : 'Terms of Service'}</a>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                            {language === 'fr' ? (
                                <img src="https://flagcdn.com/w40/fr.png" alt="FR" className="w-4 h-4 rounded-full object-cover" />
                            ) : (
                                <img src="https://flagcdn.com/w40/gb.png" alt="EN" className="w-4 h-4 rounded-full object-cover" />
                            )}
                            <span className="text-white font-medium uppercase tracking-tighter">{language}</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
