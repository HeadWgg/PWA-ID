# Identificação Digital

PWA de identificação somente leitura. A mesma identificação é definida no código e exibida para todos. Não há login, formulário, armazenamento de identificação no dispositivo, backend, analytics ou serviços externos.

Antes de publicar, substitua os dados e as imagens de exemplo pela identificação real. Tudo que estiver no cartão será público.

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

Abra a versão de produção uma vez com internet e aguarde o carregamento da carteira. Instale pelo menu do navegador, se desejar. Feche o app, ative o modo avião e abra novamente: a carteira, a foto e o logo devem continuar visíveis. O service worker só funciona em HTTPS ou `localhost`; para testar em um celular pela rede, sirva o build em HTTPS. O servidor de desenvolvimento não é o teste de cache offline.

Limpar os dados do site ou desinstalar o navegador apaga o cache offline; basta acessar novamente com internet para recuperá-lo.

## Alterando a identificação

1. Edite somente os dados em `src/config/identification.ts`.
2. Se necessário, substitua `public/images/photo.webp` e `public/images/logo.webp`, mantendo os nomes. Essas imagens são exemplos, não fotos ou marcas reais.
3. Execute `npm run build` para conferir a compilação.
4. Execute `git add .`.
5. Execute `git commit -m "Atualiza identificação"`.
6. Execute `git push`. Se o repositório estiver conectado à Vercel, ela fará o novo deploy automaticamente.

Com internet, abra novamente o PWA. Ele verifica atualizações ao voltar para o primeiro plano ou reconectar. Uma nova versão do service worker assume o controle e pode recarregar o aplicativo; depois disso, confira a carteira sem internet. Uma versão que já estava aberta offline continuará mostrando a última publicação recebida até voltar a ter conexão. No iOS, pode ser necessário fechar e reabrir o PWA para ver a atualização.
