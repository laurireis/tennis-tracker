import { View, Text, Button, TextInput, Alert } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
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
          Alert.alert("Creating user successfull.");
          await signInWithEmailAndPassword(auth, email, password); // Sign in the user to get the updated currentUser object
          updateProfile(auth.currentUser, {
            displayName: username
          }).then(() => {
            navigation.replace("Login");
          }).catch((e) => {
            console.log(e);
          })
        }
      } else {
        setError("Passwords don't match");
      }
    } catch (e) {
      setError('Creating user unsuccessfull');
      console.log(e);
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.header}>Signup</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter email address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Confirm password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <Button
          title="Create Account"
          onPress={createAccount}
          disabled={!username || !email || !password || !confirmPassword}
        />
      </View>
    </View>
  );
}
