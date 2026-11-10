# Dindin - contas compartilhadas (MVP)
Vue 3 + Vite + Pinia + Vue Router + Bootstrap 5. Dados salvos no localStorage.

    npm install
    npm run dev

Telas: landing page (`/#/inicio`), login, grupos, painel (saldos e acertos), nova despesa, histórico, contas fixas.
Para trocar o localStorage por uma API, altere só `salvar()` em `src/stores/app.js`.

## Coleta de contatos (Google Planilhas)
- **Visitantes**: o login da demo pede nome e e-mail e grava na aba `Visitantes`.
- **Interessados**: página `/#/interesse` com nome, e-mail, telefone e interesses (viagem, festa, mensal), gravada na aba `Interessados - Premium`.

Configuração (uma vez só):
1. Na planilha "Clientes da DinDin", abra **Extensões > Apps Script**.
2. Apague o conteúdo, cole o código de `google-sheets/Code.gs` e salve.
3. Clique em **Implantar > Nova implantação > tipo App da Web**. Em "Executar como", escolha **Eu**; em "Quem pode acessar", **Qualquer pessoa**. Autorize o acesso.
4. Copie a URL gerada (termina em `/exec`), copie `.env.example` para `.env.local` e cole a URL em `VITE_SHEETS_URL`.
5. Reinicie o `npm run dev`. Os dados são gravados conforme os títulos da linha 1 (Nome, E-mail, Telefone; opcionais: Data, Interesses).

Para dar acesso aos colegas, basta compartilhar a planilha. Se alterar o script, use **Implantar > Gerenciar implantações > Editar > Nova versão** para manter a mesma URL.
Sem o `.env.local`, os cadastros ficam no localStorage (chave `dindin-leads`).

