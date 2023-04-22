import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import Home from '../screens/Home';
import AddGame from '../screens/AddGame';
import Games from '../screens/Games';

const Tab = createMaterialBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fa5aca"
        inactiveColor="white"
        barStyle={{ backgroundColor: '#4d048d' }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Add Game') {
              iconName = focused ? 'ios-add' : 'ios-add-outline';
            } else if (route.name === 'Games') {
              iconName = focused ? 'tennisball' : 'tennisball-outline';
            }
            return <Ionicons name={iconName} size={20} color={color} />;
          }
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Add Game" component={AddGame} />
        <Tab.Screen name="Games" component={Games} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
