import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { auth } from '../../firebase/firebaseConfig';
import { useThemedStyles } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { notifyRegisterSuccess } from '../../notifications/notify';
import { authErrorMessage } from '../../utils/authErrors';

export default function Register() {
  const nav = useNavigation();
  const { t } = useLanguage();

  const styles = useThemedStyles(({ colors }) =>
    StyleSheet.create({
      container: { flex: 1, backgroundColor: colors.background, padding: 24, justifyContent: 'center' },
      title: { color: colors.text, fontSize: 28, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
      input: { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: 10, padding: 12, color: colors.text, marginBottom: 12 },
      button: { backgroundColor: colors.primary, padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
      buttonText: { color: colors.onPrimary, fontWeight: '600' },
      linkRow: { marginTop: 14, flexDirection: 'row', justifyContent: 'center' },
      linkText: { color: colors.textMuted },
      linkBtn: { marginLeft: 6 },
      linkBtnText: { color: colors.primary, fontWeight: '700' },
    })
  );

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleRegister() {
    if (!nome || !email || !senha) return Alert.alert(t('errors.obrigatorio'));
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), senha);
      await updateProfile(cred.user, { displayName: nome.trim() });
      await notifyRegisterSuccess();
    } catch (e) {
      console.error('register error', e);
      Alert.alert(authErrorMessage(e, t));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('auth.criarConta')}</Text>

      <TextInput placeholder={t('auth.nome')} value={nome} onChangeText={setNome} style={styles.input} placeholderTextColor="#999" />
      <TextInput placeholder={t('auth.email')} value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" placeholderTextColor="#999" />
      <TextInput placeholder={t('auth.senha')} value={senha} onChangeText={setSenha} style={styles.input} secureTextEntry placeholderTextColor="#999" />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>{t('auth.cadastrar')}</Text>
      </TouchableOpacity>

      <View style={styles.linkRow}>
        <Text style={styles.linkText}>{t('auth.jaPossui')}</Text>
        <TouchableOpacity style={styles.linkBtn} onPress={() => nav.navigate('Login')}>
          <Text style={styles.linkBtnText}>{t('auth.login')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
