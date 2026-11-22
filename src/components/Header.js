import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function Header() {
  return (
    <>
      <Text style={styles.tituloPrincipal}>Iplace</Text>
      <Text style={styles.subtitulo}>Se hospede no local do seu filme ou livro favorito!</Text>
    </>
  );
}

const styles = StyleSheet.create({
  tituloPrincipal: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
    color: '#2f3542',
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
    color: '#57606f',
  },
});
