<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useApp } from '../stores/app'
import { brl } from '../utils/saldos'
const route = useRoute(), app = useApp()
const g = computed(() => app.grupo(route.params.id))
const f = ref({ descricao: '', valor: null, dia: 10, responsavel: g.value.membros[0].id })
const nome = (id) => g.value.membros.find((m) => m.id === id)?.nome
function criar() { app.add(g.value.id, 'fixas', { ...f.value, valor: Number(f.value.valor) }); f.value.descricao = ''; f.value.valor = null }
// lança a conta deste mês como despesa dividida entre todos
function lancar(c) {
  app.add(g.value.id, 'despesas', { descricao: c.descricao, valor: c.valor, categoria: 'Contas',
    data: new Date().toISOString().slice(0, 10), pagoPor: c.responsavel, divididoEntre: g.value.membros.map((m) => m.id) })
}
</script>
<template>
  <div class="row g-3">
    <div class="col-md-7">
      <p v-if="!g.fixas.length">Cadastre aluguel, internet, luz e outras contas que se repetem todo mês.</p>
      <div v-for="c in g.fixas" :key="c.id" class="cartao mb-2 d-flex flex-wrap justify-content-between align-items-center gap-2">
        <div><strong>{{ c.descricao }}</strong> - {{ brl(c.valor) }}
          <div class="small text-muted">Vence dia {{ c.dia }} - responsável: {{ nome(c.responsavel) }}</div></div>
        <div class="d-flex flex-nowrap gap-1"><button class="btn btn-sm btn-dindin text-nowrap" @click="lancar(c)">Lançar neste mês</button>
          <button class="btn btn-sm btn-outline-danger" aria-label="Excluir" @click="app.remover(g.id, 'fixas', c.id)"><i class="bi bi-trash"></i></button></div>
      </div>
    </div>
    <div class="col-md-5">
    <form class="cartao" @submit.prevent="criar">
      <h2 class="h5">Nova conta fixa</h2>
      <label class="form-label" for="fd">Descrição</label><input id="fd" v-model="f.descricao" class="form-control mb-2" required />
      <div class="row g-2 mb-2">
        <div class="col"><label class="form-label" for="fv">Valor</label><input id="fv" v-model="f.valor" type="number" step="0.01" min="0.01" class="form-control" required /></div>
        <div class="col"><label class="form-label" for="fi">Dia</label><input id="fi" v-model="f.dia" type="number" min="1" max="31" class="form-control" required /></div>
      </div>
      <label class="form-label" for="fr">Quem paga ao banco</label>
      <select id="fr" v-model="f.responsavel" class="form-select mb-3"><option v-for="m in g.membros" :key="m.id" :value="m.id">{{ m.nome }}</option></select>
      <button class="btn btn-dindin">Adicionar conta</button>
    </form>
    </div>
  </div>
</template>
