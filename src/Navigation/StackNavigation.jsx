import * as React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

function A() {
  return <View />;
}

function B() {
  return <View />;
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="A"
        component={A}
        options={{tabBarLabel: 'Beranda!', headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="B"
        component={B}
        options={{tabBarLabel: 'Settings!', headerShown: false}}
      />
    </SettingsStack.Navigator>
  );
}

export default function StackNavigation() {
  return (
    <SafeAreaProvider>
      <NavigationContainer screenOptions={{headerShown: false}}>
        <Tab.Navigator>
          <Tab.Screen
            name="Beranda"
            component={HomeStackScreen}
            options={{
              headerShown: false,
              tabBarLabel: 'Beranda',
              tabBarIcon: ({color, size}) => (
                <Icon name="beranda" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsStackScreen}
            options={{
              headerShown: false,
              tabBarLabel: 'Settings',
              tabBarIcon: ({color, size}) => (
                <Icon name="settings" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
