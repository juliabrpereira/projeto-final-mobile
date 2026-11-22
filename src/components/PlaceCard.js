import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PlaceCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.cardLista} onPress={onPress}>
      <Image source={{ uri: item.imagemUrl }} style={styles.imagemCard} />

      <View style={styles.infoCard}>
        <View style={styles.colunaEsquerda}>
          <Text style={styles.nomeCard}>{item.nome}</Text>
          <Text style={styles.producaoCard}>{item.producao}</Text>
        </View>

        <View style={styles.colunaDireita}>
          <Text style={styles.textoDireita}>{item.local}</Text>
          <Text style={styles.precoCard}>{item.preco}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardLista: {
    flexDirection: 'row',
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
  infoCard: {
    flex: 1,
    marginLeft: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colunaEsquerda: {
    flex: 1,
    marginRight: 8,
  },
  colunaDireita: {
    alignItems: 'flex-end',
  },
  nomeCard: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f3542',
  },
  producaoCard: {
    fontSize: 13,
    color: '#747d8c',
    marginTop: 2,
  },
  textoDireita: {
    fontSize: 12,
    color: '#747d8c',
    textAlign: 'right',
  },
  precoCard: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2ed573',
    marginTop: 2,
  },
});
