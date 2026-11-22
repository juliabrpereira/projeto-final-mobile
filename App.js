import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppNavigator from './src/navigation/AppNavigator';
import { UsuarioProvider } from './src/hooks/useUsuario';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UsuarioProvider>
        <AppNavigator />
      </UsuarioProvider>
    </GestureHandlerRootView>
  );
}
