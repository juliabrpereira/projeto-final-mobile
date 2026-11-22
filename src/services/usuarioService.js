import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';

import { db } from '../../firebaseConfig';

export async function buscarPerfil(uid) {
  const documento = await getDoc(doc(db, 'usuarios', uid));
  return documento.exists() ? documento.data() : null;
}

export function salvarPerfil(uid, dados) {
  return setDoc(doc(db, 'usuarios', uid), dados, { merge: true });
}

export async function buscarReservas(uid) {
  const consulta = query(collection(db, 'usuarios', uid, 'reservas'), orderBy('criadaEm', 'desc'));
  const resultado = await getDocs(consulta);
  return resultado.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function salvarReserva(uid, reserva) {
  const documento = await addDoc(collection(db, 'usuarios', uid, 'reservas'), reserva);
  return documento.id;
}
