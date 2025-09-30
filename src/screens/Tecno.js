import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function Tecnologia() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.adjTitle}>
        <Text style={styles.title}>Tecnologia</Text>
      </View>

      <View style={styles.tecSection}>
        <Image source={require('../img/tec1.jpg')} style={styles.imgDife} />
        <Text style={styles.text}>
          Utilizamos tecnologias avançadas de visão computacional e IoT para garantir uma gestão precisa e ágil dos pátios. {`\n`}
          Câmeras inteligentes e sensores coletam dados em tempo real, que são processados por nossos algoritmos para
          monitorar a ocupação e a localização de motos com alta confiabilidade.
        </Text>
      </View>

      <Image source={require('../img/capa.jpg')} style={styles.imgCapa} />

      <View style={styles.twoImgsDife}>
        <Image source={require('../img/tec2.jpg')} style={styles.twoImgsTecs} />
        <Image source={require('../img/tec3.jpg')} style={styles.twoImgsTecs} />
      </View>

      <Text style={styles.textBottom}>
        Essa tecnologia permite detectar automaticamente a ocupação das vagas, localizar motos e fornecer uma visão
        clara do pátio. {`\n`}Adaptável e escalável, ela acompanha o crescimento da operação sem comprometer o desempenho.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  adjTitle: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
     fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#17d117',
  },
  tecSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  imgDife: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginRight: 15,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    lineHeight: 20,
  },
  imgCapa: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  twoImgsDife: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  twoImgsTecs: {
    width: '48%',
    height: 140,
    borderRadius: 8,
  },
  textBottom: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'justify',
    marginTop: 10,
  },
});
