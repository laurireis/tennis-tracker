import { View, Text } from "react-native";
import { styles } from "../components/styles";

export default function Statistics({ route }) {
  const params = route.params;

  const gamesWon = params.games.reduce((acc, obj) => {
    if (obj.userWon) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  return (
    <View style={styles.container}>
      {params.games.length === 0
        ? <Text style={styles.logIn}>No games played yet</Text>
        : <>
          <Text style={styles.logIn}>{params.games.length} games played</Text>
          <Text style={styles.logIn}>{gamesWon} games won</Text>
          <Text style={styles.logIn}>You have won {(gamesWon / params.games.length * 100).toFixed(1)}% of games</Text>
        </>
      }
    </View>
  );
}