import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Button } from "@rneui/base";
import { onAuthStateChanged } from 'firebase/auth';
import { getDatabase, onValue, ref } from "firebase/database";
import { useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { auth } from '../components/firebaseConfig';
import { styles } from "../components/styles";
import Statistics from "./Statistics";
import { Card, Title } from "react-native-paper";
import _ from "lodash";

const Stack = createStackNavigator();

function GamesStack({ navigation }) {
  const [games, setGames] = useState([]);
  const [user, setUser] = useState({});
  const currentUser = auth.currentUser;
  const isFocused = useIsFocused();
  const thirdSetNotPlayed = { opponent: 0, user: 0 };

  useEffect(() => {
    console.log('isFocused', isFocused);
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    if (isFocused) {
      fetchData();
    }
    return subscriber;
  }, [isFocused]);

  const fetchData = () => {
    if (!currentUser) return;
    const db = getDatabase();
    const gamesRef = ref(db, `users/${currentUser.uid}/games`);
    const unsubscribe = onValue(gamesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      const list = Object.keys(data).map((key) => ({
        id: key,
        ...data[key]
      }));
      setGames(list);
    });
    return () => { unsubscribe() };
  }

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Button
            buttonStyle={[styles.button, { marginTop: 40, marginBottom: 10 }]}
            title="Statistics"
            onPress={() => navigation.navigate('Statistics', {
              games: games
            })}
          />
          <FlatList
            data={games.reverse()}
            renderItem={({ item }) => (
              <Card style={styles.playedGame}>
                <Card.Title title={item.date} subtitle={item.time} />
                <Card.Content>
                  <Title>Game at {item.court} against {item.opponent}</Title>
                  <Text>{item.sets.user} - {item.sets.opponent}</Text>
                  <Text>
                    ({item.firstSet.user} - {item.firstSet.opponent}),
                    ({item.secondSet.user} - {item.secondSet.opponent})
                    {_.isEqual(item.thirdSet, thirdSetNotPlayed) ? '' : ', (' +
                        item.thirdSet.user + ' - ' + item.thirdSet.opponent + ')'}
                  </Text>
                  {item.userWon
                    ? <Text style={{ color: 'limegreen' }}>You won!</Text>
                    : <Text style={{ color: 'red' }}>You lost!</Text>
                  }
                </Card.Content>
              </Card>
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => (
              <View style={styles.playedGame}>
                <Text style={styles.logIn}>No games played yet</Text>
              </View>
            )}
          />
        </>
      ) : (
        <>
          <Text style={styles.logIn}>Please log in first</Text>
        </>
      )}
    </View>
  );
}

export default function Games() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GamesStack" component={GamesStack} options={{ headerShown: false }} />
      <Stack.Screen name="Statistics" component={Statistics} />
    </Stack.Navigator>
  );
}
