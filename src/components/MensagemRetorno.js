import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MensagemRetorno({ mensagem, onFechar }) {
  return (
    <View
      style={[
        styles.caixaMensagem,
        mensagem.tipo === 'sucesso' ? styles.mensagemSucesso : styles.mensagemInfo,
      ]}
    >
      <Text style={styles.tituloMensagem}>{mensagem.titulo}</Text>
      <Text style={styles.textoMensagem}>{mensagem.texto}</Text>
      <TouchableOpacity onPress={onFechar}>
        <Text style={styles.fecharMensagem}>Fechar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  caixaMensagem: {
    marginTop: 6,
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  mensagemInfo: {
    backgroundColor: '#eaf4ff',
    borderColor: '#1e90ff',
  },
  mensagemSucesso: {
    backgroundColor: '#eafaf1',
    borderColor: '#2ed573',
  },
  tituloMensagem: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
    color: '#2f3542',
  },
  textoMensagem: {
    fontSize: 14,
    color: '#2f3542',
    lineHeight: 20,
  },
  fecharMensagem: {
    marginTop: 8,
    color: '#1e90ff',
    fontWeight: '600',
    textAlign: 'right',
  },
});
