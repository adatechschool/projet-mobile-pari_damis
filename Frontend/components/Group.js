//  a ajouter dans le projet
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

const Group = ({navigation}) => {
  const [groupData, setGroupData] = useState([]);
  const [activeGroup, setActiveGroup] = useState(1);
  const [newMemberName, setNewMemberName] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [inviteeName, setInviteeName] = useState("");




  

  const addMember = () => {
    if (newMemberName.trim() !== "") {
      const updatedGroups = groupData.map((group) => {
        if (group.id === activeGroup) {
          return {
            ...group,
            members: [
              ...group.members,
              { id: group.members.length + 1, name: newMemberName, score: 0 },
            ],
          };
        }
        return group;
      });

      setGroupData(updatedGroups);
      setNewMemberName("");

    }
  };

  const createNewGroup = () => {
    const newGroupId = groupData.length + 1;
    const newGroup = { id: newGroupId, members: [], name: newGroupName };

    navigation.navigate("PageGroup");
    setGroupData([...groupData, newGroup]);
    setActiveGroup(newGroupId);
  };
  renderItem = ({ group }) => (
    <Item
      title={group.name}
      // image={group.image}
      onPressItem={() => this.handleItemPress(group.id)}
    />
  );



  const deleteGroup = () => {
    if (groupData.length > 0) {
      const updatedGroups = groupData.filter(
        (group) => group.id !== activeGroup
      );

      setGroupData(updatedGroups);

      if (updatedGroups.length > 0) {
        setActiveGroup(updatedGroups[0].id);
      } else {
        setActiveGroup(null);
      }
    }
  };

  // const inviteMember = () => {
  //   if (inviteeName.trim() !== "") {

  //     const updatedGroups = groupData.map((group) => {
  //       if (group.id === activeGroup) {
  //         return {
  //           ...group,
  //           members: [
  //             ...group.members,
  //             { id: group.members.length + 1, name: inviteeName, score: 0 },
  //           ],
  //         };
  //       }
  //       return group;
  //     });

  //     setGroupData(updatedGroups);
  //     setInviteeName("");

  //   }
  // };

  
  const searchMembers = async (name) => {
    // try {
    //   const response = await fetch.get(`http://localhost:3001/user/allUsers/${id}`);
      
    //   return response.data;
    // } catch (error) {
    //   console.error("Erreur lors de la recherche de membres :", error);
    //   throw error; 
    // }
    
    return []; 
  };
  
  const inviteMember = async () => {
    if (inviteeName.trim() !== "") {
      try {
        // Appeler la fonction de recherche côté serveur
        const searchResults = await searchMembers(inviteeName);

        console.log("Résultats de la recherche :", searchResults);

        if (searchResults.length > 0) {
          const selectedMember = searchResults[0]; 

         
          const updatedGroups = groupData.map((group) => {
            if (group.id === activeGroup) {
              return {
                ...group,
                members: [
                  ...group.members,
                  { id: group.members.length + 1, name: selectedMember.name, score: 0 },
                ],
              };
            }
            return group;
          });

          setGroupData(updatedGroups);
          setInviteeName("");
        } else {
          Alert.alert('Aucun résultat', 'Aucun membre trouvé avec ce nom.');
        }
      } catch (error) {
        console.error("Erreur lors de la recherche de membres :", error);
      }
    }
  };
  
  
 

  // const updateMemberScore = (memberId, score) => {
  //   const updatedGroups = groupData.map((group) => {
  //     if (group.id === activeGroup) {
  //       return {
  //         ...group,
  //         members: group.members.map((member) => {
  //           if (member.id === memberId) {
  //             return { ...member, score: member.score + score };
  //           }
  //           return member;
  //         }),
  //       };
  //     }
  //     return group;
  //   });

  //   setGroupData(updatedGroups);
  // };
  
  
  const updateMemberScore = (groupData, activeGroup, memberId, score) => {
    const updatedGroups = groupData.map((group) => {
      if (group.id === activeGroup) {
        return {
          ...group,
          members: group.members.map((member) => {
            if (member.id === memberId) {
              return { ...member, score: member.score + score };
            }
            return member;
          }),
        };
      }
      return group;
    });
  
    return updatedGroups;
  };

  const handleAddScore = (memberId, scoreToAdd) => {
    updateMemberScore(memberId, scoreToAdd);
  };

 

  const rankMembers = () => {
    const updatedGroups = groupData.map((group) => {
      if (group.id === activeGroup) {
        // Trier les membres par score de manière décroissante
        const rankedMembers = group.members.slice().sort((a, b) => b.score - a.score);
  
        return {
          ...group,
          members: rankedMembers,
        };
      }
      return group;
    });
  
    setGroupData(updatedGroups);
  };


  return (
    <ScrollView>
      <View style={styles.container}>
        {groupData.map((group) => (
          <View key={group.id} style={styles.group}>
            <Text style={styles.text}>{group.name}</Text>
            <FlatList
              data={group.members}
              renderItem={({ item }) => (
                <View style={styles.memberContainer}>
                  <Text>{item.name}</Text>
                  <Text>Score: {item.score}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        ))}

        <View style={styles.newMemberContainer}>
          <View style={styles.newGroupContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nom de groupe"
              placeholderTextColor="red"
              value={newGroupName}
              onChangeText={(text) => setNewGroupName(text)}
            />

         
          </View>

          <TouchableOpacity style={styles.Button} onPress={createNewGroup}>
            <Text style={styles.buttonText}>Nouveau Groupe</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.Button} onPress={deleteGroup}>
            <Text style={styles.buttonText}>Supprimer le groupe</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Nouveau membre"
            placeholderTextColor="red"
            value={newMemberName}
            onChangeText={(text) => setNewMemberName(text)}
          />
          <TouchableOpacity style={styles.Button} onPress={addMember}>
            <Text style={styles.buttonText}>Ajouter</Text>
          </TouchableOpacity>

          <View style={styles.inviteContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nom de l'invité"
              placeholderTextColor="red"
              value={inviteeName}
              onChangeText={(text) => setInviteeName(text)}
            />
            <TouchableOpacity style={styles.Button} onPress={inviteMember}>
              <Text style={styles.buttonText}>Inviter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button} onPress={rankMembers}>
              <Text style={styles.buttonText}>Classer les membres</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => handleAddScore(1, 3)}>
        <Text>Ajouter 3 points à MemberA</Text>
      </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  memberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "black",
    top:100,

    // height:750
  },
  group: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 10,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    color: "red",
    
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  newMemberContainer: {
    marginTop: 50,
    flexDirection: "colomn",
    //   alignItems: 'center',
  },
  newGroupContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 10,
    paddingLeft: 10,
    width: "100%",
    color: "white",
    fontSize: 20,
  },
  Button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default Group;
