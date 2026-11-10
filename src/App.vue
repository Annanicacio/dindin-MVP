<script setup>
import { useApp } from './stores/app'
import { useRouter, useRoute } from 'vue-router'
const app = useApp(), router = useRouter(), route = useRoute()
const sair = () => { app.sair(); router.push('/login') }
</script>
<template>
  <header v-if="app.usuario && !route.meta.cheia" class="topo py-3">
    <div class="container d-flex justify-content-between align-items-center">
      <RouterLink to="/grupos" class="text-white text-decoration-none fs-4 fw-bold"><i class="bi bi-piggy-bank"></i> Dindin</RouterLink>
      <div><span class="me-3">{{ app.usuario.nome }}</span>
        <button class="btn btn-sm btn-outline-light" @click="sair">Sair</button></div>
    </div>
  </header>
  <main :class="{ 'container py-4': !route.meta.cheia }">
    <RouterView />
    <aside v-if="app.usuario && route.path !== '/interesse' && !route.meta.cheia" class="cartao cartao-interesse mt-4 d-flex flex-column flex-sm-row align-items-sm-center gap-3">
      <i class="bi bi-megaphone fs-2 positivo" aria-hidden="true"></i>
      <div class="flex-grow-1">
        <h2 class="h6 mb-1">Quer usar o Dindin em viagens, festas ou por mês?</h2>
        <p class="small mb-0">Entre na lista de interessados e seja avisado quando lançarmos.</p>
      </div>
      <RouterLink to="/interesse" class="btn btn-dindin">Quero ser avisado</RouterLink>
    </aside>
  </main>
</template>
