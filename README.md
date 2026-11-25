# Estúdio Forma — formulários de autenticação

[Abrir a aplicação](https://felipesf13.github.io/Authentication-Form/)

Atividade prática da Aula 12, desenvolvida com React, Vite e Tailwind CSS. Para experimentar, escolha **Criar conta**, informe dados fictícios e use a mesma senha para entrar. O cadastro é simulado na memória da aba: recarregar a página remove os dados.

## Como estudar a implementação

1. **Preparação:** veja em `vite.config.js` como os plugins de React e Tailwind se integram ao Vite.
2. **Campos controlados:** `src/Field.jsx` associa rótulo, entrada e mensagem por identificadores. O valor é recebido do formulário, e o botão de senha só altera sua visibilidade.
3. **Regras:** `src/validation.js` recebe os valores e devolve um erro por campo. Compare as regras de login com as de cadastro em `tests/validation.test.js`.
4. **Interatividade:** `src/AuthForm.jsx` controla o modo atual, os campos visitados e o envio. Ao enviar dados inválidos, o primeiro campo com erro recebe o foco.
5. **Fluxo de acesso:** `src/demoAccounts.js` permite experimentar cadastro e login sem backend. `src/main.jsx` exibe a saudação após o acesso e permite sair.
6. **Responsividade:** a página usa uma coluna por padrão e duas a partir de `md`. As classes utilitárias estão nos componentes, e os estilos comuns de botão em `src/styles.css`.

## Executar e verificar

Com Node.js 24, execute `npm ci` e `npm run dev`. Abra a URL exibida no terminal.

| Comando | Verificação |
| --- | --- |
| `npm test` | Regras dos campos de cadastro e login |
| `npx playwright install chromium` | Instalação inicial do navegador de testes |
| `npm run test:e2e` | Fluxo de cadastro, erro de confirmação, login e saída nos tamanhos de celular e desktop |
| `npm run build` | Compilação da versão de produção |

O workflow de GitHub Pages testa as regras, compila e publica a branch `main`.
