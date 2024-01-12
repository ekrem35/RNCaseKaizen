import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';

import CampaignDetail from '../screens/CampaignDetail';

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="TabNavigatior" component={TabNavigator} />
        <Stack.Screen component={CampaignDetail} name="CampaignDetail" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
