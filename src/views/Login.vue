<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApp } from '../stores/app'
const nome = ref(''), app = useApp(), router = useRouter()
const entrar = () => { if (nome.value.trim()) { app.entrar(nome.value.trim()); router.push('/') } }
</script>
<template>
  <div class="cartao mx-auto mt-5" style="max-width:380px">
    <h1 class="h3">Dindin</h1>
    <p>Divida as contas da casa, da república ou da viagem sem planilha.</p>
    <form @submit.prevent="entrar">
      <label class="form-label" for="nome">Como você se chama?</label>
      <input id="nome" v-model="nome" class="form-control mb-3" required />
      <button class="btn btn-dindin w-100">Entrar</button>
    </form>
  </div>
</template>
