import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';

import Header from '../components/Header';
import PlaceCard from '../components/PlaceCard';
import { LISTA_PLACES } from '../services/placesService';

export default function ListaScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <Header />

      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800' }}
        style={styles.imagemTopo}
      />

      {LISTA_PLACES.map((item) => (
        <PlaceCard
          key={item.id}
          item={item}
          onPress={() => navigation.navigate('Detalhes', { item })}
        />
      ))}
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
  imagemTopo: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
  },
});
