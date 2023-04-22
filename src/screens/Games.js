import { FlatList, Text, View } from "react-native";
import { styles } from "../components/styles";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/firebaseConfig';
import { getDatabase, onValue, ref } from "firebase/database";
import { useIsFocused } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { createStackNavigator } from "@react-navigation/stack";
import Statistics from "./Statistics";

const Stack = createStackNavigator();

function GamesStack({ navigation }) {
  const [games, setGames] = useState([]);
  const [user, setUser] = useState({});
  const currentUser = auth.currentUser;
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log('isFocused', isFocused);
    const subscriber = onAuthStateChanged(auth, (user) => {
      console.log('user', JSON.stringify(user));
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
    <>
      {user ? (
        <View style={styles.container}>
          <Button
            buttonStyle={[styles.button, { marginTop: 40, marginBottom: 10 }]}
            title="Statistics"
            onPress={() => navigation.navigate('Statistics', {
              games: games
            })}
          />
          <FlatList
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            data={games.reverse()}
            renderItem={({ item }) => (
              <View style={styles.playedGame}>
                <Text>{item.date}</Text>
                <Text>Game at {item.court} against {item.opponent}</Text>
                <Text>{item.sets.user} - {item.sets.opponent}</Text>
                <Text>({item.firstSet.user} - {item.firstSet.opponent}), ({item.secondSet.user} - {item.secondSet.opponent}), ({item.thirdSet.user} - {item.thirdSet.opponent})</Text>
                {item.userWon
                  ? <Text style={{ color: 'limegreen' }}>You won!</Text>
                  : <Text style={{ color: 'red' }}>You lost!</Text>
                }
              </View>
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => (
              <View style={styles.playedGame}>
                <Text>No games played yet</Text>
              </View>
            )}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Text>Please log in first</Text>
        </View>
      )}
    </>
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
