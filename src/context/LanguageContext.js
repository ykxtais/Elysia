import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import i18n from '../services/i18n';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(i18n.language || 'pt');

  useEffect(() => {
    const onChange = (lng) => setLang(lng);
    i18n.on('languageChanged', onChange);
    return () => i18n.off('languageChanged', onChange);
  }, []);

  const change = async (code) => {
    await i18n.changeLanguage(code);
    setLang(code);
  };

  const value = useMemo(() => ({ lang, t: i18n.t.bind(i18n), change }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
