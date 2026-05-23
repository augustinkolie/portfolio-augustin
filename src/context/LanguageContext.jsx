import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('portfolio_lang');
        return saved || 'fr';
    });

    const switchLanguage = (lang) => {
        console.log('Switching language to:', lang);
        setLanguage(lang);
        localStorage.setItem('portfolio_lang', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, switchLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
