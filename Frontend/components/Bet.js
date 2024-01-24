import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

//const {width, height} = Dimensions.get('window') //detection dela dimension ecran

const Bet = () => {
  const [betOfUserWinner, setBetOfUserWinner] = useState(null);
  const [matchIdOfUser, setMatchId] = useState(null);
  const [matchIdOfEventByDate, setMatchIdOfEventByDate] = useState(null);
  const [fightersName, setFightersName] = useState(null);

  useEffect(() => {
    const getBetOfUserByGroupId = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/bet/betOfUserByGroup/99/1",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const json = await response.json();
        const matchIdOfUser = json.message.map((id) => id.MatchID);
        setMatchId(matchIdOfUser);
        console.log("match id of bet of user", matchIdOfUser);
      } catch (error) {
        console.log("Error message", error);
      }
    };
    const getIdOfMatchByEventDate = async () => {
      try {
        const response = await fetch(
          `https://api.sportradar.com/mma/trial/v2/fr/schedules/2024-02-04/summaries.json?api_key=nrmu6fxvt5e5bzdzhx2845fq`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const json = await response.json();
        const matchIdOfEventByDate = json.summaries.map((sportEvent) => {
          const obj = {};
          obj["sportEventID"] = sportEvent.sport_event.id;
          obj["sportEventCombatant1"] = sportEvent.sport_event.competitors[0].name;
          obj["sportEventCombatant2"] = sportEvent.sport_event.competitors[1].name;
          return obj;
        });

        setMatchIdOfEventByDate(matchIdOfEventByDate);
        console.log("mes matchs id", matchIdOfEventByDate);
      } catch (error) {
        console.log("Error message", error);
      }
    };
    getBetOfUserByGroupId();
    getIdOfMatchByEventDate();
  }, []);
  useEffect(() => {
    if (matchIdOfUser && matchIdOfEventByDate) {
      matchIdOfUser.forEach((userMatchId) => {
        if (matchIdOfEventByDate.includes(userMatchId)) {
          console.log(`Correspondance Trouvé ${userMatchId}`);
        }
      });
    }

    // if (matchIdOfUser !== null) {
    //   console.log("match id of userr", matchIdOfUser);
    // }
  }, [matchIdOfUser, matchIdOfEventByDate]);

  const handeTextClick = () => {};
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handeTextClick}>
        <Text>{matchIdOfUser}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Bet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
