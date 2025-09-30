import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useThemedStyles } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const W = Dimensions.get('window').width;

export default function Home() {
  const { t } = useLanguage();

  const styles = useThemedStyles(({ colors }) =>
    StyleSheet.create({
      root: { flex: 1, backgroundColor: colors.background },
      contentContainer: {
        minHeight: '100%',
        justifyContent: 'space-between',
      },

      contentTop: { paddingHorizontal: 16, paddingBottom: 16 },
      hero: {
        width: W,
        height: 70,
        alignSelf: 'center',
        resizeMode: 'cover',
      },

      bubble: {
        marginTop: 16,
        backgroundColor: colors.card,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        paddingVertical: 18,
        paddingHorizontal: 16,
      },

      bubbleTitle: { 
        color: colors.text,
        fontSize: 24,
          ontWeight: '800' 
      },

      twoCols: {
        marginTop: 16, 
        flexDirection: 'row' 
      },
      col: { 
        flex: 1, 
        paddingRight: 10 
      },
      colRight: {
        flex: 1, 
        paddingLeft: 10 
      },
      paragraph: {
        color: colors.text,
        fontSize: 18,
        lineHeight: 20 
      },

      smallImg: {
        width: 70,
        height: 70,
        alignSelf: 'flex-end',
      },

      bigPanel: {
        marginHorizontal: -16,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderColor: colors.border,
        paddingVertical: 18,
        paddingHorizontal: 16,
      },

      bigRow: { 
        flexDirection: 'row', 
        alignItems: 'center' 
      },

      polaroid: {
        width: W * 0.44,
        borderRadius: 14,
        overflow: 'hidden',
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
      },
      
      polaroidImg: { width: '100%', height: W * 0.5 * 0.99, resizeMode: 'cover' },
      polaroidButton: {
        marginTop: 8,
        alignSelf: 'center',
        marginBottom: 10,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: colors.primary,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.primary,
      },
      polaroidButtonText: { color: colors.onPrimary, fontWeight: '800', fontSize: 16 },

      bigRight: { flex: 1, paddingLeft: 16 },
      bigTitle: { color: colors.text, fontSize: 26, lineHeight: 24, fontWeight: '700' },
    })
  );

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.contentContainer}>
      <View style={styles.contentTop}>
        <Image source={require('../../img/elyTitle.jpg')} style={styles.hero} />

        <View style={styles.bubble}>
          <Text style={styles.bubbleTitle}>{t('home.subtitulo')}</Text>
        </View>

        <View style={styles.twoCols}>
          <View style={styles.col}>
            <Text style={styles.paragraph}>{t('home.paragrafoL')}</Text>
          </View>
          <View style={styles.colRight}>
            <Text style={styles.paragraph}>{t('home.paragrafoR')}</Text>
          </View>
        </View>

        <Image source={require('../../img/imgHome1.jpg')} style={styles.smallImg} />
      </View>

      <View style={styles.bigPanel}>
        <View style={styles.bigRow}>
          <View style={styles.polaroid}>
            <Image source={require('../../img/imgHome2.jpg')} style={styles.polaroidImg} />
            <View style={styles.polaroidButton}>
              <Text style={styles.polaroidButtonText}>{t('home.escalavel')}</Text>
            </View>
          </View>

          <View style={styles.bigRight}>
            <Text style={styles.bigTitle}>{t('home.gestaoInteligente')}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
