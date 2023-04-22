import { signOut } from "firebase/auth";
import { View, Text } from "react-native";
import { Button } from "@rneui/themed";
import { auth } from "./firebaseConfig";
import { styles } from "./styles";

export default function LoggedIn() {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };
  const user = auth.currentUser;

  return (
    <View>{user ? <Text>Welcome {user.displayName}!</Text> : <></>}
      <Button buttonStyle={styles.button} title="Log out" onPress={logout} />
    </View>
  );
}
