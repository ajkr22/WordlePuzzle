import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WelcomeScreen from './src/Screens/WelcomeScreen';

import GameScreen from './src/Screens/GameScreen';
import PointScreen from './src/Screens/PointScreen';
import LeaderScreen from './src/Screens/LeaderScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Point"
          component={PointScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Leader" component={LeaderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
