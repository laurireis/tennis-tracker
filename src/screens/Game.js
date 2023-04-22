import { Text, View, Alert } from "react-native";
import { styles } from "../components/styles";
import { useState } from "react";
import { Button } from '@rneui/themed';
import { auth } from "../components/firebaseConfig";
import { getDatabase, ref, push } from "firebase/database";

export default function Game({ navigation, route }) {
  const params = route.params;
  const [points, setPoints] = useState({ user: 0, opponent: 0 });
  const [games, setGames] = useState({ user: 0, opponent: 0 });
  const [sets, setSets] = useState({ user: 0, opponent: 0 });

  const [firstSet, setFirstSet] = useState({ user: 0, opponent: 0 });
  const [secondSet, setSecondSet] = useState({ user: 0, opponent: 0 });
  const [thirdSet, setThirdSet] = useState({ user: 0, opponent: 0 });

  function sendToDatabase(bool) {
    const currentUser = auth.currentUser;
    const db = getDatabase();
    const gameRef = ref(db, `users/${currentUser.uid}/games`);
    if (bool === true) {
      sets.user += 1;
    } else {
      sets.opponent += 1;
    }
    push(
      gameRef,
      {
        opponent: params.opponent,
        court: params.court,
        firstSet: firstSet,
        secondSet: secondSet,
        thirdSet: thirdSet,
        sets: sets,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        userWon: bool
      }
    );
  }

  const addScore = (player) => {
    // Add score to user
    if (player === 'user') {
      // Finish whole game
      if (sets.user === 1 && games.user === 5 && points.user === 40) {
        sendToDatabase(true);
        Alert.alert('You won!');
        navigation.navigate('Games', {
          sets: ({ user: sets.user + 1, opponent: sets.opponent }),
          firstSet: firstSet,
          secondSet: secondSet,
          thirdSet: thirdSet,
          opponent: params.opponent,
          court: params.court
        });
      }
      // Finish set (needs a two point difference)
      else if (games.user >= 5 && points.user === 40 && games.user != games.opponent) {
        setSets({ user: sets.user + 1, opponent: sets.opponent });
        setGames({ user: 0, opponent: 0 });
        setPoints({ user: 0, opponent: 0 });
        if (sets.user === 0 && sets.opponent === 0) {
          setFirstSet({ user: games.user + 1, opponent: games.opponent });
        }
      }
      // Finish game
      else if (points.user === 40) {
        setGames({ user: games.user + 1, opponent: games.opponent });
        setPoints({ user: 0, opponent: 0 });
      }
      // Add points
      else {
        if (points.user === 30) {
          setPoints({ user: points.user + 10, opponent: points.opponent });
        } else {
          setPoints({ user: points.user + 15, opponent: points.opponent });
        }
      }
      if (sets.user === 1 && sets.opponent === 1) {
        setThirdSet({ user: games.user + 1, opponent: games.opponent });
      } else if (sets.user === 1 && sets.opponent === 0) {
        setSecondSet({ user: games.user + 1, opponent: games.opponent });
      } else if (sets.user === 0 && sets.opponent === 1) {
        setSecondSet({ user: games.user + 1, opponent: games.opponent });
      }
    }
    // Add score to opponent
    else {
      // Finish whole game
      if (sets.opponent === 1 && games.opponent === 5 && points.opponent === 40) {
        sendToDatabase(false);
        Alert.alert('Opponent won!');
        navigation.navigate('Games', {
          sets: ({ user: sets.user, opponent: sets.opponent + 1 }),
          firstSet: firstSet,
          secondSet: secondSet,
          thirdSet: thirdSet,
          opponent: params.opponent,
          court: params.court
        });
      }
      // Finish set (needs a two point difference)
      else if (games.opponent >= 5 && points.opponent === 40 && games.user != games.opponent) {
        setSets({ user: sets.user, opponent: sets.opponent + 1 });
        setGames({ user: 0, opponent: 0 });
        setPoints({ user: 0, opponent: 0 });
        if (sets.user === 0 && sets.opponent === 0) {
          setFirstSet({ user: games.user, opponent: games.opponent + 1 });
        }
      }
      // Finish game
      else if (points.opponent === 40) {
        setGames({ user: games.user, opponent: games.opponent + 1 });
        setPoints({ user: 0, opponent: 0 });
      }
      // Add points
      else {
        if (points.opponent === 30) {
          setPoints({ user: points.user, opponent: points.opponent + 10 });
        } else {
          setPoints({ user: points.user, opponent: points.opponent + 15 });
        }
      }
      if (sets.user === 1 && sets.opponent === 1) {
        setThirdSet({ user: games.user, opponent: games.opponent + 1 });
      } else if (sets.user === 1 && sets.opponent === 0) {
        setSecondSet({ user: games.user, opponent: games.opponent + 1 });
      } else if (sets.user === 0 && sets.opponent === 1) {
        setSecondSet({ user: games.user, opponent: games.opponent + 1 });
      }
    }
  }



  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 40 }}>Scoreboard</Text>
      <Text>Game at {params.court ? <Text>{params.court}</Text> : <Text>a court</Text>}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text>Placeholder </Text>
        <Text>User </Text>
        {params.opponent ? <Text>{params.opponent}</Text> : <Text>Opponent</Text>}
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text>Points </Text>
        <Text>{points.user} </Text>
        <Text>{points.opponent}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text>Games </Text>
        <Text>{games.user} </Text>
        <Text>{games.opponent}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text>Sets </Text>
        <Text>{sets.user} </Text>
        <Text>{sets.opponent}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button title='Undo' />
        <Button title='<<' onPress={() => addScore('user')} />
        <Button title='>>' onPress={() => addScore('opponent')} />
      </View>
    </View>
  );
}
