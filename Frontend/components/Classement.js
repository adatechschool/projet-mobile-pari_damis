import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { IP } from '@env';

const Classement = ({ route, user }) => {
  const [ranking, setRanking] = useState([]);
  const groupId = route.params.ID;
  const userId = user.user.Firstname;

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const response = await fetch(`http://${IP}:3001/bet/betOfGroup/${groupId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        const bets = json.message.Bets.map((el) => {
          return el
        });
        // Calculer les points pour chaque utilisateur
        const userPoints = bets.reduce((acc, bet) => {
          const { UserID, PointPerBet } = bet;
          if (!acc[UserID]) {
            acc[UserID] = 0;
          }
          acc[UserID] += PointPerBet;
          return acc;
        }, {});
        // Convertir en tableau et trier par points
        const rankingArray = Object.keys(userPoints).map(userId => ({
          userId,
          points: userPoints[userId],
        })).sort((a, b) => b.points - a.points);

        setRanking(rankingArray);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchBets();
  }, [groupId]);

  return (
    <View style={styles.container}>
      <Text>Classement</Text>
      {ranking.map((user, index) => (
        <Text key={user.userId}>
          {index + 1}. {userId} - Points: {user.points}
        </Text>
      ))}
    </View>
  );
};

export default Classement;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});