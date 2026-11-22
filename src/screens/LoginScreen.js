import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import useUsuario from '../hooks/useUsuario';

export default function LoginScreen() {
  const { entrar, registrar } = useUsuario();
  const [modoRegistro, setModoRegistro] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const validar = () => {
    if (modoRegistro && !nome.trim()) {
      return 'Informe seu nome.';
    }
    if (!email.includes('@')) {
      return 'Informe um e-mail válido.';
    }
    if (senha.length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres.';
    }
    if (modoRegistro && senha !== confirmarSenha) {
      return 'As senhas não conferem.';
    }
    return null;
  };

  const enviar = async () => {
    const mensagemErro = validar();
    if (mensagemErro) {
      setErro(mensagemErro);
      return;
    }

    setErro(null);
    setCarregando(true);
    try {
      if (modoRegistro) {
        await registrar(nome.trim(), email.trim(), senha);
      } else {
        await entrar(email.trim(), senha);
      }
    } catch (e) {
      setErro(e.message);
      setCarregando(false);
    }
  };

  const alternarModo = () => {
    setModoRegistro(!modoRegistro);
    setErro(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <Ionicons name="film-outline" size={64} color="#1e90ff" style={styles.icone} />
        <Text style={styles.titulo}>iPlace</Text>
        <Text style={styles.subtitulo}>
          {modoRegistro ? 'Crie sua conta' : 'Entre para continuar'}
        </Text>

        {modoRegistro && (
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        {modoRegistro && (
          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
        )}

        {erro && <Text style={styles.erro}>{erro}</Text>}

        <TouchableOpacity style={styles.botao} onPress={enviar} disabled={carregando}>
          {carregando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textoBotao}>{modoRegistro ? 'Cadastrar' : 'Entrar'}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={alternarModo}>
          <Text style={styles.link}>
            {modoRegistro ? 'Já tem conta? Entrar' : 'Não tem conta? Cadastre-se'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  icone: {
    alignSelf: 'center',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2f3542',
  },
  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
    color: '#57606f',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  erro: {
    color: '#ff4757',
    marginBottom: 12,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#1e90ff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#1e90ff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
