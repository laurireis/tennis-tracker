import { View, Text } from "react-native";

export default function Statistics({ route }) {
  const params = route.params;
  console.log(params)
  return (
    <View>
      <Text>{Object.values(params.games[7].userWon.toString())}</Text>
    </View>
  );
}