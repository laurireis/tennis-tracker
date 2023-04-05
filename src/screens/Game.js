import { Button, Text, View } from "react-native";
import { styles } from "../components/styles";

export default function GameStack({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>njuu nyt ois toi peli käynnis</Text>
      <Button
        title="End game"
        onPress={() => navigation.navigate('Games')}
      />
    </View>
  );
}
