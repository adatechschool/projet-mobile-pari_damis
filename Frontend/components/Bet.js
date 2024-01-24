import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState, useEffect } from 'react'

//const {width, height} = Dimensions.get('window') //detection dela dimension ecran

const Bet = () => {
  const [betOfUserWinner, setBetOfUserWinner] = useState(null)
  const [matchId, setMatchId] = useState(null)

  useEffect(() => {
    try {
      fetch("http://localhost:3001/bet/betOfUser/1", {
          method: "GET",
          headers: {
            "Content-type": "application/json" 
          }
        })
        .then(response => response.json())
        .then(json => {
          const betOfUserWinner = json.message.Bets.map(winner => winner.Winner)
          const idOfMatch = json.message.Bets.map(id => id.MatchID)
          console.log(betOfUserWinner);
  
          setMatchId(idOfMatch[0])
          setBetOfUserWinner(betOfUserWinner[0])
  
        })
    } catch (error) {
      console.log("Error message", error);
    }
    try {
      fetch(`https://api.sportradar.com/mma/trial/v2/fr/schedules/2024-02-04/summaries.json?api_key=nrmu6fxvt5e5bzdzhx2845fq`, {
        method: "GET",
        headers: {
          "Content-type": "application/json" 
        }
      })
      .then(response => response.json())
      .then(json => {
        console.log("mes matchs", json.summaries.map(sportEvent => sportEvent.sport_event.id));
      })
    } catch (error) {
      console.log("Error message g", error);
    }
  }, [])

  const handeTextClick = () => {
  } 
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handeTextClick}>
        <Text>{betOfUserWinner}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Bet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})