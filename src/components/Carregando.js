import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Carregando({ mensagem }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1e90ff" />
      <Text style={styles.texto}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  texto: {
    marginTop: 12,
    color: '#57606f',
    fontSize: 14,
  },
});
