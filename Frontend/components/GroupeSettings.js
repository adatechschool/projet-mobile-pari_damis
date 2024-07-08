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
import SearchFilterUser from './Searchfilteruser';
import Icon from 'react-native-vector-icons/FontAwesome';



const GroupeSettings = ({ navigation,route, user }) => {
  const creatorIdOfGroup = route.params.CreatorId;
  const userId = user.user.ID;
  const group = route.params;
  const groupId = route.params.ID;
  const [groups, setGroups] = useState([]);
  const [searchedMember, setSearchedMember] = useState("");
  const [inviteeName, setInviteeName] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [usersOfOneGroup, setUsersOfOneGroup] = useState([]);

  const isItCreator = userId == creatorIdOfGroup;
  console.log("test creator", group.CreatorId);

  console.log("Creator ???",isItCreator);
  console.log("creator id", creatorIdOfGroup);
  console.log("userid", userId);
  console.log(group);

  useEffect(() => {
    const fetchUsersOfGroup = () =>{
      fetch(`http://${IP}:3001/group/usersOfOneGroup/${groupId}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
      .then(json => setUsersOfOneGroup(json.message.users))
    } 
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
    fetchUsersOfGroup()
    fetchAllUsers();
  },[]);


  const filteredUsers = allUsers.filter(
    (user) => !usersOfOneGroup.some((groupUser) => groupUser.ID === user.ID)
  );

  const searchMember = () => {
    const foundUser = filteredUsers.find((user) => user.Pseudo.toLowerCase() === searchedMember.toLowerCase());
    if (foundUser) {
      inviteMember(foundUser.ID);
      setUsersOfOneGroup((previous) => [...previous, foundUser]);
      setSearchedMember("");
    } else {
      Alert.alert("Utilisateur non trouvé");
    }
  };

  const inviteMember = async (userToAddId) => {
    try {
      const response = await fetch(
        `http://${IP}:3001/group/addUserToGroupByCreatorId/${groupId}/${userToAddId}/${userId}`,
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

  const deleteGroup = () => {
      const userResponse = Alert.alert("Avertissement", "Voulez vous vraiment supprimer ce groupe ?",[
        {
          text: 'not ok',
          onPress: () => {
            Alert.alert("Suppression de groupe annulé");
          },
        },
        {
          text: 'ok',
          onPress: async () => {
            try {
              console.log("alert ",userResponse);
              console.log("id du groupe qu'on supprime", groupId);
              const response = await fetch(`http://${IP}:3001/group/deleteOneGroup/${groupId}/${userId}`,{
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                },
              }
              );
              if(response.status === 200){
              Alert.alert("Groupe supprimé")
              navigation.navigate("Groupes");
              }
            } catch (error) {
              console.error("Erreur lors de la suppression du groupe", error);
            }
          }
        },
      ],
    )
  };

  const deleteUserOfGroup = async (userToDelete) => {
      const userResponse = Alert.alert("Avertissement", "Voulez vous vraiment supprimer cet utilisateur du groupe ?",[
        {
          text: 'not ok',
          onPress: () => {
            Alert.alert("Suppression de l'utilisateur annulé");
          },
        },
        {
          text: 'ok',
          onPress: async () => {
            try {
              const response = await fetch(`http://${IP}:3001/group/deleteUserOfGroupByCreatorId/${groupId}/${userToDelete.ID}/${userId}`,{
                method:"DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              })
              if(response.ok){
                const result = await response.json()
                console.log("message si la requête s'est bien effectué", result.message);
                setUsersOfOneGroup(usersOfOneGroup.filter(userofgroup => userofgroup.ID != userToDelete.ID));
                Alert.alert("Utilisateur supprimé du groupe")
              }else{
                const error = await response.json();
                console.error("erreur lors de la requête", error)
                Alert.alert("Erreur lors de la suppression de l'utilisateur")
              }
            } catch (error) {
              console.error("Erreur lors de la suppression de l'utilisateur", error)
            }
          },
        },
      ])
  }

  return (
    <View>
    {isItCreator && (
      <View style={{marginTop:20}}>
        <Text style={{ fontSize: 20, textAlign: "center"}}>
          {group.Name}
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
  
        <Text style={{ marginTop:20,fontSize: 20 }}>
          Rechercher un membre et l'inviter :
        </Text>
        <TextInput
          style={{ bottom:20, fontSize: 15, paddingTop: 50 }}
          placeholder="Pseudo du membre à ajouté"
          value={searchedMember}
          onChangeText={setSearchedMember}
        />
        <SearchFilterUser data={filteredUsers} input={searchedMember} setInput={setSearchedMember}/>
        <TouchableOpacity
          style={{ bottom: 15, fontSize: 100 }}
          onPress={() => searchMember()}
        >
          <Text style={{ paddingTop: 10, fontSize: 20 }}>Inviter le membre</Text>
        </TouchableOpacity>
      </View>
)}
<View>
  {
    <FlatList
      data={usersOfOneGroup}
      keyExtractor={(user) => user.ID.toString()}
      renderItem={({item: user}) => (
        userId != user.ID &&(
          <View style={styles.userRow}>
            <Text>
              {user.Pseudo}
              {user.ID == group.CreatorId &&(
              `(Admin du groupe)`
              )} 
            </Text>
            {isItCreator && (
            <TouchableOpacity style={styles.button}
            onPress={() => deleteUserOfGroup(user)}
            >
              <Icon
              name="close"
              color="red"
              background="none"
              size={15}
              borderRadius={20}
              />
            </TouchableOpacity>
            )}
          </View>
        )
      )}
      />
    }
    </View>
  </View> 
  );
};

export default GroupeSettings;
const styles = StyleSheet.create({
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button:{
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  }
});
