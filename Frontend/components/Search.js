import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { SearchBar } from "react-native-elements";
import allFighters from "../allFighters.json";
//const {width, height} = Dimensions.get('window') //detection dela dimension ecran

const dataWithIds = allFighters.map((fighter, index) => ({
  ...fighter,
  id: index.toString(),
}));

const Item = ({ NomCombattant, ImagePath, onPressItem }) => (
  <TouchableOpacity style={styles.item} onPress={onPressItem}>
    <Image source={{ uri: ImagePath }} style={{ width: 80, height: 80 }} />
    <Text
      style={{
        color: "red",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
      }}
    >
      {NomCombattant}
    </Text>
  </TouchableOpacity>
);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dataWithIds,
      searchValue: "",
    };
    this.arrayholder = dataWithIds;
  }

  searchFunction = (text) => {
    const updatedData = this.arrayholder.filter((item) => {
      const item_data = `${item.NomCombattant.toUpperCase()}`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    this.setState({ data: updatedData, searchValue: text });
  };

  handleItemPress = (itemId) => {
    const selectedItem = this.arrayholder.find((item) => item.id === itemId);
    this.props.navigation.navigate("CombattantDetail", { item: selectedItem });
    console.log(`Item ${itemId} pressé`);
  };

  renderItem = ({ item }) => (
    <Item
      NomCombattant={item.NomCombattant}
      ImagePath={item.ImagePath}
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
    marginTop: 30,
    padding: 2,
    backgroundColor: "black",
    top: 20,
  },
  item: {
    padding: 10,
    marginHorizontal: 16,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
