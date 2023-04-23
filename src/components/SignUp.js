import { useState } from "react";
import { View, Alert, Text } from "react-native";
import { Button } from '@rneui/themed';
import { TextInput } from "react-native-paper";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import { auth } from "./firebaseConfig";
import { styles } from "./styles";

export default function Signup({ navigation }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const createAccount = async () => {
    try {
      if (password === confirmPassword) {
        let res = await createUserWithEmailAndPassword(auth, email, password);
        if (res && res.user) {
          Alert.alert("Creating user successful.");
          updateProfile(auth.currentUser, {
            displayName: username
          }).then(() => {
            signOut(auth);
            navigation.navigate("HomeStack");
          }).catch((e) => {
            console.log(e);
          })
        }
      } else {
        setError("Passwords don't match");
      }
    } catch (e) {
      setError('Creating user unsuccessful');
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Signup</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter username"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Enter email address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter password"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholder="Confirm password"
        autoCapitalize="none"
        placeholderTextColor="#aaa"

      />

      <Button
        buttonStyle={styles.button}
        title="Create Account"
        onPress={createAccount}
        disabled={!username || !email || !password || !confirmPassword}
      />
    </View>
  );
}
