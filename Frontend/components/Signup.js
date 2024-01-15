import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFormik } from "formik";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  StatusBar
} from "react-native";

const Signup = ({ navigation }) => {
  const formik = useFormik({
    initialValues: {
      pseudo:"",
      email: "",
      MotDePasse: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.pseudo) {
        errors.pseudo = "Veuillez entrer votre pseudo";
      }
      if (!values.email) {
        errors.email = "Veuillez entrer votre adresse e-mail";
      }
      if (!values.MotDePasse) {
        errors.MotDePasse = "Veuillez entrer votre mot de passe";
      }
      return errors;
    },
    onSubmit: (values) => {
      if (Object.keys(formik.errors).length === 0) {
        console.log("Soumis",values.pseudo, values.email, values.MotDePasse);
        formik.resetForm();
        navigation.navigate("Login");
      }
    },
  });
  const onPress = () => {
    formik.handleSubmit();
  };


  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar 
        hidden="Visible"
      />
      <View>
        <Text style={styles.inscription}>Inscription</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.text}
          placeholder="Pseudo"
          placeholderTextColor="gray"
          value={formik.values.pseudo}
          onChangeText={formik.handleChange("pseudo")}
        />
        <Text style={{ color: "red"}}>
          {formik.errors.pseudo}
        </Text>
        <TextInput
          style={styles.text}
          placeholder="Email adress"
          placeholderTextColor="gray"
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
        />
        <Text style={{ color: "red"}}>
          {formik.errors.email}
        </Text>
        <TextInput
          style={styles.text}
          placeholder="Mot de passe"
          placeholderTextColor="gray"
          secureTextEntry={true}
          value={formik.values.MotDePasse}
          onChangeText={formik.handleChange("MotDePasse")}
        />
        <Text style={{ color: "red"}}>
          {formik.errors.pseudo}
        </Text>
        <TouchableOpacity style={styles.customButton} onPress={onPress}>
          <Text style={styles.buttonText}>INSCRIPTION</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>
            Vous avez déjà un compte ?&nbsp;&nbsp;
          </Text>
          <Button
            title="Se connecter"
            color="red"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
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

    width: "100%",
    gap: 20,
  },
  text: {
    borderWidth: 1,
    borderBottomColor: "white",
    padding: 10,
    margin: 5,
    width: "90%",
    height: 50,
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
