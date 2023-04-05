import { Text, View } from "react-native";
import { styles } from "../components/styles";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/firebaseConfig';

export default function Games() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      console.log('user', JSON.stringify(user));
      setUser(user);
      if (user) { setLoggedIn(true) } else { setLoggedIn(false) }
    });
    return subscriber;
  }, []);

  return (
    <View style={styles.container}>
      {loggedIn ? (
        <Text>hyvä peli :D</Text>
      ) : (
        <>
          <Text>Please log in first</Text>
        </>
      )}
    </View>
  );
}
