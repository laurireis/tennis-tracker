import { View, Alert, Text } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebaseConfig";
import { styles } from "./styles";
import { Input, Button } from '@rneui/themed';

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

      <Input
        value={username}
        onChangeText={setUsername}
        placeholder="Enter username"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <Input
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Enter email address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <Input
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter password"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <Input
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
