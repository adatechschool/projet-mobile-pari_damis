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
import mainEventImage from '../assets/mainEvents.json';

const Overboard = ({ navigation }) => {
  const showAlert = (page) => {
    Alert.alert(
      "Avertissement !!!",
      "Jouer comporte des risques : ENDETTEMENT, ISOLEMENT,DÉPENDANCE.  ",

      [
        { text: "Cancel", onPress: () => navigation.navigate("Overboard") },
        {
          text: "Accepter",
          onPress: () => navigation.navigate(page),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
                source= {{uri: mainEventImage[mainEventImage.length-1].ImagePath}}
              />
              <Text>
              {mainEventImage[mainEventImage.length-1].Name}
              </Text>
              <Text>
              {mainEventImage[mainEventImage.length-1].Fight}
              </Text>
              <Text>
              {mainEventImage[mainEventImage.length-1].Date}
              </Text>
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
                source= {{uri: mainEventImage[mainEventImage.length-2].ImagePath}}
              />
              <Text>
              {mainEventImage[mainEventImage.length-2].Name}
              </Text>
              <Text>
              {mainEventImage[mainEventImage.length-2].Fight}
              </Text>
              <Text>
              {mainEventImage[mainEventImage.length-2].Date}
              </Text>
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
                source= {{uri: mainEventImage[mainEventImage.length-3].ImagePath}}
                />
                <Text>
              {mainEventImage[mainEventImage.length-3].Name}
              </Text>
              <Text>
              {mainEventImage[mainEventImage.length-3].Fight}
              </Text>
              <Text>
              {mainEventImage[mainEventImage.length-3].Date}
              </Text>
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
            <Text style={{ color: "black", paddingTop: 10 }}>SE CONNECTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Overboard;

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    top: 100,
  },
  customButton: {
    borderBottomColor: "black",
    backgroundColor: "black",
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
