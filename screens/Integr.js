import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

export default function Integr() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.imgSide}>
          <View style={styles.imgAlign}>
            <Image source={require("../img/1.jpg")} style={styles.imgIntegr} />
            <Text style={styles.name}>Taís</Text>
          </View>
          <View style={styles.imgAlign}>
            <Image source={require("../img/2.jpg")} style={styles.imgIntegr} />
            <Text style={styles.name}>Iris</Text>
          </View>
        </View>

        <Image source={require("../img/div.jpg")} style={styles.divider} />

        <View style={styles.centralized}>
          <Text style={styles.textTeam}>
            Somos a equipe por trás de Elysia
          </Text>
        </View>
      </ScrollView>

      <Image source={require("../img/flores.jpg")} style={styles.imgFlowers} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6fafd",
  },
  scrollContent: {
    paddingBottom: 200,
  },
  imgSide: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 30,
  },
  imgAlign: {
    alignItems: "center",
  },
  imgIntegr: {
    width: 140,
    height: 140,
    borderRadius: 5,
    marginBottom: 8,
  },
  name: {
    color: "#103a57",
    marginTop: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  divider: {
    width: "100%",
    height: 45,
    resizeMode: "cover",
    marginVertical: 30,
  },
  centralized: {
    alignItems: "center",
    paddingHorizontal: 30,
  },
  textTeam: {
    color: "#333",
    fontSize: 18,
    textAlign: "center",
  },
  imgFlowers: {
    width: 420,
    height: 200,
    resizeMode: "cover",
  },
});
