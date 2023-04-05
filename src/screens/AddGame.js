import { Text, TextInput, View } from "react-native";
import { styles } from "../components/styles";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/firebaseConfig';
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Game from "./Game";

const Stack = createStackNavigator();

function AddGameStack({ navigation }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const [opponent, setOpponent] = useState('');
  const [court, setCourt] = useState('');

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
        <>
          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 7 }}
            onChangeText={(text) => setOpponent(text)}
            value={opponent}
            placeholder="Opponent"
          />
          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 7 }}
            onChangeText={(text) => setCourt(text)}
            value={court}
            placeholder="Court"
          />
          <Button
            title='Start game'
            onPress={() => navigation.navigate('Game')}
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

export default function AddGame() {
  return (
    <Stack.Navigator
      initialRouteName="AddGameStack"
    >
      <Stack.Screen name="AddGameStack" component={AddGameStack} options={{ headerShown: false }} />
      <Stack.Screen name="Game" component={Game} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
