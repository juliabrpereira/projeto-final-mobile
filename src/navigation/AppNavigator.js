import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerNavigator from './DrawerNavigator';
import Carregando from '../components/Carregando';
import LoginScreen from '../screens/LoginScreen';
import useUsuario from '../hooks/useUsuario';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { usuario, iniciando } = useUsuario();

  if (iniciando) {
    return (
      <View style={styles.carregando}>
        <Carregando mensagem="Carregando..." />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {usuario ? (
          <Stack.Screen name="App" component={DrawerNavigator} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  carregando: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f6fa',
  },
});
