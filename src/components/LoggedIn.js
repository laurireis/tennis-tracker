import { signOut } from "firebase/auth";
import { View, Text, Button } from "react-native";
import { auth } from "./firebaseConfig";

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
    <View>{user ? (
      <>
        <Text>Welcome {user.displayName}!</Text>
      </>
    ) : (
      <Text></Text>
    )}
      <Button title="Log out" onPress={logout} />
    </View>
  );
}
