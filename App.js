import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from './screens/MainMenu';
import GameScreen from './screens/GameScreen';
import LevelSelectScreen from './screens/LevelSelectScreen';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    console.log('App component mounted');
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="LevelSelectScreen" component={LevelSelectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
