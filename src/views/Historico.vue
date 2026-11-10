<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useApp } from '../stores/app'
import { brl } from '../utils/saldos'
const route = useRoute(), app = useApp()
const g = computed(() => app.grupo(route.params.id))
const mes = ref(''), quem = ref(''), busca = ref('')
const nome = (id) => g.value.membros.find((m) => m.id === id)?.nome
const lista = computed(() => g.value.despesas
  .filter((d) => (!mes.value || d.data.startsWith(mes.value)) && (!quem.value || d.pagoPor === quem.value)
    && d.descricao.toLowerCase().includes(busca.value.toLowerCase()))
  .sort((a, b) => b.data.localeCompare(a.data)))
</script>
<template>
  <div class="row g-2 mb-3">
    <div class="col-md-4"><input v-model="busca" class="form-control" placeholder="Buscar descrição" aria-label="Buscar" /></div>
    <div class="col-md-4"><input v-model="mes" type="month" class="form-control" aria-label="Mês" /></div>
    <div class="col-md-4"><select v-model="quem" class="form-select" aria-label="Quem pagou">
      <option value="">Todos que pagaram</option><option v-for="m in g.membros" :key="m.id" :value="m.id">{{ m.nome }}</option></select></div>
  </div>
  <p v-if="!lista.length">Nenhuma despesa encontrada.</p>
  <template v-else>
  <!-- mobile: lista em cartões -->
  <div class="d-md-none">
    <div v-for="d in lista" :key="d.id" class="cartao mb-2 d-flex justify-content-between align-items-center gap-2">
      <div class="text-break">
        <strong>{{ d.descricao }}</strong> - {{ brl(d.valor) }}
        <div class="small text-muted">{{ d.data.split('-').reverse().join('/') }} · {{ d.categoria }} · pagou: {{ nome(d.pagoPor) }}</div>
      </div>
      <button class="btn btn-sm btn-outline-danger flex-shrink-0" aria-label="Excluir" @click="app.remover(g.id, 'despesas', d.id)"><i class="bi bi-trash"></i></button>
    </div>
  </div>
  <!-- desktop: tabela -->
  <div class="table-responsive d-none d-md-block"><table class="table bg-white align-middle">
    <thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Pagou</th><th>Valor</th><th></th></tr></thead>
    <tbody><tr v-for="d in lista" :key="d.id">
      <td>{{ d.data.split('-').reverse().join('/') }}</td><td>{{ d.descricao }}</td><td>{{ d.categoria }}</td>
      <td>{{ nome(d.pagoPor) }}</td><td>{{ brl(d.valor) }}</td>
      <td><button class="btn btn-sm btn-outline-danger" aria-label="Excluir" @click="app.remover(g.id, 'despesas', d.id)"><i class="bi bi-trash"></i></button></td>
    </tr></tbody></table></div>
  </template>
</template>
