import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button } from '@rneui/themed';
import { TextInput } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../components/firebaseConfig';
import { styles } from "../components/styles";
import Game from "./Game";

const Stack = createStackNavigator();

function AddGameStack({ navigation }) {
  const [user, setUser] = useState({});
  const [opponent, setOpponent] = useState('');
  const [court, setCourt] = useState('');

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return subscriber;
  }, []);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setOpponent(text)}
            value={opponent}
            placeholder="Opponent"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setCourt(text)}
            value={court}
            placeholder="Court"
          />
          <Button
            buttonStyle={styles.button}
            title='Start game'
            onPress={() => {
              navigation.navigate('Game', {
                opponent: opponent,
                court: court
              });
            }}
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
