import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

//const {width, height} = Dimensions.get('window') //detection dela dimension ecran

const Bet = () => {
  const [renderFlag, setRenderFlag] = useState(false);
  const [betOfUserWinner, setBetOfUserWinner] = useState(null);
  const [matchIdOfUser, setMatchId] = useState(null);
  const [matchIdOfEventByDate, setMatchIdOfEventByDate] = useState(null);
  const [fightersName, setFightersName] = useState([]);

  useEffect(()=>{
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
          // console.log("match id of bet of user", matchIdOfUser);
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
          const matchIdOfEventByDate = await json.summaries.map(
            (sportEvent) => {
              const obj = {};
              obj["sportEventID"] = sportEvent.sport_event.id;
              obj["sportEventCombatant1"] =
                sportEvent.sport_event.competitors[0].name;
              obj["sportEventCombatant2"] =
                sportEvent.sport_event.competitors[1].name;
              return obj;
            }
          );

          setMatchIdOfEventByDate([matchIdOfEventByDate]);
          setRenderFlag(true)
        } catch (error) {
          console.log("Error messagee", error);
        }
      };

      const getFightersNameOfBet = async () => {
        try {
          if (matchIdOfEventByDate && matchIdOfUser) {
            matchIdOfEventByDate[0].map((matchOfEvent, i) => {
              if (matchIdOfUser.includes(matchOfEvent["sportEventID"])) {
                console.log("in", i);
                setFightersName((prev) => [...prev, matchOfEvent]);
              }
            });
          }
          
        } catch (error) {
          console.log("Error messagee", error);
        }
      };
      getIdOfMatchByEventDate();
      getBetOfUserByGroupId();
      if(renderFlag){
      getFightersNameOfBet();
      }
    }, [renderFlag])


  // const handeTextClick = () => {};
  return (
    <View style={styles.container}>
      {fightersName?.map((el) => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate("MyTopTabs", group)}
            key={el.sportEventID}
          >
            <Text>
              {el.sportEventCombatant1} vs {el.sportEventCombatant2}
            </Text>
          </TouchableOpacity>
        );
      })}
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
