import { useState } from 'react';

import useUsuario from './useUsuario';

export default function useReservaForm(item) {
  const { usuario, preferencias, adicionarReserva } = useUsuario();

  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [cidadeOrigem, setCidadeOrigem] = useState(usuario.cidade);
  const [comentarios, setComentarios] = useState('');
  const [quarto, setQuarto] = useState(preferencias.quarto);
  const [pagamento, setPagamento] = useState(preferencias.pagamento);
  const [dataViagem, setDataViagem] = useState('');
  const [diasViagem, setDiasViagem] = useState(7);
  const [quantidadePessoas, setQuantidadePessoas] = useState(1);
  const [receberNotificacoes, setReceberNotificacoes] = useState(preferencias.notificacoes);
  const [incluiCafe, setIncluiCafe] = useState(preferencias.cafe);
  const [mensagem, setMensagem] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const handleDataChange = (text) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;

    if (cleaned.length > 2 && cleaned.length <= 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    }

    setDataViagem(formatted);
  };

  const reservar = async () => {
    if (!nome.trim() || !email.includes('@') || dataViagem.length !== 10) {
      setMensagem({
        titulo: 'Dados incompletos',
        texto: 'Preencha nome, e-mail e a data de início (DD/MM/AAAA).',
        tipo: 'info',
      });
      return;
    }

    setEnviando(true);
    try {
      await adicionarReserva({
        hotel: item.hotel,
        filme: item.filme,
        nome,
        email,
        cidadeOrigem,
        comentarios,
        quarto,
        pagamento,
        dataViagem,
        diasViagem,
        quantidadePessoas,
        incluiCafe,
        receberNotificacoes,
        criadaEm: new Date().toISOString(),
      });
      setMensagem({
        titulo: 'Reserva concluída com sucesso',
        texto: `Um e-mail com o link de pagamento será enviado para ${email}. Veja suas reservas no Perfil.`,
        tipo: 'sucesso',
      });
    } catch {
      setMensagem({
        titulo: 'Erro ao reservar',
        texto: 'Não foi possível salvar a reserva. Verifique sua conexão e tente novamente.',
        tipo: 'info',
      });
    } finally {
      setEnviando(false);
    }
  };

  const limpar = () => {
    setNome(usuario.nome);
    setEmail(usuario.email);
    setCidadeOrigem(usuario.cidade);
    setComentarios('');
    setDataViagem('');
    setQuarto(preferencias.quarto);
    setPagamento(preferencias.pagamento);
    setDiasViagem(7);
    setQuantidadePessoas(1);
    setReceberNotificacoes(preferencias.notificacoes);
    setIncluiCafe(preferencias.cafe);
    setMensagem({
      titulo: 'Sucesso',
      texto: 'Formulário limpo com sucesso!',
      tipo: 'sucesso',
    });
  };

  return {
    nome,
    setNome,
    email,
    setEmail,
    cidadeOrigem,
    setCidadeOrigem,
    comentarios,
    setComentarios,
    quarto,
    setQuarto,
    pagamento,
    setPagamento,
    dataViagem,
    handleDataChange,
    diasViagem,
    setDiasViagem,
    quantidadePessoas,
    setQuantidadePessoas,
    receberNotificacoes,
    setReceberNotificacoes,
    incluiCafe,
    setIncluiCafe,
    mensagem,
    setMensagem,
    enviando,
    reservar,
    limpar,
  };
}
