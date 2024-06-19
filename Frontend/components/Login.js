import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import  {IP}  from '@env';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFormik } from "formik";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
} from "react-native";




const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Login = ({ navigation }) => {
  console.log("test ip", IP);

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
      Device: "",
      Os: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.Email) {
        errors.Email = "Veuillez entrer votre adresse e-mail";
      }
      if (!values.Password) {
        errors.Password = "Veuillez entrer votre mot de passe";
      }
      return errors;
    },

    onSubmit: async (values) => {
      try {
        const apiUrl = `http://${IP}:3001/auth/login`;

        console.log(
          "log 1",
          Platform.isPad
            ? "TABLET"
            : "MOBILEPHONE"
        );
        console.log("log 2", Platform.OS);

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: values.Email.toLowerCase(),
            Password: values.Password,
            Device:
              Platform.isPad || Platform.isPad == "undefined"
                ? "TABLET"
                : "MOBILEPHONE",
            Os: Platform.OS.toUpperCase(),
          }),
        });

        if (!response.ok) {
          throw new Error(`Erreur de réseau (statut ${response.status})`);
        }

        const responseData = await response.json();
        console.log("Données envoyées avec succès", responseData);
        formik.resetForm();
        navigation.navigate("PageConfirmation", responseData);
        // Alert.alert("vous êtes connecté");
      } catch (error) {
        console.error("Erreur lors de l'envoi des données", error.message);
      }
    },

    // onSubmit: (values) => {
    //   if (Object.keys(formik.errors).length === 0) {
    //     console.log("Soumis", values.Email, values.Password);
    //     formik.resetForm();
    //     navigation.navigate("MyTabs");
    //   }
    // },
  });
  const onPress = () => {
    formik.handleSubmit();
  };


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <View>
        <Text style={styles.Login}>Login</Text>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.form}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.Email}
          placeholder="Email"
          placeholderTextColor="gray"
          value={formik.values.Email}
          onChangeText={formik.handleChange("Email")}
        />
        <Text style={{ color: "red" }}>{formik.errors.Email}</Text>

        <TextInput
          style={styles.MotDePasse}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          value={formik.values.Password}
          onChangeText={formik.handleChange("Password")}
        />
        </View>
        <Text style={{ color: "red" }}>{formik.errors.Password}</Text>

        <TouchableOpacity style={styles.customButton} onPress={onPress}>
          <Text style={styles.buttonText}>SE CONNECTER</Text>
        </TouchableOpacity>
        
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "white" }}>Vous n'avez pas de compte ?</Text>
          <Button
            title="S'inscrire"
            color="red"
            titleStyle={{ textAlignVertical: "center" }}
            onPress={() => navigation.navigate("Signup")}
          />
        </View>
        
        <View style={{ marginVertical: 10 }}>
          <Text style={{ color: "red" }}>Mot de passe oublié</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  Login: {
    color: "white",
    bottom: 100,
    fontSize: 30,
    padding: 5,
    margin: 5,
    fontWeight: "800",
    textAlign: "center",
    top: 150,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    gap: 20,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  Email: {
    borderWidth: 1,
    borderBottomColor: "white",
    padding: 10,
    margin: 5,
    width: windowWidth * 0.9,
    height: windowHeight * 0.06,
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  MotDePasse: {
    borderWidth: 1,
    borderBottomColor: "white",
    padding: 10,
    margin: 5,
    width: windowWidth * 0.9,
    height: windowHeight * 0.06,
    color: "white",
    fontSize: 20,
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
});
