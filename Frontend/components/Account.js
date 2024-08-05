import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import * as SecureStore from 'expo-secure-store';
//const {width, height} = Dimensions.get('window') //detection dela dimension ecran

const Account = ({setUser}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.customButton} onPress={async()=>{
        await SecureStore.deleteItemAsync("user")
        setUser(null)
      }}><Text style={styles.buttonText}>Se déconnecter</Text></TouchableOpacity>
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "white",
    alignItems:"center",
    justifyContent: "center",
    
  },
  customButton: {
    borderBottomColor: "black",
    backgroundColor: "black",
    padding: 10,
    margin: 5,
    marginTop: 20,
    borderRadius: 8,
    width: 350,
    
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    alignItems: "center",
    textAlign: "center",
  },

})