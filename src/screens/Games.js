import { FlatList, Text, View } from "react-native";
import { styles } from "../components/styles";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/firebaseConfig';
import { getDatabase, onValue, ref } from "firebase/database";

export default function Games() {
  const [games, setGames] = useState([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const db = getDatabase();
    const gamesRef = ref(db, `users/${currentUser.uid}/games`);
    const unsubscribe = onValue(gamesRef, (snapshot) => {
      const data = snapshot.val();
      const list = Object.keys(data).map((key) => ({
        id: key,
        ...data[key]
      }));
      setGames(list);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {currentUser ? (
        <>
          <FlatList
            data={games}
            renderItem={({ item }) => (
              <View style={styles.gameInfo}>
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
            keyExtractor={(item) => item.date}
          />
        </>
      ) : (
        <>
          <Text>Please log in first</Text>
        </>
      )}
    </View>
  );
}

