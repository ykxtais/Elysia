import { View, Text, ImageBackground, StyleSheet, ScrollView, Image } from 'react-native';

export default function Home() {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../img/inicial.jpg')}
        style={styles.imgHome}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Elysia</Text>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.subTitle}>Inovação</Text>

        <View style={styles.columns}>
          <View style={styles.column}>
            <Text style={styles.text}>
              Com Elysia, você tem acesso a dados em tempo real sobre a ocupação das vagas e a localização das motos. {`\n`}
              Nossa tecnologia de ponta garante agilidade e precisão na gestão dos pátios.
            </Text>
            <Image
              source={require('../img/motohome.jpg')}
              style={styles.imgMotoh}
              resizeMode="cover"
            />
          </View>

          <View style={styles.column}>
            <Text style={styles.text}>
              A Elysia utiliza sensores e visão computacional para capturar dados em tempo real.
              Essa tecnologia permite detectar automaticamente a ocupação das vagas e localizar motos. {`\n`}
              Adaptável e escalável, ela acompanha o crescimento da operação sem comprometer a performance.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#191c1a',
  },
  imgHome: {
    width: '100%',
    height: 220,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 15,
    paddingHorizontal: 17,
  },
  title: {
    fontSize: 33,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  subTitle: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#17d117',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  column: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
  },
  imgMotoh: {
    width: '100%',
    height: 120,
    marginTop: 12,
    borderRadius: 8,
  },
});