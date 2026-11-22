import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import Avatar from '../components/Avatar';
import ReservaCard from '../components/ReservaCard';
import useUsuario from '../hooks/useUsuario';

export default function PerfilScreen() {
  const { usuario, preferencias, reservas, atualizarPerfil, atualizarPreferencias } = useUsuario();
  const [nome, setNome] = useState(usuario.nome);
  const [cidade, setCidade] = useState(usuario.cidade);
  const [mensagem, setMensagem] = useState(null);

  const avisarErro = () => setMensagem('Não foi possível salvar. Verifique sua conexão.');

  const mudarPreferencia = (dados) => {
    atualizarPreferencias(dados).catch(avisarErro);
  };

  const escolherFoto = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!resultado.canceled) {
      atualizarPerfil({ fotoUrl: resultado.assets[0].uri }).catch(avisarErro);
    }
  };

  const salvarDados = async () => {
    if (!nome.trim()) {
      setMensagem('O nome não pode ficar vazio.');
      return;
    }
    try {
      await atualizarPerfil({ nome: nome.trim(), cidade: cidade.trim() });
      setMensagem('Dados salvos!');
    } catch {
      avisarErro();
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <View style={[styles.secao, styles.topo]}>
        <TouchableOpacity onPress={escolherFoto}>
          <Avatar nome={usuario.nome} fotoUrl={usuario.fotoUrl} tamanho={96} />
          <View style={styles.iconeCamera}>
            <Ionicons name="camera" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={styles.nome}>{usuario.nome}</Text>
        <Text style={styles.email}>{usuario.email}</Text>
      </View>

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>Dados pessoais</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text style={styles.label}>Cidade</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: São Paulo, SP"
          value={cidade}
          onChangeText={setCidade}
        />

        <TouchableOpacity style={styles.botao} onPress={salvarDados}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>
        {mensagem && <Text style={styles.mensagem}>{mensagem}</Text>}
      </View>

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>Preferências de reserva</Text>

        <Text style={styles.label}>Quarto preferido</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={preferencias.quarto}
            onValueChange={(valor) => mudarPreferencia({ quarto: valor })}
          >
            <Picker.Item label="Quarto simples (1 cama)" value="simples" />
            <Picker.Item label="Suíte master (2 camas)" value="master" />
            <Picker.Item label="Suíte hiper (3 camas)" value="blaster" />
          </Picker>
        </View>

        <Text style={styles.label}>Pagamento preferido</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={preferencias.pagamento}
            onValueChange={(valor) => mudarPreferencia({ pagamento: valor })}
          >
            <Picker.Item label="Crédito" value="credito" />
            <Picker.Item label="Débito" value="debito" />
            <Picker.Item label="Pix" value="pix" />
          </Picker>
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.label}>Café da manhã incluso</Text>
          <Switch
            value={preferencias.cafe}
            onValueChange={(valor) => mudarPreferencia({ cafe: valor })}
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.label}>Receber notificações</Text>
          <Switch
            value={preferencias.notificacoes}
            onValueChange={(valor) => mudarPreferencia({ notificacoes: valor })}
          />
        </View>
      </View>

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>Minhas reservas ({reservas.length})</Text>
        {reservas.length === 0 ? (
          <Text style={styles.vazio}>Você ainda não fez nenhuma reserva.</Text>
        ) : (
          reservas.map((reserva) => <ReservaCard key={reserva.id} reserva={reserva} />)
        )}
      </View>
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
  secao: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  topo: {
    alignItems: 'center',
  },
  iconeCamera: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#2f3542',
    borderRadius: 14,
    padding: 6,
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2f3542',
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    color: '#747d8c',
  },
  tituloSecao: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2f3542',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
    color: '#2f3542',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  botao: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mensagem: {
    marginTop: 8,
    textAlign: 'center',
    color: '#57606f',
  },
  vazio: {
    color: '#747d8c',
  },
});
