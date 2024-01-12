import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";

const Signup = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View>
        <Text style={styles.inscription}>Inscription</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.text}
          placeholder="Pseudo"
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.text}
          placeholder="Email"
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.text}
          placeholder="Mot de passe"
          placeholderTextColor="gray"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.customButton} onPress={() => {}}>
          <Text style={styles.buttonText}>INSCRIPTION</Text>
        </TouchableOpacity>
        <Text style={{ color: "white", marginTop: 10 }}>
          Vous avez déjà un compte ?&nbsp;&nbsp;
          {/* <Text
            style={{ color: "red" }}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            Se connecter
          </Text> */}
            <Button
        title="Se connecter"
        color="red"
        onPress={() => navigation.navigate('Login')}
      />
        </Text>
      </View>
    </View>
  );
};

export default Signup;


const styles = StyleSheet.create({
  inscription: {
    color: "white",
    top: 70,
    fontSize: 30,
    padding: 5,
    margin: 5,
    fontWeight: "800",
    textAlign: "center",
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
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    bottom: 100,
    width: "100%",
  },
  text: {
    borderWidth: 1,
    borderBottomColor: "white",
    padding: 10,
    margin: 5,
    width: "90%",
    height: 50,
    color: "white",
    fontSize: "20px",
    textAlign: "center",
  },
});
