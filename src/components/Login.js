import { View, Alert, Text } from "react-native";
import { useState } from "react";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { styles } from "./styles";
import { Input, Button } from '@rneui/themed';


export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const loginUser = async () => {
    try {
      let res = await signInWithEmailAndPassword(auth, email, password);
      if (res && res.user) { Alert.alert("Login successfull") }
      navigation.navigate("HomeStack");
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
      <Button title="Login" onPress={loginUser} disabled={!email || !password} />
    </View>
  );
}
