import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useThemedStyles } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const INITIAL_REGION = {
  latitude: -23.5629,
  longitude: -46.6544,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

export default function Mapa() {
  const mapRef = useRef(null);
  const { t } = useLanguage();

  const [uid, setUid] = useState(auth.currentUser?.uid ?? null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUid(u?.uid ?? null));
    return unsub;
  }, []);
  const STORAGE_KEY = useMemo(() => (uid ? `@elysia/map_marks/${uid}` : null), [uid]);

  const [marks, setMarks] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);

  const styles = useThemedStyles(({ colors }) =>
    StyleSheet.create({
      container: { flex: 1, backgroundColor: colors.background },
      map: { flex: 1 },
      panel: {
        position: 'absolute', left: 0, right: 0, bottom: 0,
        backgroundColor: colors.card, borderTopLeftRadius: 16, borderTopRightRadius: 16,
        borderTopWidth: 1, borderColor: colors.border,
      },
      panelClosed: { height: 56 },
      panelOpen: { maxHeight: '55%' },
      panelHeader: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingVertical: 12
      },
      panelTitle: { color: colors.text, fontWeight: '800', fontSize: 16 },
      panelToggle: { color: colors.primary, fontWeight: '800' },
      list: { paddingHorizontal: 16, paddingBottom: 12 },
      item: {
        paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
      },
      itemTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
      itemCoords: { color: colors.textMuted, fontSize: 12 },
      emptyText: { color: colors.textMuted, fontSize: 14, paddingHorizontal: 16, paddingBottom: 10 },
      rowActions: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingBottom: 12 },
      clearBtn: { backgroundColor: colors.primary, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 },
      clearBtnText: { color: colors.onPrimary, fontWeight: '800', fontSize: 12 },
    })
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!STORAGE_KEY) { setMarks([]); return; }
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled) {
          const arr = raw ? JSON.parse(raw) : [];
          setMarks(Array.isArray(arr) ? arr : []);
          if (arr?.length) setPanelOpen(true);
        }
      } catch {
        if (!cancelled) setMarks([]);
      }
    })();
    return () => { cancelled = true; };
  }, [STORAGE_KEY]);

  useEffect(() => {
    if (!STORAGE_KEY) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(marks)).catch(() => {});
  }, [marks, STORAGE_KEY]);

  const nextId = useMemo(() => (marks.length ? Math.max(...marks.map(m => m.id)) + 1 : 1), [marks]);
  const nextTitle = useCallback(n => `${t('mapa.marcacao')} ${n}`, [t]);

  const onMapPress = useCallback((e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarks(prev => [...prev, { id: nextId, title: nextTitle(nextId), lat: latitude, lng: longitude }]);
    setPanelOpen(true);
  }, [nextId, nextTitle]);

  const focusOn = useCallback((m) => {
    mapRef.current?.animateToRegion(
      { latitude: m.lat, longitude: m.lng, latitudeDelta: 0.008, longitudeDelta: 0.008 },
      400
    );
  }, []);

  const clearAll = useCallback(async () => {
    setMarks([]);
    if (STORAGE_KEY) await AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
  }, [STORAGE_KEY]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        loadingEnabled
        toolbarEnabled={false}
        onPress={onMapPress}
      >
        {marks.map((m) => (
          <Marker
            key={m.id}
            coordinate={{ latitude: m.lat, longitude: m.lng }}
            title={m.title}
            pinColor={'#DC4C4C'}
          />
        ))}
      </MapView>

      <View style={[styles.panel, panelOpen ? styles.panelOpen : styles.panelClosed]}>
        <View style={styles.panelHeader}>
          <Text style={styles.panelTitle}>{t('mapa.marcacoes')}</Text>
          <TouchableOpacity onPress={() => setPanelOpen(v => !v)}>
            <Text style={styles.panelToggle}>{panelOpen ? t('mapa.fechar') : t('mapa.abrir')}</Text>
          </TouchableOpacity>
        </View>

        {panelOpen && (
          <>
            {marks.length === 0 ? (
              <Text style={styles.emptyText}>{t('mapa.toqueParaAdicionar')}</Text>
            ) : (
              <FlatList
                style={styles.list}
                data={marks}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.item} onPress={() => focusOn(item)}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemCoords}>
                      {item.lat.toFixed(5)}, {item.lng.toFixed(5)}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}

            {marks.length > 0 && (
              <View style={styles.rowActions}>
                <TouchableOpacity style={styles.clearBtn} onPress={clearAll}>
                  <Text style={styles.clearBtnText}>{t('mapa.limpar')}</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
}
