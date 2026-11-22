import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { auth } from '../../firebaseConfig';

const MENSAGENS_ERRO = {
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/invalid-email': 'E-mail inválido.',
  'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
  'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
  'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
  'auth/network-request-failed': 'Sem conexão com a internet.',
};

function traduzirErro(erro) {
  return new Error(MENSAGENS_ERRO[erro.code] ?? 'Não foi possível concluir. Tente novamente.');
}

export async function entrarComEmail(email, senha) {
  try {
    const credencial = await signInWithEmailAndPassword(auth, email, senha);
    return credencial.user;
  } catch (erro) {
    throw traduzirErro(erro);
  }
}

export async function registrarComEmail(email, senha) {
  try {
    const credencial = await createUserWithEmailAndPassword(auth, email, senha);
    return credencial.user;
  } catch (erro) {
    throw traduzirErro(erro);
  }
}

export function sairDaConta() {
  return signOut(auth);
}

export function observarAutenticacao(callback) {
  return onAuthStateChanged(auth, callback);
}
