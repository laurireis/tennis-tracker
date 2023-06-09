import { View, Text } from "react-native";
import { Button } from '@rneui/themed';
import { Snackbar } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';

import { styles } from "../components/styles";
import { auth } from '../components/firebaseConfig';
import LoggedIn from "../components/LoggedIn";
import Login from "../components/Login";
import Signup from "../components/SignUp";


const Stack = createStackNavigator();

function HomeStack({ navigation }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(true);
  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
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
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={3000}
          >
            Logged in successfully
          </Snackbar>
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
