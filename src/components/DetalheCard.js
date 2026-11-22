import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function DetalheCard({ detalhe }) {
  return (
    <View style={styles.cardDetalhe}>
      <Image source={{ uri: detalhe.imagemUrl }} style={styles.imagemDetalhe} />
      <Text style={styles.tituloDetalhe}>{detalhe.titulo}</Text>
      <Text style={styles.textoDetalhe}>{detalhe.descricao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardDetalhe: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
  },
  imagemDetalhe: {
    width: '100%',
    height: 160,
    borderRadius: 6,
  },
  tituloDetalhe: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#2f3542',
  },
  textoDetalhe: {
    fontSize: 13,
    color: '#57606f',
    marginTop: 4,
    lineHeight: 18,
  },
});
