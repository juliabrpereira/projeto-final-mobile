import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PlaceCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.cardLista} onPress={onPress}>
      {item.imagemUrl ? (
        <Image source={{ uri: item.imagemUrl }} style={styles.imagemCard} />
      ) : (
        <View style={[styles.imagemCard, styles.semImagem]}>
          <Ionicons name="bed-outline" size={32} color="#a4b0be" />
        </View>
      )}

      <View style={styles.infoCard}>
        <Text style={styles.nomeCard}>{item.hotel}</Text>
        <Text style={styles.producaoCard}>
          {item.filme}{item.ano ? ` (${item.ano})` : ''}
        </Text>
        <Text style={styles.textoLocal}>{item.pais}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#a4b0be" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardLista: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imagemCard: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },
  semImagem: {
    backgroundColor: '#f1f2f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCard: {
    flex: 1,
    marginHorizontal: 12,
  },
  nomeCard: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f3542',
  },
  producaoCard: {
    fontSize: 13,
    color: '#1e90ff',
    marginTop: 2,
  },
  textoLocal: {
    fontSize: 12,
    color: '#747d8c',
    marginTop: 2,
  },
});
