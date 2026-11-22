import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import HomeStack from './HomeStack';
import PerfilScreen from '../screens/PerfilScreen';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerActiveTintColor: '#1e90ff',
          headerTintColor: '#2f3542',
        }}
      >
        <Drawer.Screen
          name="Inicio"
          component={HomeStack}
          options={{
            title: 'Início',
            drawerIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
          }}
        />
        <Drawer.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{
            drawerIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
