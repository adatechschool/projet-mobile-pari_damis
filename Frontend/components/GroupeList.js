import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { IP } from '@env';

const MyGroupScreen = ({ navigation }) => {
  const [allgroupsOfUser, setAllGroupsOfUser] = useState([]);
  const userId = 2;

  useFocusEffect(
    React.useCallback(() => {
      const requestGroup = async () => {
        let requete = await axios.get(
          `http://${IP}:3001/user/groupsOfOneUser/${userId}`
        );
        console.log(requete.data);
        if (requete.data) setAllGroupsOfUser(requete.data.UserGroup);
      };
      requestGroup();
    }, [])
  );

  const viewGroupDetails = (group) => {
    navigation.navigate("GroupeDetails", group);
  };

  return (
    <ScrollView> 
    <View
      style={{
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <View style={{ flexDirection: "colum" }}>
        <Text style={{  fontSize: 20, paddingTop: 150, color: "white",fontWeight:"bold" }}>
          Nom du groupe :
        </Text>
      
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate("CreateGroup")}
        >
          <Text style={styles.buttonText}>Créer le groupe</Text>
        </TouchableOpacity>
      </View>

      {allgroupsOfUser?.map((group) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("MyTopTabs", group)}
          key={group.ID}
        >
          <Text style={styles.detailcCustomButton}>{group.Name}</Text>
          <Text style={{ color: "white", fontSize: 20,fontWeight:"bold", marginTop:5, }}>
            {group.LimitMembers}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    </ScrollView>
  );
};

export default MyGroupScreen;
const styles = StyleSheet.create({
  detailcCustomButton: {
    backgroundColor: "red",
    padding: 5,
    marginTop: 20,
    width: "100%",
    color: "white",
    fontSize: 20,
    fontWeight:"bold",
    borderColor: "red",
    borderRadius: 10,
    borderWidth: 1,
    overflow: "hidden",
    textAlign:"center",
  
  },
  detailButtonText: {
    color: "white",
    fontWeight: "700",
    alignItems: "center",
    textAlign: "center",
    fontSize: 15,
   
  },
  customButton: {
   
    backgroundColor: "red",
    padding: 5,
    margin: 5,
    marginTop: 20,
    borderRadius: 8,
    width: "40%",
    bottom: 40,
    left: 220,
    
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    alignItems: "center",
    textAlign: "center",
    fontSize: 15,
    
  },
});
