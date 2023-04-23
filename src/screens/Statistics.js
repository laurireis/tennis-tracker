import { View, Text } from "react-native";
import { styles } from "../components/styles";

export default function Statistics({ route }) {
  const params = route.params;
  console.log(params)

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
          <Text>{params.games.length} games played</Text>
          <Text>{gamesWon} games won</Text>
          <Text>You have won {(gamesWon / params.games.length * 100).toFixed(1)}% of games</Text>
        </>
      }
    </View>
  );
}