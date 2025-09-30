import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { auth } from '../firebase/firebaseConfig';
import {
  updateProfile,
  signOut,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  onAuthStateChanged,
} from 'firebase/auth';

import { useThemedStyles } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const MARKS_KEY_PREFIX = '@elysia/map_marks/';

export default function Perfil() {
  const { t } = useLanguage();

  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => onAuthStateChanged(auth, u => setUser(u)), []);
  const uid = user?.uid ?? 'anon';
  const AVATAR_KEY = useMemo(() => `@elysia/profile/avatarUri/${uid}`, [uid]);

  const [displayName, setDisplayName] = useState(user?.displayName ?? '');
  const [nome, setNome] = useState(user?.displayName ?? '');
  const [email] = useState(user?.email ?? '');
  const [avatarUri, setAvatarUri] = useState(user?.photoURL ?? null);

  const [savingName, setSavingName] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [reauthOpen, setReauthOpen] = useState(false);
  const [reauthPass, setReauthPass] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(AVATAR_KEY);
        if (saved) setAvatarUri(saved);
        else if (user?.photoURL) setAvatarUri(user.photoURL);
      } catch {}
    })();
  }, [AVATAR_KEY, user?.photoURL]);

  const styles = useThemedStyles(({ colors }) =>
    StyleSheet.create({
      root: { flex: 1, backgroundColor: colors.background, padding: 16 },
      photoPanel: {
        marginHorizontal: -16, marginTop: -15,
        backgroundColor: colors.secondary ?? colors.surface,
        paddingVertical: 22, paddingHorizontal: 16,
        borderBottomWidth: 1, borderColor: colors.border, alignItems: 'center',
      },
      avatarFrame: {
        width: 150, height: 150, borderRadius: 75, overflow: 'hidden',
        backgroundColor: colors.card, borderWidth: 2, borderColor: colors.border,
      },
      avatar: { width: '100%', height: '100%' },
      camBtn: {
        position: 'absolute', right: 6, bottom: 6, width: 42, height: 42, borderRadius: 21,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border,
        elevation: 3, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
      },
      nameLabel: { marginTop: 10, color: colors.text, fontWeight: '800', fontSize: 18 },

      card: { marginTop: 16, backgroundColor: colors.surface, borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 16 },
      label: { color: colors.text, fontWeight: '800', marginTop: 8, marginBottom: 6, fontSize: 16 },
      input: {
        borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card,
        borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12, color: colors.text,
      },

      primaryBtn: { marginTop: 10, backgroundColor: colors.primary, padding: 14, borderRadius: 12, alignItems: 'center', marginBottom: 7 },
      primaryText: { color: colors.onPrimary, fontWeight: '800' },
      outlineBtn: { marginTop: 10, borderWidth: 2, borderColor: colors.border, padding: 14, borderRadius: 12, alignItems: 'center' },
      outlineText: { color: colors.text, fontWeight: '800' },
      dangerBtn: { marginTop: 10, backgroundColor: '#DC4C4C', padding: 14, borderRadius: 12, alignItems: 'center' },
      dangerText: { color: '#fff', fontWeight: '800' },

      row: { flexDirection: 'row', gap: 12, marginTop: 10 },
      col: { flex: 1 },

      modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center' },
      modalCard: { width: '86%', backgroundColor: colors.card, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 16 },
      modalTitle: { color: colors.text, fontSize: 16, fontWeight: '800', marginBottom: 8 },
    })
  );

  async function handlePickAvatar() {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') return Alert.alert(t('perfil.permissaoFotos'));
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, aspect: [1, 1], quality: 0.9,
      });
      if (res.canceled) return;
      const uri = res.assets?.[0]?.uri;
      if (!uri) return;

      setAvatarUri(uri);
      await AsyncStorage.setItem(AVATAR_KEY, uri);
      if (auth.currentUser) await updateProfile(auth.currentUser, { photoURL: uri });
      Alert.alert(t('perfil.fotoAtualizada'));
    } catch {
      Alert.alert(t('errors.desconhecido'));
    }
  }

  async function handleSaveName() {
    if (!auth.currentUser) return;
    if (!nome.trim()) return Alert.alert(t('errors.obrigatorio'));
    try {
      setSavingName(true);
      await updateProfile(auth.currentUser, { displayName: nome.trim() });
      setDisplayName(nome.trim());
      Alert.alert(t('perfil.nomeAtualizado'));
    } catch {
      Alert.alert(t('errors.desconhecido'));
    } finally { setSavingName(false); }
  }

  async function handleSignOut() {
    try { await signOut(auth); } catch { Alert.alert(t('errors.desconhecido')); }
  }

  async function handleDeleteAccount() {
    Alert.alert(
      t('perfil.excluirTitulo'),
      t('perfil.excluirMsg'),
      [
        { text: t('perfil.cancelar'), style: 'cancel' },
        {
          text: t('perfil.excluirConfirmar'), style: 'destructive',
          onPress: async () => {
            try {
              setDeleting(true);
              await deleteUser(auth.currentUser);
              await AsyncStorage.multiRemove([AVATAR_KEY, `${MARKS_KEY_PREFIX}${uid}`]).catch(() => {});
              await signOut(auth).catch(() => {});
            } catch (e) {
              if (e?.code === 'auth/requires-recent-login') {
                setReauthOpen(true);
              } else {
                Alert.alert(t('errors.desconhecido'));
              }
            } finally { setDeleting(false); }
          }
        }
      ]
    );
  }

  async function confirmReauth() {
    try {
      const emailAtual = auth.currentUser?.email;
      if (!emailAtual) throw new Error('no-email');
      const cred = EmailAuthProvider.credential(emailAtual, reauthPass);
      await reauthenticateWithCredential(auth.currentUser, cred);
      setReauthOpen(false);
      setReauthPass('');

      await deleteUser(auth.currentUser);
      await AsyncStorage.multiRemove([AVATAR_KEY, `${MARKS_KEY_PREFIX}${uid}`]).catch(() => {});
      await signOut(auth).catch(() => {});
    } catch {
      Alert.alert(t('perfil.requerReautenticacao'));
    }
  }

  return (
    <View style={styles.root}>
      <View style={styles.photoPanel}>
        <View style={{ position: 'relative' }}>
          <View style={styles.avatarFrame}>
            {avatarUri ? <Image source={{ uri: avatarUri }} style={styles.avatar} /> : null}
          </View>
          <TouchableOpacity style={styles.camBtn} onPress={handlePickAvatar} activeOpacity={0.85}>
            <Ionicons name="camera" size={20} color="#6B5C66" />
          </TouchableOpacity>
        </View>
        <Text style={styles.nameLabel}>{displayName || t('perfil.nome')}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>{t('perfil.nome')}</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder={t('perfil.nome')}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.primaryBtn} onPress={handleSaveName} disabled={savingName}>
          <Text style={styles.primaryText}>{savingName ? '...' : t('perfil.salvarNome')}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>{t('perfil.email')}</Text>
        <TextInput
          style={[styles.input, { opacity: 0.8 }]}
          value={email}
          editable={false}
          selectTextOnFocus={false}
        />

        {/* Sair / Excluir */}
        <View style={styles.row}>
          <View style={styles.col}>
            <TouchableOpacity style={styles.outlineBtn} onPress={handleSignOut}>
              <Text style={styles.outlineText}>{t('perfil.sair')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.col}>
            <TouchableOpacity style={styles.dangerBtn} onPress={handleDeleteAccount} disabled={deleting}>
              <Text style={styles.dangerText}>{deleting ? '...' : t('perfil.excluirConta')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal transparent visible={reauthOpen} animationType="fade" onRequestClose={() => setReauthOpen(false)}>
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{t('perfil.informeSenha')}</Text>
            <TextInput
              style={styles.input}
              value={reauthPass}
              onChangeText={setReauthPass}
              secureTextEntry
              placeholder={t('perfil.senhaAtual')}
              placeholderTextColor="#999"
              autoFocus
            />
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
              <TouchableOpacity style={[styles.outlineBtn, { flex: 1 }]} onPress={() => setReauthOpen(false)}>
                <Text style={styles.outlineText}>{t('perfil.cancelar')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.primaryBtn, { flex: 1 }]} onPress={confirmReauth}>
                <Text style={styles.primaryText}>{t('perfil.confirmar')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
