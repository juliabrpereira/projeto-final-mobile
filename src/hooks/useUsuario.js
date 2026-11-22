import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

import {
  entrarComEmail,
  observarAutenticacao,
  registrarComEmail,
  sairDaConta,
} from '../services/authService';
import { buscarPerfil, buscarReservas, salvarPerfil, salvarReserva } from '../services/usuarioService';

const PREFERENCIAS_PADRAO = {
  quarto: 'simples',
  pagamento: 'credito',
  cafe: false,
  notificacoes: true,
};

const UsuarioContext = createContext(null);

async function buscarDadosUsuario(user) {
  const [perfil, reservas] = await Promise.all([buscarPerfil(user.uid), buscarReservas(user.uid)]);

  return {
    usuario: {
      uid: user.uid,
      email: user.email,
      nome: perfil?.nome ?? user.email.split('@')[0],
      cidade: perfil?.cidade ?? '',
      fotoUrl: perfil?.fotoUrl ?? null,
    },
    preferencias: { ...PREFERENCIAS_PADRAO, ...perfil?.preferencias },
    reservas,
  };
}

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [preferencias, setPreferencias] = useState(PREFERENCIAS_PADRAO);
  const [reservas, setReservas] = useState([]);
  const [iniciando, setIniciando] = useState(true);
  const registrando = useRef(false);

  useEffect(() => {
    return observarAutenticacao((user) => {
      if (registrando.current) {
        return;
      }

      if (!user) {
        setUsuario(null);
        setPreferencias(PREFERENCIAS_PADRAO);
        setReservas([]);
        setIniciando(false);
        return;
      }

      buscarDadosUsuario(user)
        .then((dados) => {
          setPreferencias(dados.preferencias);
          setReservas(dados.reservas);
          setUsuario(dados.usuario);
        })
        .catch(() => sairDaConta())
        .finally(() => setIniciando(false));
    });
  }, []);

  const entrar = async (email, senha) => {
    await entrarComEmail(email, senha);
  };

  const registrar = async (nome, email, senha) => {
    registrando.current = true;
    try {
      const user = await registrarComEmail(email, senha);
      const perfil = { nome, email, cidade: '', fotoUrl: null, preferencias: PREFERENCIAS_PADRAO };

      try {
        await salvarPerfil(user.uid, { ...perfil, criadoEm: new Date().toISOString() });
      } catch {
        await sairDaConta();
        throw new Error('Conta criada, mas não foi possível salvar o perfil. Tente entrar novamente.');
      }

      setPreferencias(PREFERENCIAS_PADRAO);
      setReservas([]);
      setUsuario({ uid: user.uid, nome, email, cidade: '', fotoUrl: null });
    } finally {
      registrando.current = false;
    }
  };

  const sair = () => sairDaConta();

  const atualizarPerfil = async (dados) => {
    setUsuario((atual) => ({ ...atual, ...dados }));
    await salvarPerfil(usuario.uid, dados);
  };

  const atualizarPreferencias = async (dados) => {
    const novas = { ...preferencias, ...dados };
    setPreferencias(novas);
    await salvarPerfil(usuario.uid, { preferencias: novas });
  };

  const adicionarReserva = async (reserva) => {
    const id = await salvarReserva(usuario.uid, reserva);
    setReservas((atual) => [{ id, ...reserva }, ...atual]);
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        preferencias,
        reservas,
        iniciando,
        entrar,
        registrar,
        sair,
        atualizarPerfil,
        atualizarPreferencias,
        adicionarReserva,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}

export default function useUsuario() {
  return useContext(UsuarioContext);
}
