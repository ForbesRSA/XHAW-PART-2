import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import PackagesScreen from './src/screens/PackagesScreen';
import PackageDetailScreen from './src/screens/PackageDetailScreen';
import CalculatorScreen from './src/screens/CalculatorScreen';
import ContactScreen from './src/screens/ContactScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Packages tab holds a stack so "View Details" opens the detail screen with a back arrow
function PackagesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.bg }, headerTintColor: colors.blue, headerTitleStyle: { color: colors.white } }}>
      <Stack.Screen name="PackagesList" component={PackagesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PackageDetail" component={PackageDetailScreen} options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
}

const icons = { Home: 'home', About: 'information-circle', Packages: 'game-controller', Calculator: 'calculator', Contact: 'mail' };

export default function App() {
  return (
    <NavigationContainer theme={{ ...DarkTheme, colors: { ...DarkTheme.colors, background: colors.bg, card: colors.charcoal, primary: colors.blue } }}>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.blue,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: { backgroundColor: colors.charcoal, borderTopColor: '#2A2A35', height: 62, paddingBottom: 8 },
          tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name]} size={size} color={color} />
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="About" component={AboutScreen} options={{ title: 'About Us' }} />
        <Tab.Screen name="Packages" component={PackagesStack} />
        <Tab.Screen name="Calculator" component={CalculatorScreen} options={{ title: 'Fees' }} />
        <Tab.Screen name="Contact" component={ContactScreen} options={{ title: 'Contact' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
