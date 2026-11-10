<script setup>
import { useApp } from '../stores/app'
const app = useApp()
const ctaDemo = app.usuario ? '/grupos' : '/login'

const passos = [
  { icone: 'bi-people', titulo: 'Crie um grupo', texto: 'Casa, república ou viagem: adicione quem divide as contas com você.' },
  { icone: 'bi-receipt', titulo: 'Lance as despesas', texto: 'Informe quem pagou e como dividir. Contas fixas são lançadas com um clique todo mês.' },
  { icone: 'bi-arrow-left-right', titulo: 'Acerte as contas', texto: 'O Dindin calcula o menor número de transferências para zerar tudo.' },
]
const recursos = [
  { icone: 'bi-pie-chart', titulo: 'Saldos em tempo real', texto: 'Veja na hora quem deve e quem tem a receber.' },
  { icone: 'bi-calendar-check', titulo: 'Contas fixas', texto: 'Aluguel, internet e luz cadastrados uma vez só.' },
  { icone: 'bi-clock-history', titulo: 'Histórico completo', texto: 'Tudo registrado, sem discussão sobre quem pagou o quê.' },
  { icone: 'bi-phone', titulo: 'Feito para o celular', texto: 'Use no navegador, sem instalar nada.' },
]
const emBreve = [
  { icone: 'bi-airplane', titulo: 'Viagens em grupo' },
  { icone: 'bi-balloon', titulo: 'Festas e eventos' },
  { icone: 'bi-calendar3', titulo: 'Controle por mês' },
]
const saldos = [
  { nome: 'Ana', valor: 84.5 },
  { nome: 'Bruno', valor: -42.25 },
  { nome: 'Carla', valor: -42.25 },
]
const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
</script>

<template>
  <div class="landing">
    <!-- topo -->
    <nav class="topo py-3">
      <div class="container d-flex justify-content-between align-items-center">
        <span class="text-white fs-4 fw-bold"><i class="bi bi-piggy-bank" aria-hidden="true"></i> Dindin</span>
        <RouterLink :to="ctaDemo" class="btn btn-sm btn-outline-light">{{ app.usuario ? 'Meus grupos' : 'Entrar' }}</RouterLink>
      </div>
    </nav>

    <!-- hero -->
    <header class="hero py-5">
      <div class="container py-lg-4">
        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <span class="selo mb-3"><i class="bi bi-stars" aria-hidden="true"></i> Grátis durante o beta</span>
            <h1 class="display-5 fw-bold mb-3">Divida as contas sem brigar e sem planilha.</h1>
            <p class="lead mb-4">
              O Dindin organiza as despesas da casa, da república ou da viagem e mostra exatamente quem deve para quem.
            </p>
            <div class="d-flex flex-column flex-sm-row gap-2">
              <RouterLink :to="ctaDemo" class="btn btn-dindin btn-lg px-4">Testar a demo grátis</RouterLink>
              <RouterLink to="/como-funciona" class="btn btn-outline-dark btn-lg px-4">Como funciona</RouterLink>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="cartao preview mx-auto" aria-label="Exemplo de painel do Dindin">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <strong><i class="bi bi-house-door" aria-hidden="true"></i> República Central</strong>
                <span class="small text-muted">Novembro</span>
              </div>
              <div class="total mb-3">
                <span class="small">Total do mês</span>
                <div class="fs-3 fw-bold">{{ brl(1268.4) }}</div>
              </div>
              <ul class="list-unstyled mb-3">
                <li v-for="s in saldos" :key="s.nome" class="d-flex justify-content-between py-2 border-bottom">
                  <span><span class="avatar">{{ s.nome[0] }}</span> {{ s.nome }}</span>
                  <span :class="s.valor >= 0 ? 'positivo' : 'negativo'">{{ s.valor >= 0 ? '+' : '' }}{{ brl(s.valor) }}</span>
                </li>
              </ul>
              <div class="acerto small">
                <i class="bi bi-arrow-right-circle positivo" aria-hidden="true"></i>
                Bruno paga {{ brl(42.25) }} para Ana
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- como funciona -->
    <section id="como-funciona" class="py-5">
      <div class="container">
        <h2 class="text-center fw-bold mb-2">Como funciona</h2>
        <p class="text-center text-muted mb-5">Em três passos, todo mundo sabe quanto deve.</p>
        <div class="row g-4">
          <div v-for="(p, i) in passos" :key="p.titulo" class="col-md-4">
            <div class="cartao h-100 text-center">
              <div class="icone mx-auto mb-3"><i :class="['bi', p.icone]" aria-hidden="true"></i></div>
              <span class="small text-muted">Passo {{ i + 1 }}</span>
              <h3 class="h5 fw-bold mt-1">{{ p.titulo }}</h3>
              <p class="mb-0">{{ p.texto }}</p>
            </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <RouterLink to="/como-funciona" class="link-escuro">Ver o passo a passo completo <i class="bi bi-arrow-right" aria-hidden="true"></i></RouterLink>
        </div>
      </div>
    </section>

    <!-- recursos -->
    <section class="py-5 faixa-menta">
      <div class="container">
        <h2 class="text-center fw-bold mb-5">Tudo o que o seu grupo precisa</h2>
        <div class="row g-4">
          <div v-for="r in recursos" :key="r.titulo" class="col-sm-6 col-lg-3">
            <div class="d-flex gap-3">
              <i :class="['bi', r.icone, 'fs-3', 'positivo']" aria-hidden="true"></i>
              <div>
                <h3 class="h6 fw-bold mb-1">{{ r.titulo }}</h3>
                <p class="small mb-0">{{ r.texto }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- em breve -->
    <section class="py-5">
      <div class="container">
        <div class="cartao cartao-interesse p-4 p-lg-5">
          <div class="row align-items-center g-4">
            <div class="col-lg-7">
              <span class="selo mb-2">Em breve</span>
              <h2 class="fw-bold">Viagens, festas e controle por mês</h2>
              <p class="mb-3">Estamos preparando novos tipos de grupo. Entre na lista e ajude a definir o produto.</p>
              <ul class="list-inline mb-0">
                <li v-for="e in emBreve" :key="e.titulo" class="list-inline-item me-3 mb-2">
                  <i :class="['bi', e.icone, 'positivo']" aria-hidden="true"></i> {{ e.titulo }}
                </li>
              </ul>
            </div>
            <div class="col-lg-5 text-lg-end">
              <RouterLink to="/interesse" class="btn btn-dindin btn-lg">Quero ser avisado</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- cta final -->
    <section class="topo py-5 text-center">
      <div class="container">
        <h2 class="fw-bold mb-3">Pronto para acabar com o "depois eu te pago"?</h2>
        <RouterLink :to="ctaDemo" class="btn btn-light btn-lg px-4">Começar agora</RouterLink>
      </div>
    </section>

    <footer class="py-4 text-center small text-muted">
      Dindin · projeto acadêmico · {{ new Date().getFullYear() }}
    </footer>
  </div>
</template>

<style scoped>
.hero { background: linear-gradient(180deg, var(--menta) 0%, #f6fbf8 100%); }
.selo { display: inline-block; background: #fff; border: 1px solid #d5ebe0; color: var(--verde); font-weight: 600; font-size: .85rem; padding: .25rem .75rem; border-radius: 999px; }
.preview { max-width: 420px; box-shadow: 0 20px 40px -20px rgba(20, 51, 42, .35); }
.total { background: var(--menta); border-radius: 10px; padding: .75rem 1rem; }
.avatar { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: var(--verde-esc); color: #fff; font-size: .8rem; margin-right: .4rem; }
.acerto { background: #f6fbf8; border: 1px dashed #d5ebe0; border-radius: 8px; padding: .5rem .75rem; }
.icone { width: 56px; height: 56px; border-radius: 14px; background: var(--menta); color: var(--verde); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
.faixa-menta { background: #fff; border-top: 1px solid #d5ebe0; border-bottom: 1px solid #d5ebe0; }
.btn-outline-dark { border-color: var(--verde-esc); color: var(--verde-esc); }
.btn-outline-dark:hover { background: var(--verde-esc); color: #fff; }
</style>

