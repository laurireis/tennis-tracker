import { View, Text } from "react-native";
import { styles } from "../components/styles";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/firebaseConfig';
import { Button } from '@rneui/themed';

import LoggedIn from "../components/LoggedIn";
import Login from "../components/Login";
import Signup from "../components/SignUp";


const Stack = createStackNavigator();

function HomeStack({ navigation }) {
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
      <Text style={styles.logo}>TennisTracker</Text>
      {loggedIn ? (
        <>
          <LoggedIn user={user} />
        </>
      ) : (
        <>
          <Button buttonStyle={styles.button} title="Login" onPress={() => navigation.navigate('Login')} />
          <Button buttonStyle={styles.button} title="Signup" onPress={() => navigation.navigate('Signup')} />
        </>
      )}
    </View>
  )
}

export default function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
