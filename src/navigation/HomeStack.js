import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListaScreen from '../screens/ListaScreen';
import DetalhesScreen from '../screens/DetalhesScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lista" component={ListaScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} />
    </Stack.Navigator>
  );
}
