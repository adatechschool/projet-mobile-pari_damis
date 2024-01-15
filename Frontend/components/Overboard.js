import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Image style={styles.flamme} source={require("../assets/fire.gif")} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.title}>Pari d'Amis</Text>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* Votre composant carroussel */}
         
        
          <View style={{ flexDirection: "row", top: 200 }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "red",
                marginRight: 10,
              }}
            />
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "red",
                marginRight: 10,
              }}
            />
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "red",
              }}
            />
          </View>
        </View>
        <Image style={styles.flamme2} source={require("../assets/fire.gif")} />
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
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.buttonText}>S’INSCRIRE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "red", paddingTop: 10 }}>SE CONNECTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  flamme: {
    width: 200,
    height: 200,
    right: 50,
    transform: [{ rotate: "180deg" }],
  },
  flamme2: {
    width: 200,
    height: 200,
    top: 100,
    left: 100,
  },
  title: {
    color: "red",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    bottom: 150,
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
});
