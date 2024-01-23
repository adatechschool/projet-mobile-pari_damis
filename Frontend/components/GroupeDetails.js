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

const GroupDetail = ({ route }) => {
  const userId = 2;
  const group = route.params;
  // const [groupName, setGroupName] = useState("");
  // const [numberOfMembers, setNumberOfMembers] = useState("");
  const [groups, setGroups] = useState([]);
  // const [newMemberName, setNewMemberName] = useState("");
  const [searchedMember, setSearchedMember] = useState("");
  const [inviteeName, setInviteeName] = useState("");
  const [allUsers, setAllUsers] = useState("");
  const [GroupID, setGroupId] = useState("");
  // const [activeGroup, setActiveGroup] = useState(null);

  // const [newGroupId, setNewGroupId] = useState("");
  // const [groupData, setGroupData] = useState([]);
  // ca fonctionne
  const useEffect = async () => {
    const response = await fetch("http://localhost:3001/user/allUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setAllUsers = await response.json();
  };
  [];

  console.log(group);
  // const createGroupAndNavigate = async () => {
  //   const membersCount = parseInt(numberOfMembers, 10);

  //   if (isNaN(membersCount) || membersCount <= 0) {
  //     alert("Veuillez entrer un nombre de membres valide.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://localhost:3001/group/createGroup", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: groupName,
  //         LimitMembers: membersCount,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(
  //         `Erreur lors de la création du groupe (statut ${response.status})`
  //       );
  //     }

  //     const newGroup = await response.json();
  //     console.log("Nouveau groupe:", newGroup);

  //     setNewGroupId(newGroup.groupId);

  //     setGroupData((prevGroups) => [...prevGroups, newGroup]);
  //     await inviteMember(newGroup.id);
  //   } catch (error) {
  //     console.error("Erreur lors de la création du groupe", error);
  //   }

  //   try {
  //     // Créer un nouveau groupe côté client

  //     // Mettre à jour la liste des groupes côté client
  //     setGroupData([...groupData, GroupID]);
  //   } catch (error) {
  //     console.error("Erreur lors de la création du groupe côté client", error);
  //   }
  // };

  const inviteMember = async (GroupID, UserID) => {
    try {
      const response = await fetch(
        `http://localhost:3001/group/addUserToGroup/${GroupID}/${UserID}`,
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
        `http://localhost:3001/group/deleteOneGroup/${groupDelete}/${userId}`,
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

  // const deleteGroup = async (newGroupId) => {
  //   try {
  //     console.log("newGroupId avant la requête :", newGroupId);

  //     const response = await fetch(
  //       `http://localhost:3001/group/deleteOneGroup/${newGroupId}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log("Réponse du serveur:", response.status);

  //     if (!response.ok) {
  //       throw new Error(
  //         `Erreur lors de la suppression du groupe (statut ${response.status})`
  //       );
  //     }

  //     const updatedGroups = groupData.filter((group) => group.id !== newGroupId);
  //     console.log("Group supprimé avec succès");

  //     setGroupData(updatedGroups);

  //     if (updatedGroups.length > 0) {
  //       setActiveGroup(updatedGroups[0].id);
  //     } else {
  //       setActiveGroup(null);
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors de la suppression du groupe", error);
  //   }
  // };

  // const renderItem = ({ item }) => (
  //   <View>
  //     {/* <Button title="Supprimer" onPress={() => deleteGroup(newGroupId)} /> */}
  //     <Button title="Voir les détails" onPress={() => viewGroupDetails(item)} />
  //   </View>
  // );
  // --------- jusqua ici

  // const viewGroupDetails = (group) => {
  //   navigation.navigate("MyGroupScreen", { group });
  // };

  return (


    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, textAlign: "center", top: 50 }}>
        Nom du groupe
      </Text>
      <Button title="Supprimer" onPress={() => deleteGroup(group.ID)} />
      {/* <Text>Nom du groupe :</Text>
      <TextInput
        placeholder="Entrez le nom du groupe"
        value={groupName}
        onChangeText={setGroupName}
      />
      <Text>Nombre de membres :</Text>
      <TextInput
        placeholder="Entrez le nombre de membres"
        value={numberOfMembers}
        onChangeText={setNumberOfMembers}
        keyboardType="numeric"
      />
      <Button title="Créer le groupe" onPress={createGroupAndNavigate} />
      <FlatList
        data={groupData}
        keyExtractor={(item) => (item.id ? item.id.toString() : null)}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
      <FlatList
        data={groupData}
        keyExtractor={(item) => (item.id ? item.id.toString() : null)}
        renderItem={renderItem}
      /> */}

      {/* <Text>Groupes créés :</Text> */}

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

            {/* <Button
              title="Voir les détails"
              onPress={() => viewGroupDetails(item)}
            /> */}
          </View>
        )}
      />
      {/* 
      <Text>Ajouter un membre au groupe actif :</Text>
      <TextInput
        placeholder="Nom du membre"
        value={newMemberName}
        onChangeText={setNewMemberName}
      />
      <Button title="Ajouter un membre" onPress={addMember} /> */}

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
        // style={styles.customButton}
        onPress={() => inviteMember(GroupID, UserID)}
      >
        <Text style={{ paddingTop: 10, fontSize: 20 }}>Inviter le membre</Text>
      </TouchableOpacity>
      {/* <Button
        style={{ bottom: 100 }}
        title="Inviter le membre"
        // onPress={inviteMember(groupId, userId)}
        onPress={() => inviteMember(GroupID, UserID)}
      /> */}
    </View>
  );
}

export default GroupDetail;
const styles = StyleSheet.create({});
