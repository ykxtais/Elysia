import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function BtnLanguage({ compact = false }) {
  const { mode, colors } = useTheme();
  const { lang, change } = useLanguage();

  const current = lang === 'pt' ? 'PT' : 'ES';
  const next = lang === 'pt' ? 'es' : 'pt';

  const isDark = mode === 'dark';
  const bg     = isDark ? colors.primary : colors.card;
  const brd    = isDark ? colors.primary : colors.border;
  const txt    = isDark ? colors.onPrimary : colors.text;
  const icon   = isDark ? colors.onPrimary : colors.text;

  return (
    <TouchableOpacity
      onPress={() => change(next)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: compact ? 10 : 12,
        paddingVertical: compact ? 6 : 8,
        borderRadius: 999,
        borderWidth: 1,
        backgroundColor: bg,
        borderColor: brd,
        marginLeft: 8,
      }}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Text style={{ color: txt, fontWeight: '800', fontSize: compact ? 11 : 12, marginRight: 6 }}>
        {current}
      </Text>
      <Ionicons name="language-outline" size={16} color={icon} />
    </TouchableOpacity>
  );
}
