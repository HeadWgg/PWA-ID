# Identificação Digital

PWA de identificação pessoal. Os dados e imagens ficam apenas no IndexedDB deste dispositivo. Não há login, servidor de aplicação, analytics ou serviços externos.

## Instalar

```bash
npm install
```

## Rodar

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Testar o build

```bash
npm run preview
```

## Testando funcionamento offline

Abra a versão de produção uma vez com internet, cadastre nome, identificação, empresa, foto e logo, e salve. Instale pelo menu do navegador ou pelo botão **Instalar aplicativo**, quando disponível. Feche o app, ative o modo avião e abra novamente: a carteira e as imagens devem continuar visíveis. O service worker só funciona em HTTPS ou `localhost`; para testar em um celular pela rede, sirva o build em HTTPS. O servidor de desenvolvimento não é o teste de cache offline.

Limpar os dados do site ou desinstalar o navegador pode apagar a identificação local.
