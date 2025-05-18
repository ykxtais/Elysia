import { View, Text, StyleSheet, Image } from 'react-native';

export default function Integr() {
  return (
    <View style={styles.container}>
      <View style={styles.integrColumn}>
        <View style={styles.imgAlign}>
          <Image source={require('../img/1.jpg')} style={styles.imgIntegr} />
          <Text style={styles.name}>Taís</Text>
        </View>
        <View style={styles.imgAlign}>
          <Image source={require('../img/2.jpg')} style={styles.imgIntegr} />
          <Text style={styles.name}>Iris</Text>
        </View>
        <Image source={require('../img/moto.jpg')} style={styles.imgMoto} />
      </View>

      <View style={styles.textColumn}>
        <Image source={require('../img/fundo.jpg')} style={styles.imgBack} />
        <View style={styles.overlay}>
          <Text style={styles.textTeam}>
            Somos a equipe por trás da Elysia — comprometida em entregar soluções inteligentes.
            Cada integrante traz uma expertise única, unindo conhecimento em visão computacional,
            desenvolvimento de software e análise de dados para tornar a Elysia uma plataforma eficiente.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  integrColumn: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    justifyContent: 'flex-start',
  },
  textColumn: {
    flex: 2,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBack: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imgAlign: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imgIntegr: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  name: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#17d117',
    textAlign: 'center',
  },
  imgMoto: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginTop: 20,
  },
  textTeam: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 25,
  },
});