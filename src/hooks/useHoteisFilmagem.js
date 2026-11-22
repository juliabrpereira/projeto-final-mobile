import { useEffect, useState } from 'react';

import { lerHoteisSalvos, salvarHoteis } from '../services/storageService';
import { buscarHoteisDeFilmagem } from '../services/wikidataService';

export default function useHoteisFilmagem() {
  const [hoteis, setHoteis] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [usandoCache, setUsandoCache] = useState(false);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    const carregar = async () => {
      const salvos = await lerHoteisSalvos();
      if (salvos) {
        setHoteis(salvos);
        setUsandoCache(true);
        setCarregando(false);
      }

      try {
        const resultado = await buscarHoteisDeFilmagem();
        setHoteis(resultado);
        setUsandoCache(false);
        setErro(null);
        await salvarHoteis(resultado);
      } catch (e) {
        if (!salvos) {
          setErro(e.message);
        }
      } finally {
        setCarregando(false);
      }
    };

    carregar();
  }, [tentativa]);

  const recarregar = () => {
    setCarregando(true);
    setErro(null);
    setTentativa((valor) => valor + 1);
  };

  return { hoteis, carregando, erro, usandoCache, recarregar };
}
