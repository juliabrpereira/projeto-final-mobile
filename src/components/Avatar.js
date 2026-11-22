import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Avatar({ nome, fotoUrl, tamanho = 64 }) {
  const estilo = { width: tamanho, height: tamanho, borderRadius: tamanho / 2 };

  if (fotoUrl) {
    return <Image source={{ uri: fotoUrl }} style={estilo} />;
  }

  return (
    <View style={[styles.circulo, estilo]}>
      <Text style={[styles.inicial, { fontSize: tamanho / 2.5 }]}>
        {(nome || '?').charAt(0).toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circulo: {
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inicial: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
