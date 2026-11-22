import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Carregando from '../components/Carregando';
import Header from '../components/Header';
import PlaceCard from '../components/PlaceCard';
import useHoteisFilmagem from '../hooks/useHoteisFilmagem';

export default function ListaScreen({ navigation }) {
  const { hoteis, carregando, erro, recarregar } = useHoteisFilmagem();
  const [busca, setBusca] = useState('');

  const termo = busca.trim().toLowerCase();
  const hoteisFiltrados = hoteis.filter((item) =>
    `${item.filme} ${item.hotel} ${item.pais}`.toLowerCase().includes(termo)
  );

  const renderizarVazio = () => {
    if (carregando) {
      return <Carregando mensagem="Buscando hotéis no Wikidata..." />;
    }

    if (erro) {
      return (
        <View style={styles.aviso}>
          <Text style={styles.textoAviso}>Não foi possível carregar os hotéis.</Text>
          <TouchableOpacity style={styles.botao} onPress={recarregar}>
            <Text style={styles.textoBotao}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.aviso}>
        <Text style={styles.textoAviso}>{`Nenhum resultado para "${busca}".`}</Text>
      </View>
    );
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      data={carregando || erro ? [] : hoteisFiltrados}
      keyExtractor={(item) => item.id}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <View>
          <Header />
          <TextInput
            style={styles.busca}
            placeholder="Filtrar por filme, hotel ou país"
            value={busca}
            onChangeText={setBusca}
          />
          {!carregando && !erro && (
            <Text style={styles.contador}>{hoteisFiltrados.length} hotéis encontrados</Text>
          )}
        </View>
      }
      ListEmptyComponent={renderizarVazio}
      renderItem={({ item }) => (
        <PlaceCard item={item} onPress={() => navigation.navigate('Detalhes', { item })} />
      )}
    />
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
  busca: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  contador: {
    fontSize: 12,
    color: '#747d8c',
    marginBottom: 12,
  },
  aviso: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  textoAviso: {
    color: '#57606f',
    fontSize: 14,
    marginBottom: 12,
  },
  botao: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
