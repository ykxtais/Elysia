import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebase/firebaseConfig';
import { useThemedStyles } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { authErrorMessage } from '../../utils/authErrors';
import { notifyLoginSuccess } from '../../notifications/notify';

export default function Login() {
  const { t } = useLanguage();
  const nav = useNavigation();

  const styles = useThemedStyles(({ colors }) =>
    StyleSheet.create({
      container: { flex: 1, backgroundColor: colors.background, padding: 24, justifyContent: 'center' },
      title: { color: colors.text, fontSize: 28, fontWeight: '700', marginBottom: 16 },
      input: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1, borderRadius: 10, padding: 12, color: colors.text, marginBottom: 12,
      },
      button: { backgroundColor: colors.primary, padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
      buttonText: { color: colors.onPrimary, fontWeight: '600' },
      link: { color: colors.primary, marginTop: 14, textAlign: 'center', fontWeight: '600' },
    })
  );

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleLogin() {
    if (!email || !senha) return Alert.alert(t('errors.obrigatorio'));
    try {
      await signInWithEmailAndPassword(auth, email.trim(), senha);
      await notifyLoginSuccess();
    } catch (e) {
      console.error('login error', e);
      Alert.alert(authErrorMessage(e, t));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('auth.bemVindo')}</Text>

      <TextInput
        placeholder={t('auth.email')}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#999"
        textContentType="emailAddress"
        autoComplete="email"
      />

      <TextInput
        placeholder={t('auth.senha')}
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholderTextColor="#999"
        textContentType="password"
        autoComplete="password"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{t('auth.login')}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => nav.navigate('Register')}>
        <Text style={styles.link}>{t('auth.criarConta')}</Text>
      </TouchableOpacity>
    </View>
  );
}
