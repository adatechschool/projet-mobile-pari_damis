import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { IP, APIKEY } from '@env';
import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions } from "react-native";
import Fightersjson from "../allFighters.json";
import _ from "lodash";

const windowWidth = Dimensions.get("window").width;

const Match = ({ route, navigation, user }) => {
  const [matchs, setMatchs] = useState(null);
  const [filteredMatchs, setFilteredMatchs] = useState([]);
  const [betOfUserByMatchId, setBetOfUserByMatchId] = useState([]);

  const userId = user.user.ID
  const UfcSilhouetteRightStance =
    "https://www.ufc.com/themes/custom/ufc/assets/img/standing-stance-right-silhouette.png";
  const UfcSilhouetteLeftStance =
    "https://www.ufc.com/themes/custom/ufc/assets/img/standing-stance-left-silhouette.png";
  const groupID = route.params.ID;
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // const getNextSundayDate = () => {
  //     //   const today = new Date();
  //     //   const dayOfWeek = today.getDay();
  //     //   const diff = 7 - dayOfWeek;
  //     //   const nextSunday = new Date(today);
  //     //   nextSunday.setDate(today.getDate() + diff);
  //     //   return nextSunday.toISOString().slice(0, 10);
  //     // };
  //     // const getNextSaturdayDate = () => {
  //     //   const today = new Date();
  //     //   const dayOfWeek = today.getDay();
  //     //   const diff = 6 - dayOfWeek;
  //     //   const nextSunday = new Date(today);
  //     //   nextSunday.setDate(today.getDate() + diff);
  //     //   return nextSunday.toISOString().slice(0, 10);
  //     // };
  //     // const nextSundayDate = getNextSundayDate();
  //     // const nextSaturdayDate = getNextSaturdayDate();
  //     // // console.log(nextSundayDate);
  //     // try {
  //     //   Promise.all([
  //     //     fetch(
  //     //       `http://${IP}:3001/bet/betOfUserByGroupOfThisWeek/${groupID}/${userId}/`,
  //     //       {
  //     //         method: "GET",
  //     //         headers: {
  //     //           "Content-type": "application/json",
  //     //         },
  //     //       }
  //     //     ).then(response => response.json()),
  //     //     fetch(
  //     //       `https://api.sportradar.com/mma/trial/v2/en/schedules/${nextSaturdayDate}/summaries.json?api_key=${APIKEY}`,
  //     //       {
  //     //         method: "GET",
  //     //         headers: {
  //     //           "Content-type": "application/json",
  //     //         },
  //     //       }
  //     //     ).then((response) => response.json()),
  //     //     fetch(
  //     //       `https://api.sportradar.com/mma/trial/v2/en/schedules/${nextSundayDate}/summaries.json?api_key=${APIKEY}`,
  //     //       {
  //     //         method: "GET",
  //     //         headers: {
  //     //           "Content-type": "application/json",
  //     //         },
  //     //       }
  //     //     ).then((response) => response.json())
  //     //   ]).then(([betOfUserByMatchJson, saturdayJson, sundayJson]) => {
  //     //     // console.log('dimanche et samedi', saturdayJson, sundayJson);
  //     //     const allMatchs = [...saturdayJson.summaries, ...sundayJson.summaries];
  //     //     const matchIdOfUser = betOfUserByMatchJson.message.map((id) => id.MatchID);
  //     //     setBetOfUserByMatchId(matchIdOfUser);
  //     //     const allmatchfiltered = allMatchs.filter((matchInAllMatchs) => !matchIdOfUser.includes(matchInAllMatchs.sport_event.id))
  //     //     setMatchs(allmatchfiltered);
  //     //     console.log(allMatchs);
  //     //   });
  //     // } catch (error) {
  //     //   console.log("Error message", error);
  //     // }
  //   }, [])
  // );
  
  // useEffect(() => {
  //   if(matchs){
  //     setFilteredMatchs(matchs.reverse());
  //   }
  // }, [matchs])
 
    
  // function strNoAccent(str) {
  //   return str
  //     .normalize("NFD")
  //     .replace(/[\u0300-\u036f]/g, "")
  //     .replace(/-/g, " ");
  // }
  return (
    <ScrollView style={styles.container}>
        <TouchableOpacity>
      <View style={styles.infosBox}>
              <Text>Test</Text>
              <Text>VS</Text>
              <Text>Test</Text>
        </View>
        </TouchableOpacity>
      {/* {filteredMatchs?.map((match, idx) => {
        const nameOfFirstFighter = match.sport_event.competitors[0].name
          .split(",")
          .reverse()
          .join(" ");
        const nameOfsecondFighter = match.sport_event.competitors[1].name
          .split(",")
          .reverse()
          .join(" ");
        // console.log(
        //   "first",
        //   strNoAccent(nameOfFirstFighter.trim()),
        //   "second",
        //   strNoAccent(nameOfsecondFighter.trim())
        // );
        const indexOfFirstFigther = Fightersjson.map((fighter) =>
          strNoAccent(fighter.NomCombattant)
        ).indexOf(strNoAccent(nameOfFirstFighter.trim()));
        const indexOfSecondFigther = Fightersjson.map((fighter) =>
          strNoAccent(fighter.NomCombattant)
        ).indexOf(strNoAccent(nameOfsecondFighter.trim()));
        // console.log("mmm", indexOfFirstFigther, indexOfSecondFigther);
        return (
          <TouchableOpacity
            key={idx}
            style={styles.matchBox}
            onPress={() =>
              navigation.navigate("CreateBet", {
                groupID: groupID,
                matchInfo: match,
              })
            }
          >
            <View>
              <Image
                style={styles.Image}
                source={{
                  uri:
                    indexOfFirstFigther !== -1 && Fightersjson[indexOfFirstFigther].ImagePath != ""
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
                    indexOfSecondFigther !== -1 && Fightersjson[indexOfSecondFigther].ImagePath != ""
                      ? Fightersjson[indexOfSecondFigther].ImagePath
                      : UfcSilhouetteLeftStance,
                }}
              />
            </View>
          </TouchableOpacity>
        );
      })} */}
    </ScrollView>
  );
};

export default Match;

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
    color: "white",
  },
  Image: {
    width: 90,
    height: 90,
    objectFit: "contain",
  },
});
