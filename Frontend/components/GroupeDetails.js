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
} from "react-native";

const GroupDetail = ({ route }) => {
  const userId = 2;
  const group = route.params;

  const [groups, setGroups] = useState([]);
  const [searchedMember, setSearchedMember] = useState("");
  const [inviteeName, setInviteeName] = useState("");
  const [allUsers, setAllUsers] = useState("");
  const [GroupID, setGroupId] = useState("");

  const useEffect = async () => {
    const response = await fetch(`http://${IP}:3001/user/allUsers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setAllUsers = await response.json();
  };
  [];

  console.log("??",group);

  const inviteMember = async (GroupID, UserID) => {
    try {
      const response = await fetch(
        `http://${IP}:3001/group/addUserToGroup/${GroupID}/${UserID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Firstname: searchedMember,
            Pseudo: inviteeName,
          }),
        }
      );

      const searchMember = () => {
        allUsers.forEach((element) => {
          if (element == searchedMember) {
            return element.id;
          }
        });
      };

      if (!response.ok) {
        throw new Error(
          `Erreur lors de l'invitation du membre (statut ${response.status})`
        );
      }

      const updatedGroups = groupData.map((group) =>
        group.id === GroupID
          ? {
              ...group,
              members: [...group.members, { id: UserID, Pseudo: inviteeName }],
            }
          : group
      );

      setGroups(updatedGroups);
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
        `http://${IP}:3001/group/deleteOneGroup/${groupDelete}/${userId}`,
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
        onPress={() => inviteMember(GroupID, UserID)}
      >
        <Text style={{ paddingTop: 10, fontSize: 20 }}>Inviter le membre</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GroupDetail;
const styles = StyleSheet.create({});
