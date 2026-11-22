import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import DetalheCard from '../components/DetalheCard';
import ReservaForm from '../components/ReservaForm';
import useReservaForm from '../hooks/useReservaForm';

export default function DetalhesScreen({ route }) {
  const { item } = route.params;
  const form = useReservaForm(item);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <DetalheCard item={item} />
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
});
