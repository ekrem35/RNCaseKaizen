import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home/HomeScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={Home} name="Home" />
    </Stack.Navigator>
  );
}
