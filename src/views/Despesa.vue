<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApp } from '../stores/app'
const route = useRoute(), router = useRouter(), app = useApp()
const g = computed(() => app.grupo(route.params.id))
const f = ref({ descricao: '', valor: null, categoria: 'Mercado', data: new Date().toISOString().slice(0, 10),
  pagoPor: g.value.membros[0].id, divididoEntre: g.value.membros.map((m) => m.id) })
const categorias = ['Mercado', 'Moradia', 'Contas', 'Transporte', 'Comida', 'Lazer', 'Outros']
function salvar() {
  if (!f.value.divididoEntre.length) return
  app.add(g.value.id, 'despesas', { ...f.value, valor: Number(f.value.valor) })
  router.push(`/grupo/${g.value.id}`)
}
</script>
<template>
  <form class="cartao" style="max-width:520px" @submit.prevent="salvar">
    <label class="form-label" for="d">Descrição</label>
    <input id="d" v-model="f.descricao" class="form-control mb-2" required />
    <div class="row g-2 mb-2">
      <div class="col"><label class="form-label" for="v">Valor (R$)</label>
        <input id="v" v-model="f.valor" type="number" step="0.01" min="0.01" class="form-control" required /></div>
      <div class="col"><label class="form-label" for="dt">Data</label>
        <input id="dt" v-model="f.data" type="date" class="form-control" required /></div>
    </div>
    <label class="form-label" for="c">Categoria</label>
    <select id="c" v-model="f.categoria" class="form-select mb-2"><option v-for="c in categorias" :key="c">{{ c }}</option></select>
    <label class="form-label" for="p">Quem pagou</label>
    <select id="p" v-model="f.pagoPor" class="form-select mb-2">
      <option v-for="m in g.membros" :key="m.id" :value="m.id">{{ m.nome }}</option>
    </select>
    <p class="form-label mb-1">Dividir entre</p>
    <div v-for="m in g.membros" :key="m.id" class="form-check">
      <input :id="'m' + m.id" v-model="f.divididoEntre" :value="m.id" type="checkbox" class="form-check-input" />
      <label :for="'m' + m.id" class="form-check-label">{{ m.nome }}</label>
    </div>
    <button class="btn btn-dindin mt-3">Salvar despesa</button>
  </form>
</template>
