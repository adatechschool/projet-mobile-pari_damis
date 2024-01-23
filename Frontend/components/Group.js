import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Group = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Group</Text>
    </View>
  )
}

export default Group

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "black",
        alignItems:"center",
      },
      text:{
        color: "white"
      }
})