import { View, Text, ImageBackground, StyleSheet, ScrollView, Image } from 'react-native';

export default function Home() {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../img/moun.jpg')}
        style={styles.img}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Elysia</Text>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.subTitle}>
          Sobre
        </Text>

        <View style={styles.columns}>
          <View style={styles.column}>
            <Text style={styles.text}>
              Lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem
            </Text>
            <Image
              source={require('../img/fototeste.jpg')}
              style={styles.imgAdit}
              resizeMode="cover"
            />
          </View>

          <View style={styles.column}>
            <Text style={styles.text}>
              Lorem
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
    backgroundColor: '#f6fafd',
  },
  img: {
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
    color: '#103a57',
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
    color: '#333',
    lineHeight: 22,
  },
  imgAdit: {
    width: '100%',
    height: 120,
    marginTop: 12,
    borderRadius: 8,
  },
});