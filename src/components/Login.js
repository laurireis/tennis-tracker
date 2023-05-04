import { useState } from "react";
import { View, Text } from "react-native";
import { Button } from '@rneui/themed';
import { TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "./firebaseConfig";
import { styles } from "./styles";

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(true);

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const loginUser = async () => {
    try {
      let res = await signInWithEmailAndPassword(auth, email, password);
      if (res && res.user) {
        onToggleSnackBar();
      }
      navigation.popToTop();
    } catch (error) {
      if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
        setError('Invalid email or password');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('Email already in use');
      } else {
        setError('Problems signing in');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      {error && <Text style={styles.error}>{error}</Text>}

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
      <Button buttonStyle={styles.button} title="Login" onPress={loginUser} disabled={!email || !password} />
    </View>
  );
}
