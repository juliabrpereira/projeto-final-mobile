import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu Perfil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f6fa',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2f3542',
  },
});
