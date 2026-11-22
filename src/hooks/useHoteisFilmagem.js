import { useEffect, useState } from 'react';

import { buscarHoteisDeFilmagem } from '../services/wikidataService';

export default function useHoteisFilmagem() {
  const [hoteis, setHoteis] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    buscarHoteisDeFilmagem()
      .then((resultado) => {
        setHoteis(resultado);
        setErro(null);
      })
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, [tentativa]);

  const recarregar = () => {
    setCarregando(true);
    setErro(null);
    setTentativa((valor) => valor + 1);
  };

  return { hoteis, carregando, erro, recarregar };
}
