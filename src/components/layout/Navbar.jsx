import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { language, switchLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: language === "fr" ? "Accueil" : "Home", path: "/" },
        { name: language === "fr" ? "À propos" : "About", path: "/#about" },
        { name: language === "fr" ? "Projets" : "Projects", path: "/#projects" },
        { name: language === "fr" ? "Expérience" : "Experience", path: "/#experience" },
        { name: language === "fr" ? "Contact" : "Contact", path: "/#contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed w-full z-50 transition-all duration-300",
                scrolled
                    ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <h1 className={cn(
                        "text-2xl font-bold tracking-tight transition-colors",
                        scrolled ? "text-gray-900 dark:text-white" : "text-white"
                    )}>
                        <span className="text-4xl" style={{ fontFamily: "'Great Vibes', cursive", color: '#f97316' }}>P</span>
                        <span className="font-bold">ortfolio<span className="text-primary">.</span></span>
                    </h1>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            className={cn(
                                "transition-colors font-medium",
                                scrolled
                                    ? "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                                    : "text-white/90 hover:text-white"
                            )}
                        >
                            {link.name}
                        </a>
                    ))}

                    <div className={cn(
                        "flex items-center space-x-4 border-l pl-4",
                        scrolled
                            ? "border-gray-200 dark:border-gray-700"
                            : "border-white/20"
                    )}>
                        <button
                            onClick={toggleTheme}
                            className={cn(
                                "p-2 rounded-sm transition-colors",
                                scrolled
                                    ? "hover:bg-gray-100 dark:hover:bg-gray-800"
                                    : "text-white hover:bg-white/10"
                            )}
                            aria-label="Toggle Theme"
                        >
                            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <div className="relative group lg:block hidden">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-2 rounded-sm transition-all border shadow-sm hover:shadow-md",
                                    scrolled
                                        ? "text-gray-700 border-gray-200 bg-white/50 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800/50"
                                        : "text-white border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                                )}
                            >
                                {language === 'fr' ? (
                                    <img src="https://flagcdn.com/w40/fr.png" alt="FR" className="w-5 h-5 rounded-full object-cover shadow-sm" />
                                ) : (
                                    <img src="https://flagcdn.com/w40/gb.png" alt="EN" className="w-5 h-5 rounded-full object-cover shadow-sm" />
                                )}
                                <span className="text-sm font-bold uppercase tracking-wider">{language}</span>
                                <motion.div
                                    animate={{ rotate: isLangOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {isLangOpen && (
                                    <>
                                        {/* Invisible backdrop to close on click outside */}
                                        <div 
                                            className="fixed inset-0 z-0" 
                                            onClick={() => setIsLangOpen(false)}
                                        ></div>
                                        
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-3 w-40 bg-white dark:bg-gray-800 rounded-sm shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 p-1.5"
                                        >
                                            <button
                                                onClick={() => {
                                                    switchLanguage("fr");
                                                    setIsLangOpen(false);
                                                }}
                                                className={cn(
                                                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-left",
                                                    language === "fr" ? "bg-primary/10 text-primary font-bold" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                )}
                                            >
                                                <img src="https://flagcdn.com/w40/fr.png" alt="FR" className="w-5 h-5 rounded-full object-cover" />
                                                <span className="text-sm">Français</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    switchLanguage("en");
                                                    setIsLangOpen(false);
                                                }}
                                                className={cn(
                                                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-left",
                                                    language === "en" ? "bg-primary/10 text-primary font-bold" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                )}
                                            >
                                                <img src="https://flagcdn.com/w40/gb.png" alt="EN" className="w-5 h-5 rounded-full object-cover" />
                                                <span className="text-sm">English</span>
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-2 sm:gap-4">
                    <button
                        onClick={toggleTheme}
                        className={cn(
                            "p-2 rounded-sm transition-colors",
                            scrolled 
                                ? "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300" 
                                : "text-white hover:bg-white/10"
                        )}
                    >
                        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "p-2 rounded-md transition-colors",
                            scrolled
                                ? "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                                : "text-white hover:bg-white/10"
                        )}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-xl"
                    >
                        <div className="container mx-auto px-6 py-6 flex flex-col space-y-5">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-bold text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors flex justify-between items-center"
                                >
                                    {link.name}
                                    <Globe size={16} className="opacity-20" />
                                </a>
                            ))}
                            <div className="h-px bg-gray-100 dark:bg-gray-800 my-2"></div>
                            <button
                                onClick={() => {
                                    switchLanguage(language === "fr" ? "en" : "fr");
                                    setIsOpen(false);
                                }}
                                className="flex items-center gap-3 text-lg font-bold text-primary"
                            >
                                {language === 'fr' ? (
                                    <img src="https://flagcdn.com/w40/gb.png" alt="EN" className="w-6 h-6 rounded-full object-cover" />
                                ) : (
                                    <img src="https://flagcdn.com/w40/fr.png" alt="FR" className="w-6 h-6 rounded-full object-cover" />
                                )}
                                <span>{language === "fr" ? "Switch to English" : "Passer en Français"}</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
