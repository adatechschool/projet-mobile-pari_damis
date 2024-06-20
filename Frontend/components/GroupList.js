import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'

//const {width, height} = Dimensions.get('window') //detection dela dimension ecran

const GroupList = ({navigation}) => {
  console.log("grp");
  return (
    <View style={styles.container}>
    <Text>GroupList</Text>
    <TouchableOpacity style={styles.customButton} onPress={()=>{
     navigation.navigate("MyTopTabs")
    }}><Text style={styles.buttonText}>navigate</Text></TouchableOpacity>
  </View>
  )
}

export default GroupList

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "black",
    alignItems:"center",
    
  },
  customButton: {
    borderBottomColor: "red",
    backgroundColor: "red",
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