import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

import pt from '../locales/pt.json';
import es from '../locales/es.json';

const STORAGE_KEY = '@lang';
type Lang = 'pt' | 'es';

function isLang(v: unknown): v is Lang {
  return v === 'pt' || v === 'es';
}

async function detectLanguage(): Promise<Lang> {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {}
  const device = Localization.getLocales?.()[0]?.languageCode || 'es';
  return device === 'pt' ? 'pt' : 'es';
}

i18n.use(initReactI18next).init({
  lng: 'pt',
  fallbackLng: 'pt',
  resources: {
    pt: { translation: pt },
    es: { translation: es },
  },
  interpolation: { escapeValue: false },
});

detectLanguage().then((lng) => {
  i18n.changeLanguage(lng);
});

const _change = i18n.changeLanguage.bind(i18n) as (lng: Lang) => any;

i18n.changeLanguage = async (lng: Lang) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, lng);
  } catch {}
  return _change(lng);
};

export default i18n;
