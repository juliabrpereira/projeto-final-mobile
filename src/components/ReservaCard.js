import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const QUARTOS = {
  simples: 'Quarto simples',
  master: 'Suíte master',
  blaster: 'Suíte hiper',
};

export default function ReservaCard({ reserva }) {
  return (
    <View style={styles.card}>
      <Text style={styles.hotel}>{reserva.hotel}</Text>
      <Text style={styles.filme}>{reserva.filme}</Text>

      <View style={styles.linha}>
        <Ionicons name="calendar-outline" size={14} color="#57606f" />
        <Text style={styles.texto}>
          {reserva.dataViagem} · {reserva.diasViagem} dias · {reserva.quantidadePessoas} pessoa(s)
        </Text>
      </View>

      <View style={styles.linha}>
        <Ionicons name="bed-outline" size={14} color="#57606f" />
        <Text style={styles.texto}>
          {QUARTOS[reserva.quarto]}{reserva.incluiCafe ? ' · com café da manhã' : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f6fa',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  hotel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2f3542',
  },
  filme: {
    fontSize: 13,
    color: '#1e90ff',
    marginBottom: 4,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  texto: {
    marginLeft: 6,
    fontSize: 12,
    color: '#57606f',
  },
});
