<script setup>
import { useApp } from '../stores/app'
import { brl, calcularSaldos, sugerirAcertos } from '../utils/saldos'
const app = useApp()
const ctaDemo = app.usuario ? '/grupos' : '/login'

const passos = [
  {
    icone: 'bi-box-arrow-in-right', titulo: 'Entre na demo',
    texto: 'Informe seu nome e e-mail. Não precisa criar senha nem instalar nada.',
  },
  {
    icone: 'bi-people', titulo: 'Crie um grupo',
    texto: 'Dê um nome, escolha o tipo (casa, república ou viagem) e liste quem divide as contas com você.',
  },
  {
    icone: 'bi-receipt', titulo: 'Lance as despesas',
    texto: 'Para cada gasto, informe descrição, valor, data, categoria, quem pagou e entre quem será dividido.',
  },
  {
    icone: 'bi-calendar-check', titulo: 'Cadastre as contas fixas',
    texto: 'Aluguel, internet e luz ficam salvos. Todo mês, basta um clique em "Lançar neste mês".',
  },
  {
    icone: 'bi-pie-chart', titulo: 'Acompanhe os saldos',
    texto: 'O painel mostra na hora quanto cada pessoa tem a receber ou está devendo.',
  },
  {
    icone: 'bi-arrow-left-right', titulo: 'Acerte as contas',
    texto: 'O Dindin sugere o menor número de transferências. Quando alguém pagar, é só marcar como pago.',
  },
]

// exemplo calculado com as mesmas funções usadas no app
const exemplo = {
  membros: [{ id: 'a', nome: 'Ana' }, { id: 'b', nome: 'Bruno' }, { id: 'c', nome: 'Carla' }],
  despesas: [
    { descricao: 'Mercado do mês', valor: 120, pagoPor: 'a', divididoEntre: ['a', 'b', 'c'] },
    { descricao: 'Internet', valor: 90, pagoPor: 'b', divididoEntre: ['a', 'b', 'c'] },
    { descricao: 'Pizza (só Ana e Carla)', valor: 60, pagoPor: 'c', divididoEntre: ['a', 'c'] },
  ],
  acertos: [],
}
const nome = (id) => exemplo.membros.find((m) => m.id === id).nome
const saldos = calcularSaldos(exemplo)
const acertos = sugerirAcertos(saldos)
const total = exemplo.despesas.reduce((t, d) => t + d.valor, 0)

const perguntas = [
  { p: 'Preciso pagar para usar?', r: 'Não. O Dindin é gratuito durante o beta.' },
  { p: 'Onde meus dados ficam salvos?', r: 'Nesta versão de demonstração, os grupos e despesas ficam salvos no próprio navegador do seu aparelho. Se limpar os dados do navegador ou trocar de aparelho, eles não aparecem.' },
  { p: 'As outras pessoas do grupo precisam se cadastrar?', r: 'Não. Você só digita o nome delas ao criar o grupo e lança as despesas por todos.' },
  { p: 'Posso dividir uma despesa só com parte do grupo?', r: 'Sim. Ao lançar a despesa, marque apenas quem participou daquele gasto.' },
  { p: 'Como o Dindin calcula quem paga quem?', r: 'Ele soma o que cada pessoa pagou, desconta a parte de cada uma nas despesas e cruza quem deve com quem tem a receber, gerando poucas transferências.' },
  { p: 'Dá para usar em viagens, festas ou por mês?', r: 'Estamos preparando esses modos. Entre na lista de interessados para ser avisado.' },
]
</script>

<template>
  <div class="como">
    <!-- topo -->
    <nav class="topo py-3">
      <div class="container d-flex justify-content-between align-items-center">
        <RouterLink to="/" class="text-white text-decoration-none fs-4 fw-bold">
          <i class="bi bi-piggy-bank" aria-hidden="true"></i> Dindin
        </RouterLink>
        <RouterLink :to="ctaDemo" class="btn btn-sm btn-outline-light">{{ app.usuario ? 'Meus grupos' : 'Entrar' }}</RouterLink>
      </div>
    </nav>

    <!-- cabeçalho -->
    <header class="cabecalho py-5 text-center">
      <div class="container" style="max-width: 720px">
        <span class="selo mb-3"><i class="bi bi-lightbulb" aria-hidden="true"></i> Guia rápido</span>
        <h1 class="display-6 fw-bold mb-3">Como funciona o Dindin</h1>
        <p class="lead mb-0">Do primeiro grupo ao acerto final, veja o passo a passo para dividir as contas sem confusão.</p>
      </div>
    </header>

    <!-- passo a passo -->
    <section class="py-5">
      <div class="container" style="max-width: 860px">
        <h2 class="h3 fw-bold text-center mb-5">Passo a passo</h2>
        <ol class="list-unstyled linha-tempo mb-0">
          <li v-for="(p, i) in passos" :key="p.titulo" class="d-flex gap-3 mb-4">
            <div class="numero flex-shrink-0">{{ i + 1 }}</div>
            <div class="cartao flex-grow-1">
              <h3 class="h5 fw-bold mb-1">
                <i :class="['bi', p.icone, 'positivo', 'me-1']" aria-hidden="true"></i> {{ p.titulo }}
              </h3>
              <p class="mb-0">{{ p.texto }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- exemplo -->
    <section class="py-5 faixa">
      <div class="container">
        <h2 class="h3 fw-bold text-center mb-2">Na prática</h2>
        <p class="text-center text-muted mb-5">Ana, Bruno e Carla dividem um apartamento. Veja como o Dindin resolve as contas do mês.</p>
        <div class="row g-4">
          <div class="col-lg-4">
            <div class="cartao h-100">
              <h3 class="h6 fw-bold text-uppercase text-muted mb-3">1. Despesas lançadas</h3>
              <ul class="list-unstyled mb-3">
                <li v-for="d in exemplo.despesas" :key="d.descricao" class="py-2 border-bottom">
                  <div class="d-flex justify-content-between">
                    <span>{{ d.descricao }}</span><strong>{{ brl(d.valor) }}</strong>
                  </div>
                  <div class="small text-muted">
                    pagou: {{ nome(d.pagoPor) }} · dividido entre {{ d.divididoEntre.length }}
                    ({{ brl(d.valor / d.divididoEntre.length) }} cada)
                  </div>
                </li>
              </ul>
              <div class="d-flex justify-content-between fw-bold"><span>Total</span><span>{{ brl(total) }}</span></div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="cartao h-100">
              <h3 class="h6 fw-bold text-uppercase text-muted mb-3">2. Saldo de cada um</h3>
              <ul class="list-unstyled mb-3">
                <li v-for="m in exemplo.membros" :key="m.id" class="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <span><span class="avatar">{{ m.nome[0] }}</span> {{ m.nome }}</span>
                  <span :class="saldos[m.id] >= 0 ? 'positivo' : 'negativo'">
                    {{ saldos[m.id] >= 0 ? 'recebe' : 'deve' }} {{ brl(Math.abs(saldos[m.id])) }}
                  </span>
                </li>
              </ul>
              <p class="small text-muted mb-0">Saldo = o que a pessoa pagou − a parte dela em cada despesa.</p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="cartao h-100">
              <h3 class="h6 fw-bold text-uppercase text-muted mb-3">3. Acertos sugeridos</h3>
              <div v-for="(a, i) in acertos" :key="i" class="acerto mb-2">
                <i class="bi bi-arrow-right-circle positivo" aria-hidden="true"></i>
                <strong>{{ nome(a.de) }}</strong> paga {{ brl(a.valor) }} para <strong>{{ nome(a.para) }}</strong>
              </div>
              <p class="small text-muted mb-0 mt-3">
                Só {{ acertos.length }} {{ acertos.length === 1 ? 'transferência zera' : 'transferências zeram' }} tudo.
                Depois de pagar, é só tocar em "Marcar como pago".
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- perguntas -->
    <section class="py-5">
      <div class="container" style="max-width: 760px">
        <h2 class="h3 fw-bold text-center mb-4">Perguntas frequentes</h2>
        <details v-for="q in perguntas" :key="q.p" class="cartao mb-2 pergunta">
          <summary class="fw-semibold">{{ q.p }}</summary>
          <p class="mb-0 mt-2">{{ q.r }}</p>
        </details>
      </div>
    </section>

    <!-- cta -->
    <section class="topo py-5 text-center">
      <div class="container">
        <h2 class="fw-bold mb-3">Agora é com você</h2>
        <div class="d-flex flex-column flex-sm-row justify-content-center gap-2">
          <RouterLink :to="ctaDemo" class="btn btn-light btn-lg px-4">Testar a demo grátis</RouterLink>
          <RouterLink to="/interesse" class="btn btn-outline-light btn-lg px-4">Quero ser avisado</RouterLink>
        </div>
      </div>
    </section>

    <footer class="py-4 text-center small text-muted">
      <RouterLink to="/" class="link-escuro">Voltar para o início</RouterLink> · Dindin · projeto acadêmico · {{ new Date().getFullYear() }}
    </footer>
  </div>
</template>

<style scoped>
.cabecalho { background: linear-gradient(180deg, var(--menta) 0%, #f6fbf8 100%); }
.selo { display: inline-block; background: #fff; border: 1px solid #d5ebe0; color: var(--verde); font-weight: 600; font-size: .85rem; padding: .25rem .75rem; border-radius: 999px; }
.numero { width: 40px; height: 40px; border-radius: 50%; background: var(--verde-esc); color: #fff; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-top: .75rem; }
.faixa { background: #fff; border-top: 1px solid #d5ebe0; border-bottom: 1px solid #d5ebe0; }
.avatar { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: var(--verde-esc); color: #fff; font-size: .8rem; margin-right: .4rem; }
.acerto { background: #f6fbf8; border: 1px dashed #d5ebe0; border-radius: 8px; padding: .5rem .75rem; }
.pergunta summary { cursor: pointer; }
.pergunta[open] summary { color: var(--verde); }
</style>

