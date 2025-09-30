import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ScrollView, Dimensions } from 'react-native';
import { useThemedStyles } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const W = Dimensions.get('window').width;

export default function Tecno() {
  const { t } = useLanguage();

  const styles = useThemedStyles(({ colors }) =>
    StyleSheet.create({
      root: { flex: 1, backgroundColor: colors.background },

      hero: { width: W, height: 180, alignSelf: 'center' },

      content: { padding: 16 },

      row: { flexDirection: 'row', alignItems: 'center' },
      leftImg: {
        width: W * 0.4,
        height: W * 0.35,
        borderRadius: 10,

      },
      rightTextWrap: { flex: 1, paddingLeft: 14 },
      rightText: { color: colors.text, fontSize: 17, lineHeight: 22 },

      separatorWrap: { marginTop: 18, marginBottom: 12 },
      separator: {
        height: 10,
        borderRadius: 999,
        backgroundColor: colors.accent ?? colors.secondary 
      },

      twoCols: { flexDirection: 'row', gap: 12, marginTop: 8 },
      col: {
        flex: 1,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 12,
      },
      colText: { color: colors.text, fontSize: 18, lineHeight: 20},
    })
  );

  return (
    <ScrollView style={styles.root}>
      <ImageBackground
        source={require('../../img/tecnoTitle.jpg')}
        style={styles.hero}
        imageStyle={{ resizeMode: 'cover' }}
      />

      <View style={styles.content}>
        <View style={styles.row}>
          <Image
            source={require('../../img/tecnoImg1.jpg')}
            style={styles.leftImg}
          />
          <View style={styles.rightTextWrap}>
            <Text style={styles.rightText}>{t('tecno.paragrafoRImg')}</Text>
          </View>
        </View>

        <View style={styles.separatorWrap}>
          <View style={styles.separator} />
        </View>

        <View style={styles.twoCols}>
          <View style={styles.col}>
            <Text style={styles.colText}>{t('tecno.colunaA')}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.colText}>{t('tecno.colunaB')}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
