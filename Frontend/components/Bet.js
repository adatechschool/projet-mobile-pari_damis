import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { IP } from '@env';
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import Fightersjson from "../allFighters.json";

const windowWidth = Dimensions.get("window").width;
import { useFocusEffect } from "@react-navigation/native";

//const {width, height} = Dimensions.get('window') //detection dela dimension ecran

const Bet = () => {
  const [renderFlag, setRenderFlag] = useState(false);
  const UfcSilhouetteRightStance =
    "https://www.ufc.com/themes/custom/ufc/assets/img/standing-stance-right-silhouette.png";
  const UfcSilhouetteLeftStance =
    "https://www.ufc.com/themes/custom/ufc/assets/img/standing-stance-left-silhouette.png";
  const [matchIdOfUser, setMatchId] = useState(null);
  const [matchIdOfEventByDate, setMatchIdOfEventByDate] = useState(null);
  const [fightersName, setFightersName] = useState([]);

  useEffect(() => {
    const getBetOfUserByGroupId = async () => {
      try {
        const response = await fetch(
          `http://${IP}:3001/bet/betOfUserByGroup/1/1`,
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
    function strNoAccent(str) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

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
        const matchIdOfEventByDate = await json.summaries.map((sportEvent) => {
          const obj = {};
          obj["sportEventID"] = sportEvent.sport_event.id;
          obj["sportEventCombatant1"] =
            strNoAccent(sportEvent.sport_event.competitors[0].name);
          obj["sportEventCombatant2"] =
            strNoAccent(sportEvent.sport_event.competitors[1].name);
          return obj;
        });

        setMatchIdOfEventByDate([matchIdOfEventByDate]);
        setRenderFlag(true);
      } catch (error) {
        console.log("Error message", error);
      }
    };

    const getFightersNameOfBet = async () => {
      try {
        if (matchIdOfEventByDate && matchIdOfUser) {
          matchIdOfEventByDate[0].map((matchOfEvent, i) => {
            if (matchIdOfUser.includes(matchOfEvent["sportEventID"])) {
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
    if (renderFlag) {
      getFightersNameOfBet();
    }
  }, [renderFlag]);

  // console.log(fightersName);
  // const handeTextClick = () => {};
  return (
    <ScrollView style={styles.container}>
      {fightersName?.map((el, idx) => {
        const nameOfFirstFighter = el.sportEventCombatant1
          .split(",")
          .reverse()
          .join(" ");
        const nameOfsecondFighter = el.sportEventCombatant2
          .split(",")
          .reverse()
          .join(" ");
        const indexOfFirstFigther = Fightersjson.map(
          (fighter) => fighter.NomCombattant
        ).indexOf(nameOfFirstFighter.trim());
        const indexOfSecondFigther = Fightersjson.map(
          (fighter) => fighter.NomCombattant
        ).indexOf(nameOfsecondFighter.trim());
        return (
          <TouchableOpacity
            key={idx}
            style={styles.matchBox}
            onPress={() => navigation.navigate("CreateBet", groupID)}
          >
            <View>
              <Image
                style={styles.Image}
                source={{
                  uri:
                    indexOfFirstFigther !== -1
                      ? Fightersjson[indexOfFirstFigther].ImagePath
                      : UfcSilhouetteRightStance,
                }}
              />
            </View>
            <View style={styles.infosBox}>
              <Text>{nameOfFirstFighter}</Text>
              <Text>VS</Text>
              <Text>{nameOfsecondFighter}</Text>
            </View>
            <View>
              <Image
                style={styles.Image}
                source={{
                  uri:
                    indexOfSecondFigther !== -1
                      ? Fightersjson[indexOfSecondFigther].ImagePath
                      : UfcSilhouetteLeftStance,
                }}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Bet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    width: windowWidth,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  matchBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 150,
    backgroundColor: "red",
    padding: 5,
    marginBottom: 30,
    borderRadius: 20,
  },
  infosBox: {
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
  },
  Image: {
    width: 90,
    height: 90,
    objectFit: "contain",
  },
});
