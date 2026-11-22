# iPlace

App mobile em **React Native (Expo)** para quem quer se hospedar no hotel onde seu filme favorito foi gravado. Os hotéis vêm do **Wikidata**, com os locais de filmagem de cada filme. O usuário pode criar uma conta, filtrar a lista, ver os detalhes no mapa e fazer reservas, que ficam salvas no **Firebase**.

## Funcionalidades

- **Login e cadastro** com e-mail e senha (Firebase Authentication). O usuário continua logado depois de fechar o app.
- **Lista de hotéis** buscada no Wikidata, com foto, hotel, filme, ano e país.
- **Filtro** por nome do filme, do hotel ou do país.
- **Tela de detalhes** com foto, coordenadas, um botão **Ver no mapa** (abre o Google Maps) e o formulário de reserva.
- **Formulário de reserva** que já vem preenchido com os dados e as preferências do perfil.
- **Perfil** com:
  - foto (escolhida da galeria);
  - nome e cidade;
  - preferências: quarto, pagamento, café da manhã e notificações;
  - lista de **reservas enviadas**.
- **Menu lateral (Drawer)** com foto e nome do usuário e os itens Início, Perfil e Sair.
- **Funciona sem internet:** a lista de hotéis fica salva no aparelho com o AsyncStorage.


## Estrutura de pastas

```
/src
  /components   Componentes visuais (cards, avatar, formulário, conteúdo do drawer, loading)
  /screens      LoginScreen, ListaScreen, DetalhesScreen, PerfilScreen
  /navigation   AppNavigator (login/app), DrawerNavigator, HomeStack
  /services     wikidataService, authService, usuarioService, storageService
  /hooks        useHoteisFilmagem, useUsuario, useReservaForm
App.js
firebaseConfig.js
firestore.rules
```

## Tecnologias

| Biblioteca | Uso |
|---|---|
| `expo` (SDK 57) / `react-native` | Base do app |
| `@react-navigation/native`, `native-stack` e `drawer` | Navegação |
| `firebase` | Authentication e Firestore |
| `@react-native-async-storage/async-storage` | Cache local e persistência do login |
| `expo-image-picker` | Foto de perfil |
| `@expo/vector-icons` | Ícones |
| `@react-native-picker/picker`, `@react-native-community/slider` | Campos do formulário de reserva |

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou mais recente.
- O app **Expo Go** no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) ou [iOS](https://apps.apple.com/app/expo-go/id982107779)), um emulador ou um navegador.

### Passo a passo

```bash
git clone https://github.com/juliabrpereira/projeto-final-mobile.git
cd projeto-final-mobile
npm install
npx expo start
```

Com o servidor rodando:

- **Celular:** escaneie o QR code com o Expo Go. No iPhone, use a câmera. O celular e o computador precisam estar na mesma rede Wi-Fi.
- **Web:** aperte `w` no terminal ou rode `npx expo start --web`.
- **Emulador Android:** aperte `a`.

Se aparecer um erro de módulo não encontrado, limpe o cache:

```bash
npx expo start --clear
```

## Configuração do Firebase

O projeto já vem ligado a um Firebase pronto, então não é preciso configurar nada para testar. Para usar o seu próprio projeto:

1. Crie um projeto no [console do Firebase](https://console.firebase.google.com).
2. Em **Authentication → Sign-in method**, ative **E-mail/senha**.
3. Em **Firestore Database**, crie o banco.
4. Em **Firestore Database → Regras**, cole o conteúdo do arquivo [`firestore.rules`](firestore.rules) e clique em **Publicar**. Essas regras deixam cada usuário ler e escrever só os próprios dados.
5. Em **Configurações do projeto → Seus apps**, adicione um app **Web** e copie os valores do `firebaseConfig` para o arquivo [`firebaseConfig.js`](firebaseConfig.js).

### Estrutura dos dados no Firestore

```
usuarios/{uid}
  nome, email, cidade, fotoUrl, criadoEm
  preferencias: { quarto, pagamento, cafe, notificacoes }

usuarios/{uid}/reservas/{id}
  hotel, filme, nome, email, dataViagem, diasViagem,
  quantidadePessoas, quarto, pagamento, incluiCafe, criadaEm, ...
```

## API do Wikidata

O app consulta o endpoint público `https://query.wikidata.org/sparql`. Ele não exige cadastro nem chave. A consulta busca:

- filmes (Q11424);
- com local de filmagem (P915);
- em um hotel (Q27686);
- que tenha coordenadas (P625).

Junto vêm a foto do hotel (P18), o país (P17) e o ano de lançamento (P577), com nomes em português quando o Wikidata tem tradução. A consulta completa está em [`src/services/wikidataService.js`](src/services/wikidataService.js).

A primeira busca leva alguns segundos. A partir daí, a lista salva no aparelho aparece na hora e é atualizada em segundo plano.

## Limitações

- **Foto de perfil:** o app salva só o endereço local da imagem, porque o Firebase Storage exige o plano pago. A foto aparece no aparelho onde foi escolhida. Na web, pode sumir ao recarregar a página.
- **Preços:** o Wikidata não tem preço de hospedagem, então as reservas são demonstrativas.
