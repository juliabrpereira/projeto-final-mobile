import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import HomeStack from './HomeStack';
import DrawerConteudo from '../components/DrawerConteudo';
import PerfilScreen from '../screens/PerfilScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerConteudo {...props} />}
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
  );
}
