# Iplace
 
App mobile em **React Native** que permite ao usuário se hospedar em hotéis que aparecem em filmes e livros famosos. O app tem duas telas: uma **lista de hospedagens** e uma tela de **detalhes com formulário de reserva**.

## Funcionalidades
 
- **Lista de hospedagens:** cinco hotéis, cada um com foto, nome, produção associada (filme/livro), cidade e preço por noite.
- **Tela de detalhes:** ao tocar em um hotel, o app mostra um texto de boas-vindas personalizado e cinco cartões sobre a cidade (arquitetura, natureza, museus, vida noturna e compras).
- **Formulário de reserva** com:
  - 4 campos de texto (nome, e-mail, cidade de origem, comentários);
  - 2 seletores (*Picker*): tipo de quarto e forma de pagamento;
  - campo de data com máscara `DD/MM/AAAA`;
  - 2 sliders: duração da viagem (1 a 30 dias) e quantidade de pessoas (1 a 10);
  - 2 switches: café da manhã e notificações;
  - 2 botões: **Reservar** e **Limpar Campos**.
- **Mensagens de retorno** na própria tela, com opção de fechar.
 
 
## Tecnologias e dependências
 
| Biblioteca | Uso |
|---|---|
| `react` / `react-native` | Base do app (componentes, estado, estilos) |
| `@react-native-picker/picker` | Seletores de quarto e pagamento |
| `@react-native-community/slider` | Sliders de dias e de pessoas |
 
## Como executar
 
Pré-requisitos: **Node.js** instalado e um emulador ou o app **Expo Go** no celular (os comandos abaixo supõem um projeto Expo).
 
```bash
# 1. Crie o projeto (se ainda não existir)
npx create-expo-app iplace
cd iplace
 
# 2. Instale as dependências extras
npx expo install @react-native-picker/picker @react-native-community/slider
 
# 3. Substitua o conteúdo de App.js pelo código do Iplace
 
# 4. Inicie o app
npx expo start
```
 
Depois, escaneie o QR code com o Expo Go ou abra em um emulador. As imagens vêm da internet, então é preciso estar online.
 
---
