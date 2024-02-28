import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Switch,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

const CreateBet = ({ route, navigation }) => {
  const { control, handleSubmit } = useForm();

  const { groupID, matchInfo } = route.params;

  const firstFigther = matchInfo.sport_event.competitors[0].name
    .split(",")
    .reverse()
    .join(" ");
  const secondFigther = matchInfo.sport_event.competitors[1].name
    .split(",")
    .reverse()
    .join(" ");

  const matchMaxRound = matchInfo.sport_event_status.scheduled_length;
  // console.log(matchMaxRound);

  const [winner, setWinner] = useState("");
  const [isEnabledKo, setIsEnabledKo] = useState(false);
  const [isEnabledSubmission, setIsEnabledSubmission] = useState(false);
  const [roundSwitches, setRoundSwitches] = useState(
    Array(matchMaxRound).fill(false)
  );
  const [finishKo, setFinishKo] = useState("");
  const [finishSubmission, setFinishSubmission] = useState("");
  const [roundNumber, setRoundNumber] = useState("");
  const [finishRounds, setFinishRounds] = useState(
    Array(matchMaxRound).fill("")
  );
  const toggleSwitchKo = () => {
    setIsEnabledKo((previousState) => {
      const newFinishKo = !previousState ? "ko" : "";
      setFinishKo(newFinishKo)
      console.log(newFinishKo);
      return !previousState;
    });
    setIsEnabledSubmission(false);
    // setFinishKo(isEnabledKo ? "ko" : "");
    // console.log(finishKo);
  };
  const toggleSwitchSubmission = () => {
    setIsEnabledSubmission((previousState) => {
      const newFinishSubmission = !previousState ? "Submission" : "";
      setFinishSubmission(newFinishSubmission);
      console.log(newFinishSubmission);
      return !previousState;
    });
    setIsEnabledKo(false);
    // setFinishSubmission(isEnabledSubmission ? "Submission" : "");
    // console.log(finishSubmission);
  };
  const toggleSwitchRoundNumber = (i) => {
    const updatedSwitches = [...roundSwitches];

    const updatedSwitchesWithDeselected = updatedSwitches.map(
      (switchState, index) => {
        if (index === i - 1) {
          return !switchState;
        } else {
          return false;
        }
      }
    );

    setRoundSwitches(updatedSwitchesWithDeselected);

    setRoundNumber(updatedSwitchesWithDeselected[i - 1] ? `Round ${i}` : "");

    const updatedFinishRounds = updatedSwitchesWithDeselected.map(
      (switchState, index) => {
        return switchState ? `Round ${index + 1}` : "";
      }
    );

    setFinishRounds(updatedFinishRounds);
    console.log(updatedFinishRounds);
  };

  // const onSubmit = (data) => {
  //   // console.log(data);
  //   // Here you can perform further actions with the form data, like sending it to a server
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {firstFigther} vs {secondFigther}
      </Text>
      <Text style={styles.firstBoxOfBet}>Winner Du Match</Text>
      <View style={styles.winners}>
        <View style={styles.winnerButton}>
          <Button
            title={firstFigther}
            color={winner === firstFigther ? "#ffffff" : "#ffffff"}
            onPress={() => setWinner(firstFigther)}
          />
        </View>
        <View style={styles.winnerButton}>
          <Button
            title={secondFigther}
            color={winner === secondFigther ? "#ffffff" : "#ffffff"}
            onPress={() => setWinner(secondFigther)}
          />
        </View>
      </View>
      {winner && (
        <>
          <Text style={styles.titleTypeWin}>{winner} gagnant par: </Text>
          <View>
            <View>
              <Text style={styles.koTko}>KoTko </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#FF4C4C" }}
                thumbColor={isEnabledKo ? "red" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchKo}
                value={isEnabledKo}
              />
            </View>
            <View>
              <Text style={styles.submission}>Soumission</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#FF4C4C" }}
                thumbColor={isEnabledSubmission ? "red" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchSubmission}
                value={isEnabledSubmission}
              />
            </View>
            <View>
              {[...Array(matchMaxRound)].map((_, i) => (
                <View key={i}>
                  <Text style={styles.rounds}>Round {i + 1}</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#FF4C4C" }}
                    thumbColor={roundSwitches[i] ? "red" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => toggleSwitchRoundNumber(i + 1)}
                    value={roundSwitches[i]}
                  />
                </View>
              ))}
            </View>
            <Button
              title="Valider mon pari"
              onPress={() => {
                const selectedRounds = finishRounds
                  .filter((round) => round !== "")
                  .join(", ");
                  const selectedFinish = [finishKo, finishSubmission].filter((finish) => finish !== "").join(", ");
                const finish = [
                  selectedRounds,
                  selectedFinish
                ].join(", ");
                Alert.alert(`Pari validé: ${finish}`);
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default CreateBet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "black",
    borderTopColor: "red",
    borderTopWidth: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 25,
    color: "white",
  },
  koTko:{
    color:'white',
  },
  submission: {
    color:'white',
  },
  rounds: {
    color:'white',
  },
  firstBoxOfBet: {
    fontSize: 16,
    marginBottom: 12,
    color: "white",
  },
  winners: {
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  winnerButton: {
    flexDirection: "row",
    backgroundColor: "red",
    color: "white",
    marginLeft: 15,
    borderRadius: 25,
  },
  hide: {
    opacity: 0,
  },
});
