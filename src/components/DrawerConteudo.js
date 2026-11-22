import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import Avatar from './Avatar';
import useUsuario from '../hooks/useUsuario';

export default function DrawerConteudo(props) {
  const { usuario, sair } = useUsuario();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.cabecalho}>
        <Avatar nome={usuario.nome} fotoUrl={usuario.fotoUrl} />
        <Text style={styles.nome}>{usuario.nome}</Text>
        <Text style={styles.email}>{usuario.email}</Text>
      </View>

      <DrawerItemList {...props} />

      <DrawerItem
        label="Sair"
        onPress={sair}
        icon={({ size }) => <Ionicons name="log-out-outline" color="#ff4757" size={size} />}
        labelStyle={styles.sair}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
    marginBottom: 8,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2f3542',
    marginTop: 10,
  },
  email: {
    fontSize: 13,
    color: '#747d8c',
  },
  sair: {
    color: '#ff4757',
  },
});
