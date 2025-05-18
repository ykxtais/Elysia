import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function Diferenciais() {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={require('../img/dife.jpg')} style={styles.imgDife} />
        <Text style={styles.title}>Diferenciais</Text>
      </View>

      <View style={styles.difer}>
        <Text style={styles.h1}>Porque Elysia é única</Text>
        <Text style={styles.text}>
          Elysia redefine a gestão de pátios com uma abordagem inteligente, aliando algoritmos de visão computacional
          e dispositivos IoT. {`\n`} Com essa integração, é possível detectar, localizar e controlar a frota com uma precisão
          antes inimaginável. A tecnologia deixa de ser apenas um suporte e passa a ser protagonista na tomada de decisões.
        </Text>
      </View>

      <View style={styles.difeSection}>
        <Image source={require('../img/dife1.jpg')} style={styles.sideImage} />
        <Text style={styles.sideText}>
          Ao automatizar a identificação de motos e o controle de vagas, a plataforma reduz o retrabalho,
          minimiza erros e garante uma rotina mais fluida, mesmo em momentos de pico.
        </Text>
      </View>

      <View style={styles.greenBox}>
        <Text style={styles.textBox}>
          Nossa solução oferece eficiência operacional. Elysia é escalável e adaptável. {`\n`}
          Seja em pátios compactos ou em grandes filiais, sua arquitetura garante a mesma qualidade
          de controle e análise, sem comprometer o desempenho.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191c1a',
  },
  imgDife: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    position: 'absolute',
    top: 80,
    left: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  h1: {
  fontSize: 22,
  fontStyle: 'italic',
  fontWeight: 'bold',
  color: '#17d117',
  marginBottom: 10,
  },
  difer: {
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
  },
  difeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  sideImage: {
    width: 120,
    height: 120,
    borderRadius: 6,
    marginRight: 15,
  },
  sideText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingRight: 10,
  },
  greenBox: {
    backgroundColor: '#154015',
    margin: 20,
    padding: 20,
    borderRadius: 8,
  },
  textBox: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
  },
});