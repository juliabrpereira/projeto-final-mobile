import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_HOTEIS = '@iplace/hoteis';

export async function salvarHoteis(hoteis) {
  try {
    await AsyncStorage.setItem(CHAVE_HOTEIS, JSON.stringify(hoteis));
  } catch {
    return;
  }
}

export async function lerHoteisSalvos() {
  try {
    const texto = await AsyncStorage.getItem(CHAVE_HOTEIS);
    return texto ? JSON.parse(texto) : null;
  } catch {
    return null;
  }
}
