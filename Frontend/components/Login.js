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
  KeyboardAvoidingView,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Login = ({ navigation }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      MotDePasse: "",
    },
    validate: (values) => {
      const errors = {};
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
        console.log("Soumis", values.email, values.MotDePasse);
        formik.resetForm();
        navigation.navigate("MyTabs");
      }
    },
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
      <KeyboardAvoidingView behavior="padding" style={styles.form}>
        <TextInput
          style={styles.Email}
          placeholder="Email Address"
          placeholderTextColor="gray"
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
        />

        <Text style={{ color: "red" }}>
          {formik.errors.email}
        </Text>

        <TextInput
          style={styles.MotDePasse}
          placeholder="Mot de passe"
          placeholderTextColor="gray"
          secureTextEntry
          value={formik.values.MotDePasse}
          onChangeText={formik.handleChange("MotDePasse")}
        />

        <Text style={{ color: "red"}}>
          {formik.errors.MotDePasse}
        </Text>

        <TouchableOpacity style={styles.customButton} onPress={onPress}>
          <Text style={styles.buttonText}>SE CONNECTER</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Vous n’avez pas de compte ?</Text>
          <Button
            title="S'inscrire"
            color="red"
            titleStyle={{ textAlignVertical: "center" }}
            onPress={() => navigation.navigate("Signup")}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ color: "red" }}>Mot de passe oublié</Text>
          {/* <Button title="Mot de passe oublié"
        color="red"
       
        titleStyle={{left: 140, bottom: 270 }}
         /> */}
        </View>
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
    top: 70,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    gap: 20,
  },
  Email: {
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
  MotDePasse: {
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
