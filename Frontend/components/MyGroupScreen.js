import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";

// const GroupDetailsScreen = ({ route }) => {
//   const { group } = route.params;

//   return (
//     <View>
//       <Text>Nom du groupe : {group.name}</Text>
//       <Text>Membres :</Text>
//       {group.members.map((member) => (
//         <View key={member.id}>
//           <Text>{member.name}</Text>
//           {/* Ajoutez d'autres détails du membre si nécessaire */}
//         </View>
//       ))}
//     </View>
//   );
// };

const MyGroupScreen = ({ navigation }) => {
  // const [searchedMember, setSearchedMember] = useState("");
  const [newGroupId, setNewGroupId] = useState("");
  const [groupData, setGroupData] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [numberOfMembers, setNumberOfMembers] = useState("");

  const [GroupID, setGroupId] = useState("");
  const [UserID, setUserID] = useState("");
  const [allgroupsOfUser, setAllGroupsOfUser] = useState({});
  const userId = 2;

  useEffect(() => {
    const requestGroup = async () => {
      let requete = await axios.get(
        `http://localhost:3001/user/groupsOfOneUser/${userId}`
      );
      console.log(requete.data);
      if (requete.data) setAllGroupsOfUser(requete.data.UserGroup);
    };
    requestGroup();
  }, []);
  console.log(allgroupsOfUser);

  const createGroupAndNavigate = async () => {
    const membersCount = parseInt(numberOfMembers, 10);

    if (isNaN(membersCount) || membersCount <= 0) {
      alert("Veuillez entrer un nombre de membres valide.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/group/createGroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: groupName,
          LimitMembers: membersCount,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Erreur lors de la création du groupe (statut ${response.status})`
        );
      }

      const newGroup = await response.json();
      console.log("Nouveau groupe:", newGroup);

      setNewGroupId(newGroup.groupId);

      setGroupData((prevGroups) => [...prevGroups, newGroup]);
      await inviteMember(newGroup.id);
    } catch (error) {
      console.error("Erreur lors de la création du groupe", error);
    }

    try {
      // Créer un nouveau groupe côté client

      // Mettre à jour la liste des groupes côté client
      setGroupData([...groupData, GroupID]);
    } catch (error) {
      console.error("Erreur lors de la création du groupe côté client", error);
    }
  };

  const deleteGroup = async (newGroupId) => {
    try {
      console.log("newGroupId avant la requête :", newGroupId);

      const response = await fetch(
        `http://localhost:3001/group/deleteOneGroup/${newGroupId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Réponse du serveur:", response.status);

      if (!response.ok) {
        throw new Error(
          `Erreur lors de la suppression du groupe (statut ${response.status})`
        );
      }

      const updatedGroups = allgroupsOfUser.filter(
        (group) => group.id !== newGroupId
      );
      console.log("Group supprimé avec succès");

      setAllGroupsOfUser(updatedGroups);
    } catch (error) {
      console.error("Erreur lors de la suppression du groupe", error);
    }
  };

  const viewGroupDetails = (group) => {
    navigation.navigate("Groupe2", { group });
  };
  const renderItem = ({ item }) => (
    <View style={{ flex: 1,alignItems:"center",justifyContent:"center" }}>
      {/* <Button title="Supprimer" onPress={() => deleteGroup(newGroupId)} /> */}
      <TouchableOpacity
          style={styles.detailcCustomButton}
          onPress={() => viewGroupDetails(item)}
        >
          <Text style={styles.detailButtonText}>Voir les détails</Text>
        </TouchableOpacity>
      {/* <Button title="Voir les détails" onPress={() => viewGroupDetails(item)} /> */}
    </View>
  );
  return (
    <View style={{ flex:1 }}>
      <View style={{ flexDirection: "colum" }}>
        <Text style={{fontSize:15,paddingTop:10}}>Nom du groupe :</Text>
        <TextInput style={{fontSize:15}}
          placeholder="Entrez le nom du groupe"
          value={groupName}
          onChangeText={setGroupName}
        />
        <Text style={{fontSize:15,paddingTop:10}}>Nombre de membres :</Text>
        <TextInput style={{fontSize:15}}
          placeholder="Entrez le nombre de membres"
          value={numberOfMembers}
          onChangeText={setNumberOfMembers}
          keyboardType="numeric"
        />
        {/* <Button style={{magintop:10}} title="Créer le groupe" onPress={createGroupAndNavigate} /> */}
        <TouchableOpacity
          style={styles.customButton}
          onPress={createGroupAndNavigate}
        >
          <Text style={styles.buttonText}>Créer le groupe</Text>
        </TouchableOpacity>
      
      <FlatList
        data={groupData}
        keyExtractor={(item) => (item.id ? item.id.toString() : null)}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
      </View>
      <FlatList
        data={groupData}
        keyExtractor={(item) => (item.id ? item.id.toString() : null)}
        renderItem={renderItem}
      />

      {allgroupsOfUser[0] &&
        allgroupsOfUser.map((group) => (
          <View key={group.ID}>
            <Text>{group.Name}</Text>
            <Text>{group.LimitMembers}</Text>
            <TouchableOpacity
          style={styles.detailcCustomButton}
          onPress={() => deleteGroup(group.ID)}
        >
          <Text 
          // style={styles.detailButtonText}
          >Supprimer</Text>
        </TouchableOpacity>
            {/* <Button title="Supprimer" onPress={() => deleteGroup(group.ID)}>
           
              Supprimer
            </Button> */}
          </View>
        ))}
    </View>
  );
};

export default MyGroupScreen;
const styles = StyleSheet.create({
  detailcCustomButton:{

    backgroundColor: "red",
    padding: 5,
    margin: 5,
    marginTop: 20,
    borderRadius: 8,
    width: "40%",
    bottom: 10,
    left:50
  
  },
  detailButtonText:{
    color: "white",
    fontWeight: "700",
    alignItems: "center",
    textAlign: "center",
    fontSize: 15,
  },
  customButton: {
    // borderBottomColor: "red",
    backgroundColor: "red",
    padding: 5,
    margin: 5,
    marginTop: 20,
    borderRadius: 8,
    width: "40%",
    bottom: 70,
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
