import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function BtnTheme({ compact = false }) {
  const { mode, toggle, colors } = useTheme();
  const isDark = mode === 'dark';

  const bg   = isDark ? colors.primary : colors.card;
  const brd  = isDark ? colors.primary : colors.border;
  const txt  = isDark ? colors.onPrimary : colors.text;
  const ico  = isDark ? colors.onPrimary : colors.text;
  const icon = isDark ? 'sunny-outline' : 'moon-outline';

  return (
    <TouchableOpacity
      onPress={toggle}
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
      <Ionicons name={icon} size={16} color={ico} />
    </TouchableOpacity>
  );
}
