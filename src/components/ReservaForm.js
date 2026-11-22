import React from 'react';
import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

import MensagemRetorno from './MensagemRetorno';

export default function ReservaForm({ form }) {
  return (
    <View style={styles.secaoParte3}>
      <Text style={styles.subtituloForm}>
        Reserve:
      </Text>

      <Text style={styles.label}>1. Nome Completo:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome..."
        value={form.nome}
        onChangeText={form.setNome}
      />

      <Text style={styles.label}>2. E-mail de Contato:</Text>
      <TextInput
        style={styles.input}
        placeholder="seuemail@exemplo.com"
        keyboardType="email-address"
        value={form.email}
        onChangeText={form.setEmail}
      />

      <Text style={styles.label}>3. Cidade de Origem:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: São Paulo, SP"
        value={form.cidadeOrigem}
        onChangeText={form.setCidadeOrigem}
      />

      <Text style={styles.label}>4. Comentários / Observações:</Text>
      <TextInput
        style={[styles.input, { height: 60 }]}
        placeholder="Algum pedido especial?"
        multiline
        value={form.comentarios}
        onChangeText={form.setComentarios}
      />

      <Text style={styles.label}>Quarto escolhido:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.quarto}
          onValueChange={(itemValue) => form.setQuarto(itemValue)}
        >
          <Picker.Item label="Quarto simples (1 cama)" value="simples" />
          <Picker.Item label="Suite master (2 camas)" value="master" />
          <Picker.Item label="Suite hiper (3 camas)" value="blaster" />
        </Picker>
      </View>

      <Text style={styles.label}>Tipo de pagamento:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.pagamento}
          onValueChange={(itemValue) => form.setPagamento(itemValue)}
        >
          <Picker.Item label="Credito" value="credito" />
          <Picker.Item label="Debito" value="debito" />
          <Picker.Item label="Pix" value="pix" />
        </Picker>
      </View>

      <Text style={styles.label}>Data de início:</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        keyboardType="numeric"
        maxLength={10}
        value={form.dataViagem}
        onChangeText={form.handleDataChange}
      />

      <Text style={styles.label}>Duração da viagem (Dias): {form.diasViagem}</Text>
      <Slider
        minimumValue={1}
        maximumValue={30}
        step={1}
        value={form.diasViagem}
        onValueChange={form.setDiasViagem}
        minimumTrackTintColor="#1e90ff"
      />

      <Text style={styles.label}>Quantidade de pessoas: {form.quantidadePessoas}</Text>
      <Slider
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={form.quantidadePessoas}
        onValueChange={form.setQuantidadePessoas}
        minimumTrackTintColor="#2ed573"
      />

      <View style={styles.switchRow}>
        <Text style={styles.labelSwitch}>Incluir café da manhã</Text>
        <Switch
          value={form.incluiCafe}
          onValueChange={form.setIncluiCafe}
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.labelSwitch}>Receber Notificações:</Text>
        <Switch
          value={form.receberNotificacoes}
          onValueChange={form.setReceberNotificacoes}
        />
      </View>

      <View style={styles.containerBotoes}>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#1e90ff' }]}
          onPress={form.reservar}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>Reservar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#ff4757' }]}
          onPress={form.limpar}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>Limpar Campos</Text>
        </TouchableOpacity>
      </View>

      {form.mensagem && (
        <MensagemRetorno
          mensagem={form.mensagem}
          onFechar={() => form.setMensagem(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  secaoParte3: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1b12c',
  },
  subtituloForm: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e1b12c',
    marginBottom: 12,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
    color: '#2f3542',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  labelSwitch: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2f3542',
  },
  containerBotoes: {
    marginTop: 16,
  },
  botao: {
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
