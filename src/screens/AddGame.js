import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../components/styles";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/firebaseConfig';
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Input } from '@rneui/themed';
import Game from "./Game";

const Stack = createStackNavigator();

function AddGameStack({ navigation }) {
  const [user, setUser] = useState({});
  const [opponent, setOpponent] = useState('');
  const [court, setCourt] = useState('');

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      console.log('user', JSON.stringify(user));
      setUser(user);
    });
    return subscriber;
  }, []);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Input
            onChangeText={(text) => setOpponent(text)}
            value={opponent}
            placeholder="Opponent"
          />
          <Input
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
