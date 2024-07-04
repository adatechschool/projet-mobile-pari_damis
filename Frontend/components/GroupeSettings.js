import React, { useEffect, useState } from "react";
import { IP } from '@env';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const GroupeSettings = ({ route, user }) => {
  const userId = user.user.ID;
  const group = route.params;
  const groupId = route.params.ID;
  const [groups, setGroups] = useState([]);
  const [searchedMember, setSearchedMember] = useState("");
  const [inviteeName, setInviteeName] = useState("");
  const [allUsers, setAllUsers] = useState("");
  const [GroupID, setGroupId] = useState("");
  const [userToAddId, setUserToAddId] = useState("");

  useEffect(() => {
    const fetchAllUsers = () => {
      fetch(`http://${IP}:3001/user/allUsers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
      .then(json => setAllUsers(json.message));
    };
    
    fetchAllUsers();
  },[]);


  const searchMember = () => {
    allUsers.forEach((user) => {
      if (user.Firstname == searchedMember) {
        inviteMember(user.ID);
        return user.id;
      }
    });
  };

  const inviteMember = async (userToAddId) => {
    try {
      const response = await fetch(
        `http://${IP}:3001/group/addUserToGroup/${groupId}/${userToAddId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Erreur lors de l'invitation du membre (statut ${response.status})`
        );
      }
      if(response.status === 200){
        Alert.alert("User bien ajouté au groupe");
      }
      setInviteeName("");
      setSearchedMember("");
    } catch (error) {
      console.error("Erreur lors de l'invitation du membre", error);
    }
  };

  const deleteGroup = async (groupDelete) => {
    try {
      console.log("groupDelete avant la requête :", groupDelete);

      const response = await fetch(
        `http://172.20.10.3:3001/group/deleteOneGroup/${groupDelete}/${userId}`,
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
    } catch (error) {
      console.error("Erreur lors de la suppression du groupe", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, textAlign: "center", top: 50 }}>
        Nom du groupe
      </Text>
      <Button title="Supprimer" onPress={() => deleteGroup(group.ID)} />

      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <View>
            <Text>Nombre de membres : {item.LimitMembers}</Text>
            <Text>Membres :</Text>
            <FlatList
              data={item.Users}
              keyExtractor={(user) => user.id.toString()}
              renderItem={({ item: user }) => (
                <View>
                  <Text>{user.Pseudo}</Text>
                </View>
              )}
            />
          </View>
        )}
      />

      <Text style={{ bottom: 100, fontSize: 20 }}>
        Rechercher un membre et l'inviter :
      </Text>
      <TextInput
        style={{ bottom: 100, fontSize: 15, paddingTop: 10 }}
        placeholder="Nom du membre à rechercher"
        value={searchedMember}
        onChangeText={setSearchedMember}
      />
      <TextInput
        style={{ bottom: 100, fontSize: 15 }}
        placeholder="Nom du membre à inviter"
        value={inviteeName}
        onChangeText={setInviteeName}
      />
      <TouchableOpacity
        style={{ bottom: 100, fontSize: 100 }}
        onPress={() => searchMember()}
      >
        <Text style={{ paddingTop: 10, fontSize: 20 }}>Inviter le membre</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GroupeSettings;
const styles = StyleSheet.create({});
