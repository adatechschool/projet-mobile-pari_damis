import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Home = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <View>
          <Text style={styles.inscription}>Inscription</Text>
        </View>
          <TouchableOpacity style={styles.customButton} onPress={() => {}}>
            <Text style={styles.buttonText}>Go to page Incription</Text>
          </TouchableOpacity>
          <Text style={{ color: "white", marginTop: 10 }}>
            Vous avez déjà un compte ?&nbsp;&nbsp;
            <Text style={{ color: "red" }} onPress={() => {}}>
              Se connecter
            </Text>
          </Text>
        </View>
    );
  };
  
  
  export default Home;