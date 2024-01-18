import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { SearchBar } from "react-native-elements";
//const {width, height} = Dimensions.get('window') //detection dela dimension ecran

const DATA = [
  {
    id: "1",
    title: "Data Structures",
    image: require("../assets/icon.png"),
    text: "lotemor3bu",
  },
  {
    id: "2",
    title: "STL",
    image: require("../assets/icon.png"),
    text: "lotemoreeee39gGH",
  },
  {
    id: "3",
    title: "C++",
    image: require("../assets/icon.png"),
    text: "lotemsrerror398àç",
  },
  {
    id: "4",
    title: "Java",
    image: require("../assets/icon.png"),
    text: "lotezeezezazamor33è",
  },
  {
    id: "5",
    title: "Python",
    image: require("../assets/icon.png"),
    text: "lotzaazazazemor9380938",
  },
  {
    id: "6",
    title: "CP",
    image: require("../assets/icon.png"),
    text: "lookpopiptemor3367gèg",
  },
  {
    id: "7",
    title: "ReactJs",
    image: require("../assets/icon.png"),
    text: "pokemons",
  },
  {
    id: "8",
    title: "NodeJs",
    image: require("../assets/icon.png"),
    text: "pokemons2",
  },
  {
    id: "9",
    title: "MongoDb",
    image: require("../assets/icon.png"),
    text: "pokemons1",
  },
  {
    id: "10",
    title: "ExpressJs",
    image: require("../assets/icon.png"),
    text: "pokemons30",
  },
  {
    id: "11",
    title: "PHP",
    image: require("../assets/icon.png"),
    text: "pokemonsàer",
  },
  {
    id: "12",
    title: "MySql",
    image: require("../assets/icon.png"),
    text: "pokemons30909",
  },
];

const Item = ({ title, image, onPressItem }) => (
  <TouchableOpacity style={styles.item} onPress={onPressItem}>
    <Image source={image} style={{ width: 80, height: 80 }} />
    <Text
      style={{
        color: "red",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
      }}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: DATA,
      error: null,
      searchValue: "",
    };
    this.arrayholder = DATA;
  }

  searchFunction = (text) => {
    const updatedData = this.arrayholder.filter((item) => {
      const item_data = `${item.title.toUpperCase()}`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    this.setState({ data: updatedData, searchValue: text });
  };

  handleItemPress = (itemId) => {
    const selectedItem = this.arrayholder.find((item) => item.id === itemId);

    this.props.navigation.navigate("Detail", { item: selectedItem });
    console.log(`Item ${itemId} pressé`);
  };

  renderItem = ({ item }) => (
    <Item
      title={item.title}
      image={item.image}
      onPressItem={() => this.handleItemPress(item.id)}
    />
  );
  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="chercher votre combattant..."
          fontSize={25}
          placeholderTextColor="red"
          color="red"
          containerStyle={{ backgroundColor: "black" }}
          backgroundColor="black"
          value={this.state.searchValue}
          onChangeText={(text) => this.searchFunction(text)}
          autoCorrect={false}
        />
        <FlatList
          style={{ height: "100%" }}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

export default Search;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 2,
    backgroundColor: "black",
  },
  item: {
    padding: 10,
    marginHorizontal: 16,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
