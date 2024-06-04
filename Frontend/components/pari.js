import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
//importer navigation ici

export const Parier = () => {
  const [fighter1Name, setFighter1Name] = useState("Name Fighter 1");
  const [fighter2Name, setFighter2Name] = useState("Name Fighter 2");
  //recuperation des noms fighter
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://votre-serveur-api.com/ID-fighter"
      );
      const data = await response.data;

      setFighter1Name(data.name);
      setFighter2Name(data.name);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  //clic et renvoyer vers la base de donner sur les bouton type de victoire fighter
  const handleButtonClick = async (victoryType) => {
    try {
      const response = await fetch(
        "http://votre-serveur-api.com/enregistrer-clic",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fighterName: fighter1Name,
            fighterName: fighter2Name,
            victoryType: victoryType,
          }),
        }
      );
      console.log(
        `Clic enregistré pour ${fighter1Name} - Type de victoire : ${victoryType}`
      );
      console.log(
        `clic enregistre pour ${fighter2Name} - type de victoire : ${victoryType}`
      );
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du clic :", error);
    }

    //boutton egaliter
    const handleEgaliteClick = async () => {
      try {
        const response = await fetch(
          "http://votre-serveur-api.com/enregistrer-clic",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fighter1Name,
              fighter2Name: "ÉGALITÉ",
            }),
          }
        );

        // Vérification de la requête
        if (response.status === 200) {
          return true;
        } else {
          console.error("Échec de la requête :", response.status);
        }
      } catch (error) {
        console.error(
          "Erreur lors de l'enregistrement du clic ÉGALITÉ :",
          error
        );
      }
    };
    //boutton parier
    const handlePariClick = async () => {
      try {
        const response = await fetch(
          "http://votre-serveur-api.com/enregistrer-tous-les-clics",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fighter1Type: "Type de victoire Fighter 1",
              fighter2Type: "Type de victoire Fighter 2",
            }),
          }
        );

        // Vérification de la requête
        if (response.status === 200) {
          navigation.navigate("PariConfirmer");
        } else {
          console.error("Échec de la requête :", response.status);
        }
      } catch (error) {
        console.error("Erreur lors de l'enregistrement des clics :", error);
      }
    };

    return (
      <>
        <ScrollView>
          <View
            style={{ flex: 1, alignItems: "center", backgroundColor: "black" }}
          >
            <View>
              <Text style={styles.Win}>WINNER DU MATCH</Text>
            </View>

            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <View>
                <TouchableOpacity
                  onPress={handleButtonClick}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>{fighter1Name}</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{ fontSize: 18, color: "white" }}>VS</Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={handleButtonClick}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>{fighter2Name}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
              {/* ici s'affiche la liste du type de victoire selon le fighter cliquer */}
              <Text>Type de victoire du {fighter1Name}</Text>
              <View>
                <TouchableOpacity
                  onPress={() => handleButtonClick("KO,TKO")}
                  style={styles.button1}
                >
                  <Text style={styles.buttonText}>KO, TKO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleButtonClick("SOUMISSION")}
                  style={styles.button1}
                >
                  <Text style={styles.buttonText}>SOUMISSION</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleButtonClick("POINT")}
                  style={styles.button1}
                >
                  <Text style={styles.buttonText}>POINT</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
              <Text>Type de victoire du {fighter2Name}</Text>
              <View>
                <TouchableOpacity
                  onPress={() => handleButtonClick("KO,TKO")}
                  style={styles.button1}
                >
                  <Text style={styles.buttonText}>KO, TKO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleButtonClick("SOUMISSION")}
                  style={styles.button1}
                >
                  <Text style={styles.buttonText}>SOUMISSION</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleButtonClick("POINT")}
                  style={styles.button1}
                >
                  <Text style={styles.buttonText}>POINT</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <TouchableOpacity
                onPress={handleEgaliteClick}
                style={[styles.button2]}
              >
                <Text style={styles.buttonText}>EGALITE</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                onPress={handlePariClick}
                style={[styles.button2]}
              >
                <Text style={styles.buttonText}>SOUMETTRE MON PARI</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </>
    );
  };
};

export default Parier;

const styles = StyleSheet.create({
  Win: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  pari: {},
  buttonText: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    backgroundColor: "yellow",
    padding: 10,
    borderRadius: 5,
  },
  button1: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  button2: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: 200,
    alignItems: "center",
  },
});