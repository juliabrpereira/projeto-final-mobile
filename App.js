import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';


const LISTA_DESTINOS = [
  {
    id: '1',
    nome: 'Paris, França',
    imagemUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400',
  },
  {
    id: '2',
    nome: 'Tóquio, Japão',
    imagemUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
  },
  {
    id: '3',
    nome: 'Rio de Janeiro, Brasil',
    imagemUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400',
  },
  {
    id: '4',
    nome: 'Nova York, EUA',
    imagemUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400',
  },
  {
    id: '5',
    nome: 'Roma, Itália',
    imagemUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400',
  },
];

const DETALHES_DESTINO = [
  {
    id: 'd1',
    titulo: 'Arquitetura e Gastronomia',
    imagemUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400',
    // 35 palavras
    descricao: 'Explore monumentos históricos fascinantes e saboreie pratos culinários premiados ao redor de restaurantes tradicionais. A combinação de receitas seculares com arquitetura preservada oferece uma experiência inesquecível para todos os visitantes exigentes que buscam cultura.',
  },
  {
    id: 'd2',
    titulo: 'Paisagens Naturais e Parques',
    imagemUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
    // 34 palavras
    descricao: 'Desfrute de parques arborizados e praias de águas cristalinas com vistas panorâmicas impressionantes durante o pôr do sol. O contato com a natureza proporciona momentos de relaxamento profundo e renovação de energias para a rotina diária.',
  },
  {
    id: 'd3',
    titulo: 'Museus e Arte Contemporânea',
    imagemUrl: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400',
    // 36 palavras
    descricao: 'Visite galerias consagradas que abrigam coleções de artistas renascentistas e exposições modernas e interativas. A riqueza cultural presente nesses espaços educativos permite mergulhar fundo na história do pensamento humano e nas expressões artísticas globais.',
  },
  {
    id: 'd4',
    titulo: 'Vida Noturna e Entretenimento',
    imagemUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
    // 33 palavras
    descricao: 'Aproveite shows ao vivo, teatros renomados e festivais de música que movimentam as noites locais com muita energia. A diversidade de entretenimento atrai pessoas de todas as idades para celebrar momentos de muita diversão.',
  },
  {
    id: 'd5',
    titulo: 'Mercados Locais e Compras',
    imagemUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400',
    // 32 palavras
    descricao: 'Caminhe por feiras de artesanato e centros comerciais para encontrar lembranças exclusivas, especiarias exóticas e lembrancinhas feitas à mão. Negociar com os produtores locais garante compras autênticas e experiências culturais memoráveis durante o passeio.',
  },
];

export default function App() {
  // Controle (Navegação/Troca de Tela)
  const [telaAtual, setTelaAtual] = useState('lista'); // 'lista' ou 'detalhes'
  const [itemSelecionado, setItemSelecionado] = useState(null);

  // 4 Inputs de Texto
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cidadeOrigem, setCidadeOrigem] = useState('');
  const [comentarios, setComentarios] = useState('');

  // 2 Pickers
  const [tipoViagem, setTipoViagem] = useState('lazer');
  const [transporte, setTransporte] = useState('aviao');

  // 2 Sliders
  const [diasViagem, setDiasViagem] = useState(7);
  const [orcamento, setOrcamento] = useState(2500);

  // 2 Switches
  const [receberNotificacoes, setReceberNotificacoes] = useState(true);
  const [aceitaTermos, setAceitaTermos] = useState(false);

  // Mensagem de retorno dos botões
  const [mensagem, setMensagem] = useState(null); // { titulo, texto, tipo }

  // Função para abrir a tela de detalhes 
  const abrirDetalhes = (item) => {
    setItemSelecionado(item);
    setTelaAtual('detalhes');
  };

  // Funções dos Botões 
  const acaoBotao1 = () => {
    setMensagem({
      titulo: 'Resumo do Cadastro',
      texto: `Nome: ${nome || 'Não informado'}\nEmail: ${email || 'Não informado'}\nTipo: ${tipoViagem}\nDias: ${diasViagem}`,
      tipo: 'info',
    });
  };

  const acaoBotao2 = () => {
    setNome('');
    setEmail('');
    setCidadeOrigem('');
    setComentarios('');
    setAceitaTermos(false);
    setMensagem({
      titulo: 'Sucesso',
      texto: 'Formulário limpo com sucesso!',
      tipo: 'sucesso',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Text style={styles.tituloPrincipal}>Guia de Viagens</Text>

        {telaAtual === 'lista' ? (
          <View>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800' }}
              style={styles.imagemTopo}
            />

            {LISTA_DESTINOS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.cardLista}
                onPress={() => abrirDetalhes(item)}
              >
                <Image source={{ uri: item.imagemUrl }} style={styles.imagemCard} />
                <View style={styles.infoCard}>
                  <Text style={styles.nomeCard}>{item.nome}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.btnVoltar}
              onPress={() => setTelaAtual('lista')}
            >
              <Text style={styles.txtBtnVoltar}>Voltar</Text>
            </TouchableOpacity>

            <Text style={styles.subtitulo}>
              Detalhes de: {itemSelecionado?.nome}
            </Text>

            {DETALHES_DESTINO.map((detalhe) => (
              <View key={detalhe.id} style={styles.cardDetalhe}>
                <Image source={{ uri: detalhe.imagemUrl }} style={styles.imagemDetalhe} />
                <Text style={styles.tituloDetalhe}>{detalhe.titulo}</Text>
                <Text style={styles.textoDetalhe}>{detalhe.descricao}</Text>
              </View>
            ))}

            <View style={styles.secaoParte3}>
              <Text style={styles.subtituloForm}>
                Planeje sua Viagem
              </Text>

              <Text style={styles.label}>1. Nome Completo:</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome..."
                value={nome}
                onChangeText={setNome}
              />

              <Text style={styles.label}>2. E-mail de Contato:</Text>
              <TextInput
                style={styles.input}
                placeholder="seuemail@exemplo.com"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>3. Cidade de Origem:</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: São Paulo, SP"
                value={cidadeOrigem}
                onChangeText={setCidadeOrigem}
              />

              <Text style={styles.label}>4. Comentários / Observações:</Text>
              <TextInput
                style={[styles.input, { height: 60 }]}
                placeholder="Algum pedido especial?"
                multiline
                value={comentarios}
                onChangeText={setComentarios}
              />

              <Text style={styles.label}>Tipo de Viagem:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={tipoViagem}
                  onValueChange={(itemValue) => setTipoViagem(itemValue)}
                >
                  <Picker.Item label="Lazer / Férias" value="lazer" />
                  <Picker.Item label="Trabalho / Negócios" value="trabalho" />
                  <Picker.Item label="Aventura" value="aventura" />
                </Picker>
              </View>

              <Text style={styles.label}>Meio de Transporte Preferido:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={transporte}
                  onValueChange={(itemValue) => setTransporte(itemValue)}
                >
                  <Picker.Item label="Avião" value="aviao" />
                  <Picker.Item label="Carro" value="carro" />
                  <Picker.Item label="Ônibus" value="onibus" />
                </Picker>
              </View>

              <Text style={styles.label}>Duração da viagem (Dias): {diasViagem}</Text>
              <Slider
                minimumValue={1}
                maximumValue={30}
                step={1}
                value={diasViagem}
                onValueChange={setDiasViagem}
                minimumTrackTintColor="#1e90ff"
              />

              <Text style={styles.label}>Orçamento Estimado: R$ {orcamento}</Text>
              <Slider
                minimumValue={500}
                maximumValue={10000}
                step={250}
                value={orcamento}
                onValueChange={setOrcamento}
                minimumTrackTintColor="#2ed573"
              />

              <View style={styles.switchRow}>
                <Text style={styles.labelSwitch}>Receber Notificações:</Text>
                <Switch
                  value={receberNotificacoes}
                  onValueChange={setReceberNotificacoes}
                />
              </View>

              <View style={styles.switchRow}>
                <Text style={styles.labelSwitch}>Aceito os Termos:</Text>
                <Switch
                  value={aceitaTermos}
                  onValueChange={setAceitaTermos}
                />
              </View>

              <View style={styles.containerBotoes}>
                <TouchableOpacity
                  style={[styles.botao, { backgroundColor: '#1e90ff' }]}
                  onPress={acaoBotao1}
                  activeOpacity={0.7}
                >
                  <Text style={styles.textoBotao}>Enviar Cadastro (Botão 1)</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.botao, { backgroundColor: '#ff4757' }]}
                  onPress={acaoBotao2}
                  activeOpacity={0.7}
                >
                  <Text style={styles.textoBotao}>Limpar Campos (Botão 2)</Text>
                </TouchableOpacity>
              </View>

              {mensagem && (
                <View
                  style={[
                    styles.caixaMensagem,
                    mensagem.tipo === 'sucesso' ? styles.mensagemSucesso : styles.mensagemInfo,
                  ]}
                >
                  <Text style={styles.tituloMensagem}>{mensagem.titulo}</Text>
                  <Text style={styles.textoMensagem}>{mensagem.texto}</Text>
                  <TouchableOpacity onPress={() => setMensagem(null)}>
                    <Text style={styles.fecharMensagem}>Fechar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  scrollContent: {
    padding: 16,
  },
  tituloPrincipal: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
    color: '#2f3542',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#57606f',
  },
  imagemTopo: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  legendaTopo: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 16,
    marginTop: 4,
    color: '#747d8c',
  },
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
    justifyContent: 'center',
  },
  nomeCard: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f3542',
  },
  descCard: {
    fontSize: 12,
    color: '#747d8c',
    marginVertical: 2,
  },
  linkClique: {
    fontSize: 11,
    color: '#1e90ff',
    fontWeight: '600',
  },
  btnVoltar: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#747d8c',
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  txtBtnVoltar: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardDetalhe: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
  },
  imagemDetalhe: {
    width: '100%',
    height: 160,
    borderRadius: 6,
  },
  tituloDetalhe: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#2f3542',
  },
  textoDetalhe: {
    fontSize: 13,
    color: '#57606f',
    marginTop: 4,
    lineHeight: 18,
  },
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