import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

//const {width, height} = Dimensions.get('window') //detection dela dimension ecran

const Bet = () => {
  return (
    <View>{
      fetch("http://localhost:3001/bet/betOfUser/1", {
        method: "GET",
        headers: {
          "Content-type": "application/json" 
        }
      })
      .then(response => response.json())
      .then(json => {
        console.log(json.message.Bets.map(id => id.MatchID));
      })
      }
    </View>
  )
}

export default Bet

const styles = StyleSheet.create({})