import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import DetalheCard from '../components/DetalheCard';
import ReservaForm from '../components/ReservaForm';
import useReservaForm from '../hooks/useReservaForm';
import { DETALHES_PLACES } from '../services/placesService';

export default function DetalhesScreen({ route }) {
  const { item } = route.params;
  const form = useReservaForm();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <Text style={styles.subtitulo}>
        Conheça {item.nome}, o lugar onde {item.producao} ganhou vida! E tenha acesso a prestigiada cultura de {item.local}:
      </Text>

      {DETALHES_PLACES.map((detalhe) => (
        <DetalheCard key={detalhe.id} detalhe={detalhe} />
      ))}

      <ReservaForm form={form} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  conteudo: {
    padding: 16,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
    color: '#57606f',
  },
});
