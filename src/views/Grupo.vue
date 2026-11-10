<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useApp } from '../stores/app'
const route = useRoute(), app = useApp()
const g = computed(() => app.grupo(route.params.id))
</script>
<template>
  <div v-if="g">
    <h1 class="h3">{{ g.nome }}</h1>
    <nav class="abas mb-3 border-bottom">
      <RouterLink class="aba" :to="`/grupo/${g.id}`">Painel</RouterLink>
      <RouterLink class="aba" :to="`/grupo/${g.id}/despesa`">Nova despesa</RouterLink>
      <RouterLink class="aba" :to="`/grupo/${g.id}/historico`">Histórico</RouterLink>
      <RouterLink class="aba" :to="`/grupo/${g.id}/fixas`">Contas fixas</RouterLink>
    </nav>
    <RouterView />
  </div>
  <p v-else>Grupo não encontrado. <RouterLink to="/grupos">Voltar</RouterLink></p>
</template>
