import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";

const CreateGroup = ({ navigation }) => {
  const [groupName, setGroupName] = useState("");
  const [numberOfMembers, setNumberOfMembers] = useState("");
  const userId = 2;

  const createGroupAndNavigate = async () => {
    const membersCount = parseInt(numberOfMembers, 10);

    if (isNaN(membersCount) || membersCount <= 0) {
      alert("Veuillez entrer un nombre de membres valide.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/group/createGroup/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: groupName,
            LimitMembers: membersCount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Erreur lors de la création du groupe (statut ${response.status})`
        );
      }

      const newGroup = await response.json();
      console.log("Nouveau groupe:", newGroup.group);
    } catch (error) {
      console.error("Erreur lors de la création du groupe", error);
    }
  };

  return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
      <View style={{ flexDirection: "colum" }}>
        <Text style={{ fontSize: 15, paddingTop: 50 }}>Nom du groupe :</Text>
        <TextInput
          style={{ fontSize: 15 }}
          placeholder="Entrez le nom du groupe"
          value={groupName}
          onChangeText={setGroupName}
        />
        <Text
        // style={{ fontSize: 15, paddingTop: 10 }}
        >
          Nombre de membres :
        </Text>
        <TextInput
          // style={{ fontSize: 15 }}
          placeholder="Entrez le nombre de membres"
          value={numberOfMembers}
          onChangeText={setNumberOfMembers}
          keyboardType="numeric"
        />
        {/* <Button style={{magintop:10}} title="Créer le groupe" onPress={createGroupAndNavigate} /> */}
        <TouchableOpacity
          // style={styles.customButton}
          onPress={createGroupAndNavigate}
        >
          <Text
          // style={styles.buttonText}
          >
            Créer le groupe
          </Text>
        </TouchableOpacity>

        {/* <FlatList
          data={groupData}
          keyExtractor={(item) => (item.id ? item.id.toString() : null)}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
            </View>
          )}
        /> */}
      </View>
    </View>
  );
};
export default CreateGroup;

const styles = StyleSheet.create({});
