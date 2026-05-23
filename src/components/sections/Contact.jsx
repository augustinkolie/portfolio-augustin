import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { contactInfo } from '../../data/portfolio';

const INITIAL_FORM = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    helpType: '',
    message: ''
};

const Contact = () => {
    const { language } = useLanguage();
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            const res = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    email: formData.email,
                    phone: formData.phone,
                    subject: formData.helpType || 'Contact depuis le portfolio',
                    message: formData.message,
                })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Erreur serveur');

            // ✅ Succès : vider tous les champs
            setFormData(INITIAL_FORM);
            setStatus('success');

            // Revenir à l'état normal après 4 secondes
            setTimeout(() => setStatus('idle'), 4000);

        } catch (err) {
            setErrorMsg(err.message);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="relative py-20 overflow-hidden">
            {/* Split Background */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gray-800 dark:bg-gray-900 z-0"></div>
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-black z-0"></div>
            
            <div className="container mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-white space-y-12 py-10"
                    >
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                                {language === 'fr' ? 'Collaborons pour bâtir votre prochaine solution digitale' : 'Let\'s collaborate to build your next digital solution'}
                            </h2>
                            <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                                {language === 'fr' 
                                    ? "Projetez-vous de lancer une application ou d'optimiser votre présence en ligne ? Discutons-en pour transformer vos idées en réalité."
                                    : "Thinking about launching an app or optimizing your online presence? Let's talk to turn your ideas into reality."}
                            </p>
                        </div>

                        <div className="text-2xl font-bold">
                            {language === 'fr' ? 'Appelez-moi au :' : 'Call me at:'} <span className="text-orange-500">{contactInfo.phone}</span>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold uppercase tracking-widest text-gray-400">
                                {language === 'fr' ? 'Mes avantages :' : 'My advantages:'}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                {[
                                    language === 'fr' ? 'Orienté client' : 'Customer Oriented',
                                    language === 'fr' ? 'Axé sur les résultats' : 'Results Driven',
                                    language === 'fr' ? 'Indépendant' : 'Independent',
                                    language === 'fr' ? 'Résolution de problèmes' : 'Problem Solving',
                                    language === 'fr' ? 'Compétent' : 'Competent',
                                    language === 'fr' ? 'Transparent' : 'Transparent'
                                ].map((adv, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                                        <span className="text-gray-200 font-medium">{adv}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Floating Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-xl p-6 md:p-12 shadow-2xl relative z-10 w-full"
                    >
                        <div className="text-center mb-10">
                            <div className="flex justify-center text-gray-400 mb-4">
                                <Mail size={48} className="drop-shadow-sm" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                {language === 'fr' ? 'Contactez-nous' : 'Contact Us'}
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                        {language === 'fr' ? 'Prénom' : 'First Name'}
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-red-600 outline-none transition-all text-gray-900"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                        {language === 'fr' ? 'Nom de famille' : 'Last Name'}
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-red-600 outline-none transition-all text-gray-900"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    {language === 'fr' ? 'E-mail professionnel' : 'Work Email'}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-red-600 outline-none transition-all text-gray-900"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    {language === 'fr' ? 'Entreprise / Organisation' : 'Company / Organization'}
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-red-600 outline-none transition-all text-gray-900"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    {language === 'fr' ? 'Téléphone' : 'Phone Number'}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="flex items-center gap-2 text-gray-500 font-bold border-r border-gray-200 pr-3 mr-1 text-sm">
                                            <div className="w-6 h-4 flex shadow-sm rounded-sm overflow-hidden">
                                                <div className="w-1/3 bg-[#CE1126]"></div>
                                                <div className="w-1/3 bg-[#FCD116]"></div>
                                                <div className="w-1/3 bg-[#009460]"></div>
                                            </div>
                                            <span>+224</span>
                                        </span>
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        placeholder="610 00 00 00"
                                        className="w-full pl-24 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-red-600 outline-none transition-all text-gray-900"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    {language === 'fr' ? 'Comment pouvons-nous vous aider ?' : 'How can we help you?'}
                                </label>
                                <select
                                    name="helpType"
                                    value={formData.helpType}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-red-600 outline-none transition-all text-gray-900 appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1em_1em]"
                                    onChange={handleChange}
                                >
                                    <option value="">{language === 'fr' ? 'Sélectionnez une option' : 'Select an option'}</option>
                                    <option value="dev">{language === 'fr' ? 'Développement' : 'Development'}</option>
                                    <option value="design">{language === 'fr' ? 'Design' : 'Design'}</option>
                                    <option value="consulting">{language === 'fr' ? 'Consulting' : 'Consulting'}</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    {language === 'fr' ? 'Message' : 'Message'}
                                </label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-red-600 outline-none transition-all text-gray-900 resize-none"
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="pt-4 space-y-3">
                                {status === 'success' && (
                                    <div className="w-full py-4 bg-green-50 border border-green-200 text-green-700 rounded-lg font-semibold text-sm text-center">
                                        ✅ {language === 'fr' ? 'Message envoyé avec succès !' : 'Message sent successfully!'}
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="w-full py-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
                                        ⚠️ {errorMsg || (language === 'fr' ? 'Une erreur est survenue.' : 'An error occurred.')}
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-bold text-sm uppercase tracking-widest shadow-xl shadow-red-600/20 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                            </svg>
                                            {language === 'fr' ? 'Envoi en cours...' : 'Sending...'}
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            {language === 'fr' ? 'Envoyer' : 'Send'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
