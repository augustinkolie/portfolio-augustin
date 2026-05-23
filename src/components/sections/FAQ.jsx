import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { faqData } from '../../data/portfolio';
import { useLanguage } from '../../context/LanguageContext';

const FAQItem = ({ item, isOpen, onClick }) => (
    <div className="border-b border-gray-200 dark:border-gray-700">
        <button
            onClick={onClick}
            className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
        >
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {item.question}
            </span>
            <span className="ml-4 text-orange-500">
                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
            </span>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <p className="pb-6 text-gray-600 dark:text-gray-400">
                        {item.answer}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const FAQ = () => {
    const { language } = useLanguage();
    const [openIndex, setOpenIndex] = useState(null);
    const faqs = faqData[language];

    return (
        <section className="py-24 bg-white dark:bg-gray-900">
            <div className="container mx-auto max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                        FAQ
                    </h2>
                    <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
                </div>

                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            item={faq}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
