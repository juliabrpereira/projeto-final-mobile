import React from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DetalheCard({ item }) {
  const abrirMapa = () => {
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`);
  };

  return (
    <View style={styles.cardDetalhe}>
      {item.imagemUrl && <Image source={{ uri: item.imagemUrl }} style={styles.imagemDetalhe} />}

      <Text style={styles.tituloDetalhe}>{item.hotel}</Text>
      <Text style={styles.textoDetalhe}>
        Locação do filme {item.filme}{item.ano ? `, lançado em ${item.ano}` : ''}.
      </Text>

      <View style={styles.linha}>
        <Ionicons name="flag-outline" size={16} color="#57606f" />
        <Text style={styles.textoLinha}>{item.pais}</Text>
      </View>

      <View style={styles.linha}>
        <Ionicons name="location-outline" size={16} color="#57606f" />
        <Text style={styles.textoLinha}>
          {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
        </Text>
      </View>

      <TouchableOpacity style={styles.botaoMapa} onPress={abrirMapa}>
        <Ionicons name="map-outline" size={18} color="#fff" />
        <Text style={styles.textoBotao}>Ver no mapa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardDetalhe: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    elevation: 2,
  },
  imagemDetalhe: {
    width: '100%',
    height: 200,
    borderRadius: 6,
  },
  tituloDetalhe: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#2f3542',
  },
  textoDetalhe: {
    fontSize: 14,
    color: '#57606f',
    marginTop: 4,
    marginBottom: 8,
    lineHeight: 20,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  textoLinha: {
    marginLeft: 6,
    color: '#57606f',
  },
  botaoMapa: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e90ff',
    borderRadius: 6,
    paddingVertical: 10,
    marginTop: 12,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
  },
});
