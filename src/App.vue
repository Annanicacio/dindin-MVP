<script setup>
import { useApp } from './stores/app'
import { useRouter } from 'vue-router'
const app = useApp(), router = useRouter()
const sair = () => { app.sair(); router.push('/login') }
</script>
<template>
  <header v-if="app.usuario" class="topo py-3">
    <div class="container d-flex justify-content-between align-items-center">
      <RouterLink to="/" class="text-white text-decoration-none fs-4 fw-bold"><i class="bi bi-piggy-bank"></i> Dindin</RouterLink>
      <div><span class="me-3">{{ app.usuario.nome }}</span>
        <button class="btn btn-sm btn-outline-light" @click="sair">Sair</button></div>
    </div>
  </header>
  <main class="container py-4"><RouterView /></main>
</template>
