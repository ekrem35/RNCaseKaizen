import React from 'react';

import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import screens from '../screens';

import icons from './icons';

const Tab = createBottomTabNavigator();

const routeLabels = {
  HomeScreen: 'Keşfet',
  WalletScreen: 'Daha Cüzdan',
  DahaDahaScreen: 'Daha Daha',
};

function getRouteIcon(routeName: string, isFocused: boolean) {
  switch (routeName) {
    case 'HomeScreen':
      return <Image source={isFocused ? icons.homeActive : icons.home} />;
    case 'WalletScreen':
      return <Image source={isFocused ? icons.walletActive : icons.wallet} />;

    case 'DahaDahaScreen':
      return <Image source={icons.daha} />;
  }
}

function TabBar(props: BottomTabBarProps) {
  const {state, descriptors, navigation} = props;

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = routeLabels[route.name as never];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        switch (route.name) {
          case 'DahaDahaScreen':
            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={{marginTop: -36}}
                onLongPress={onLongPress}>
                <Image source={icons.daha} />
              </TouchableOpacity>
            );
          default:
            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={{
                  width: 80,
                  height: '100%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  display: 'flex',
                }}
                onLongPress={onLongPress}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {getRouteIcon(route.name, isFocused)}

                  <Text
                    style={{
                      color: isFocused ? '#28AF6E' : '#979798',
                      textAlign: 'center',
                      fontFamily: 'Helvetica',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      fontSize: 10,
                      lineHeight: 12,
                      letterSpacing: -0.24,
                      marginTop: 4.87,
                    }}>
                    {label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
        }
      })}
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={TabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="HomeScreen" component={screens.Home} />
      <Tab.Screen name="DahaDahaScreen" component={screens.DahaDaha} />
      <Tab.Screen name="WalletScreen" component={screens.Wallet} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: '#fff',
    height: 54,
  },
});
