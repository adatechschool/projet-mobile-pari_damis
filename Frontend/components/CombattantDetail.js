import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
//const {width, height} = Dimensions.get('window') //detection dela dimension ecran

const Detail = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.ImagePath }}
        style={{ width: 200, height: 200}}
      />
      <Text style={styles.title}>{item.NomCombattant}</Text>
      {/* <View style={{ right: 100, marginLeft: 10 }}>
        <Text style={styles.text}>{item.text}</Text>
      </View> */}
    </View>
  );
};
const toto = [{ tup: "de" }, { tup: "de" }, { tup: "de" }];
export default Detail;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "black",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    height:"100%",
  },
  title: {
    textAlign: "center",
    color: "red",
    marginTop: 50,
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "white",
    marginTop: 50,
    fontSize: 20,
    height: "55%",
  },
});
