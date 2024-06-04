import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Swiper from "react-native-swiper";
import { Alert } from "react-native";

const Overboard = ({ navigation }) => {
  const showAlert = (page) => {
    Alert.alert(
      "Avertissement !!!",
      "Jouer comporte des risques : ENDETTEMENT, ISOLEMENT,DÉPENDANCE.  ",

      [
        {
          text: "Accepter",
          onPress: () => navigation.navigate(page),
        },
        { text: "Cancel", onPress: () => navigation.navigate("Overboard") },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Text style={styles.title}>Pari d'Amis</Text>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Swiper
            autoplay
            autoplayTimeout={5} // Définissez le temps en secondes entre chaque diapositive
            showsPagination={false}
            style={{}}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                style={styles.Image}
                source={require("../assets/combat1.jpg")}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={styles.Image}
                source={require("../assets/combat2.jpg")}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={styles.Image}
                source={require("../assets/combat3.jpg")}
              />
            </View>
          </Swiper>
        </View>
      </View>

      <View style={{ paddingBottom: 80 }}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.customButton}
            // onPress={() => navigation.navigate("Signup")}
            onPress={() => showAlert("Signup")}
          >
            <Text style={styles.buttonText}>S’INSCRIRE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showAlert("Login")}>
            {/* onPress={() => navigation.navigate("Login")} */}
            <Text style={{ color: "red", paddingTop: 10 }}>SE CONNECTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Overboard;

const styles = StyleSheet.create({
  title: {
    color: "red",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    // bottom: 150,
  },
  customButton: {
    borderBottomColor: "red",
    backgroundColor: "red",
    padding: 10,
    margin: 5,
    marginTop: 20,
    borderRadius: 8,
    width: "90%",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    alignItems: "center",
    textAlign: "center",
  },
  Image: {
    width: "100%",

    height: 400,

    resizeMode: "cover",
  },
});
