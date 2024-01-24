import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

//const {width, height} = Dimensions.get('window') //detection dela dimension ecran

const Bet = () => {
  const [betOfUserWinner, setBetOfUserWinner] = useState(null);
  const [matchIdOfUser, setMatchId] = useState(null);
  const [matchIdOfEventByDate, setMatchIdOfEventByDate] = useState(null);
  const [fightersName, setFightersName] = useState([]);

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
        const matchIdOfEventByDate = json.summaries.map((sportEvent) => {
          const obj = {};
          obj["sportEventID"] = sportEvent.sport_event.id;
          obj["sportEventCombatant1"] =
            sportEvent.sport_event.competitors[0].name;
          obj["sportEventCombatant2"] =
            sportEvent.sport_event.competitors[1].name;
          return obj;
        });

        setMatchIdOfEventByDate([matchIdOfEventByDate]);
        // console.log("mes matchs id", matchIdOfEventByDate.map());
      } catch (error) {
        console.log("Error messagee", error);
      }
    };
    getBetOfUserByGroupId();
    getIdOfMatchByEventDate();
  }, []);
  useEffect(() => {
    if (matchIdOfUser && matchIdOfEventByDate) {
      combatDesParisDuUser = [];
      matchIdOfEventByDate[0].map((matchOfEvent, i) => {
        if (matchIdOfUser.includes(matchOfEvent["sportEventID"])) {
          setFightersName((prev) => [...prev, matchOfEvent]);
          // console.log(fightersName[0])
        }
      });

      // console.log(fightersName.forEach((element) => {
      //   console.log("combatant 1",element,"combatant2",element)

      // }))
      // console.log(combatDesParisDuUser.forEach((combat)=>combat[sportEventCombatant1]))
      // matchIdOfEventByDate["sportEventID"].map((matchOfEvent, i) => {
      //   console.log(`nombre de repetion${i}`,matchOfEvent);
      //   if (matchOfEvent.includes(matchIdOfUser)) {
      //     console.log(`Correspondance Trouvé  ${matchIdOfEventByDate}`);
      //   }
      // });
    }
    // if (matchIdOfUser !== null) {
    //   console.log("match id of userr", matchIdOfUser);
    // }
  }, []);

  const handeTextClick = () => {};
  return (
    <View style={styles.container}>
      {fightersName?.map((el) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("MyTopTabs", group)}
          key={el.sportEventID}
        >
          <Text>
            {el.sportEventCombatant1} vs {el.sportEventCombatant2}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    // <View style={styles.container}>
    // {  fightersName?.map((el)=>{
    //     <Text>{`${el.sportEventCombatant1} vs ${el.sportEventCombatant2}`}</Text>
    // })}
    // </View>
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
