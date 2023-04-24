import { Text, View, Alert } from "react-native";
import { styles } from "../components/styles";
import { useState } from "react";
import { auth } from "../components/firebaseConfig";
import { getDatabase, ref, push } from "firebase/database";
import { IconButton } from "react-native-paper";

export default function Game({ navigation, route }) {
  const params = route.params;
  const currentUser = auth.currentUser;
  const [points, setPoints] = useState({ user: 0, opponent: 0 });
  const [games, setGames] = useState({ user: 0, opponent: 0 });
  const [sets, setSets] = useState({ user: 0, opponent: 0 });

  const [firstSet, setFirstSet] = useState({ user: 0, opponent: 0 });
  const [secondSet, setSecondSet] = useState({ user: 0, opponent: 0 });
  const [thirdSet, setThirdSet] = useState({ user: 0, opponent: 0 });

  const resetScore = () => {
    setPoints({ user: 0, opponent: 0 });
    setGames({ user: 0, opponent: 0 });
    setSets({ user: 0, opponent: 0 });
    setFirstSet({ user: 0, opponent: 0 });
    setSecondSet({ user: 0, opponent: 0 });
    setThirdSet({ user: 0, opponent: 0 });
  };

  function sendToDatabase(bool) {
    const db = getDatabase();
    const gameRef = ref(db, `users/${currentUser.uid}/games`);
    if (bool === true) {
      sets.user += 1;
    } else {
      sets.opponent += 1;
    }
    if (params.opponent === '') {
      params.opponent = 'an opponent';
    }
    if (params.court === '') {
      params.court = 'a court';
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
        navigation.pop();
        navigation.navigate('Games');
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
        navigation.pop();
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

  const Row = ({ children }) => (
    <View style={styles.gameGridRow}>{children}</View>
  )

  const Col = ({ numRows, children }) => {
    return (
      <View style={styles[`${numRows}col`]}>{children}</View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 30, color: '#fa5aca' }}>Scoreboard</Text>
      <View style={styles.gameGrid}>
        <Row>
          <Col numRows={1}>
            <Text>Game at {params.court ? <Text>{params.court}</Text> : <Text>a court</Text>}</Text>
          </Col>
          <Col numRows={1}>
            <Text>{currentUser.displayName}</Text>
          </Col>
          <Col numRows={1}>
            {params.opponent ? <Text>{params.opponent}</Text> : <Text>Opponent</Text>}
          </Col>
        </Row>
        <Row>
          <Col numRows={1}>
            <Text>Points</Text>
          </Col>
          <Col numRows={1}>
            <Text>{points.user}</Text>
          </Col>
          <Col numRows={1}>
            <Text>{points.opponent}</Text>
          </Col>
        </Row>
        <Row>
          <Col numRows={1}>
            <Text>Games</Text>
          </Col>
          <Col numRows={1}>
            <Text>{games.user}</Text>
          </Col>
          <Col numRows={1}>
            <Text>{games.opponent}</Text>
          </Col>
        </Row>
        <Row>
          <Col numRows={1}>
            <Text>Sets</Text>
          </Col>
          <Col numRows={1}>
            <Text>{sets.user}</Text>
          </Col>
          <Col numRows={1}>
            <Text>{sets.opponent}</Text>
          </Col>
        </Row>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <IconButton icon='close-box' iconColor="red" onPress={() => resetScore()} />
          <IconButton icon='chevron-left' onPress={() => addScore('user')} />
          <IconButton icon='chevron-right' onPress={() => addScore('opponent')} />
        </View>
      </View>
    </View>
  );
}
