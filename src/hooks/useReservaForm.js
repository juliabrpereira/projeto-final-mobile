import { useState } from 'react';

export default function useReservaForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cidadeOrigem, setCidadeOrigem] = useState('');
  const [comentarios, setComentarios] = useState('');

  const [quarto, setQuarto] = useState('simples');
  const [pagamento, setPagamento] = useState('credito');

  const [dataViagem, setDataViagem] = useState('');
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

  const [diasViagem, setDiasViagem] = useState(7);
  const [quantidadePessoas, setQuantidadePessoas] = useState(1);

  const [receberNotificacoes, setReceberNotificacoes] = useState(true);
  const [incluiCafe, setIncluiCafe] = useState(false);

  const [mensagem, setMensagem] = useState(null);

  const reservar = () => {
    setMensagem({
      titulo: 'Reserva concluída com sucesso',
      texto: `Um e-mail com o link de pagamento será enviado para ${email || 'Não informado'}`,
      tipo: 'info',
    });
  };

  const limpar = () => {
    setNome('');
    setEmail('');
    setCidadeOrigem('');
    setComentarios('');
    setDataViagem('');
    setQuarto('simples');
    setPagamento('credito');
    setDiasViagem(7);
    setQuantidadePessoas(1);
    setReceberNotificacoes(true);
    setIncluiCafe(false);
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
    reservar,
    limpar,
  };
}
