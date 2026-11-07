<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useApp } from '../stores/app'
import { brl, calcularSaldos, sugerirAcertos } from '../utils/saldos'
const route = useRoute(), app = useApp()
const g = computed(() => app.grupo(route.params.id))
const nome = (id) => g.value.membros.find((m) => m.id === id)?.nome
const saldos = computed(() => calcularSaldos(g.value))
const sugestoes = computed(() => sugerirAcertos(saldos.value))
const total = computed(() => g.value.despesas.reduce((t, d) => t + d.valor, 0))
const pagar = (s) => app.add(g.value.id, 'acertos', { ...s, data: new Date().toISOString().slice(0, 10) })
</script>
<template>
  <div class="row g-3">
    <div class="col-md-6"><div class="cartao">
      <h2 class="h5">Saldo de cada pessoa</h2>
      <p class="small text-muted">Total gasto pelo grupo: {{ brl(total) }}</p>
      <div v-for="m in g.membros" :key="m.id" class="d-flex justify-content-between py-1">
        <span>{{ m.nome }}</span>
        <span :class="saldos[m.id] >= 0 ? 'positivo' : 'negativo'">
          {{ saldos[m.id] >= 0 ? 'recebe' : 'deve' }} {{ brl(Math.abs(saldos[m.id])) }}
        </span>
      </div>
    </div></div>
    <div class="col-md-6"><div class="cartao">
      <h2 class="h5">Acertos pendentes</h2>
      <p v-if="!sugestoes.length">Tudo certo, ninguém deve nada.</p>
      <div v-for="(s, i) in sugestoes" :key="i" class="d-flex justify-content-between align-items-center py-1">
        <span>{{ nome(s.de) }} paga {{ brl(s.valor) }} a {{ nome(s.para) }}</span>
        <button class="btn btn-sm btn-dindin" @click="pagar(s)">Marcar como pago</button>
      </div>
    </div></div>
  </div>
</template>
