import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Calendar, User, Clock } from 'lucide-react';
import { blogData } from '../../data/portfolio';
import { useLanguage } from '../../context/LanguageContext';

const BlogModal = ({ post, isOpen, onClose, language }) => (
    <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl flex flex-col"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-sm transition-colors"
                    >
                        <X size={24} />
                    </button>

                    {/* Image Header */}
                    <div className="relative h-64 md:h-80 w-full shrink-0">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8 text-white">
                            <div className="flex flex-wrap gap-4 text-xs font-medium mb-3">
                                <span className="flex items-center gap-1 bg-orange-500 px-3 py-1 rounded-sm">
                                    <Calendar size={12} /> {post.date}
                                </span>
                                <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-sm">
                                    <Clock size={12} /> 5 min read
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-4xl font-bold">{post.title}</h2>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-600">
                                <User size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800 dark:text-gray-200">Augustin Kolié</p>
                                <p className="text-sm text-gray-500">Full Stack Developer</p>
                            </div>
                        </div>

                        <div className="prose prose-orange dark:prose-invert max-w-none">
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                {post.content}
                            </p>

                            {/* Visual placeholders for more content */}
                            <div className="mt-8 p-6 bg-orange-50 dark:bg-orange-900/10 rounded-lg border border-orange-100 dark:border-orange-900/20">
                                <h4 className="text-orange-900 dark:text-orange-400 font-bold mb-2">
                                    {language === 'fr' ? 'Points clés :' : 'Key takeaways:'}
                                </h4>
                                <ul className="list-disc list-inside text-orange-800/80 dark:text-orange-300/80 space-y-2">
                                    <li>{language === 'fr' ? 'Performance optimisée' : 'Optimized performance'}</li>
                                    <li>{language === 'fr' ? 'Meilleures pratiques 2025' : '2025 Best practices'}</li>
                                    <li>{language === 'fr' ? 'Évolutivité garantie' : 'Guaranteed scalability'}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);

const BlogPreview = () => {
    const { language } = useLanguage();
    const [selectedPost, setSelectedPost] = useState(null);
    const posts = blogData[language];

    return (
        <section id="blog" className="py-24 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 border-l-4 border-orange-500 pl-8"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-gray-900 dark:text-white">
                        Blog
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg">
                        {language === 'fr' 
                            ? "Partages sur le développement, les nouvelles technologies et mes retours d'expérience."
                            : "Shares on development, new technologies and my feedback."}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {posts.map((post, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                            onClick={() => setSelectedPost(post)}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                                    {post.date}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100 group-hover:text-orange-500 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-xs mb-4 leading-relaxed line-clamp-2">
                                    {post.excerpt}
                                </p>
                                <button
                                    className="flex items-center gap-1.5 text-orange-500 text-sm font-bold hover:gap-3 transition-all"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedPost(post);
                                    }}
                                >
                                    {language === 'fr' ? 'Lire la suite' : 'Read more'}
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <BlogModal
                post={selectedPost}
                isOpen={!!selectedPost}
                onClose={() => setSelectedPost(null)}
                language={language}
            />
        </section>
    );
};

export default BlogPreview;
