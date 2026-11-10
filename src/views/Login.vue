<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApp } from '../stores/app'
import { registrar, planilhaAtiva } from '../utils/leads'
const nome = ref(''), email = ref(''), aceite = ref(false), enviando = ref(false)
const app = useApp(), router = useRouter()
async function entrar() {
  const dados = { nome: nome.value.trim(), email: email.value.trim().toLowerCase() }
  if (!dados.nome || !dados.email) return
  enviando.value = true
  // o cadastro do visitante não bloqueia a demo se a rede falhar
  try { await registrar('visitantes', dados) } catch (e) { console.error(e) }
  enviando.value = false
  app.entrar(dados.nome, dados.email)
  router.push('/grupos')
}
</script>
<template>
  <div class="mx-auto mt-5" style="max-width:400px">
    <RouterLink to="/" class="link-escuro small text-decoration-none d-inline-block mb-2">
      <i class="bi bi-arrow-left" aria-hidden="true"></i> Voltar para o início
    </RouterLink>
  <div class="cartao">
    <h1 class="h3"><RouterLink to="/" class="link-escuro text-decoration-none">Dindin</RouterLink></h1>
    <p>Divida as contas da casa, da república ou da viagem sem planilha.</p>
    <div v-if="!planilhaAtiva" class="alert alert-warning small py-2" role="status">
      Modo teste: a planilha não está configurada (falta o <code>.env.local</code>). Os cadastros ficam só neste navegador.
    </div>
    <form @submit.prevent="entrar">
      <label class="form-label" for="nome">Como você se chama?</label>
      <input id="nome" v-model="nome" class="form-control mb-2" autocomplete="name" required />
      <label class="form-label" for="email">Seu e-mail</label>
      <input id="email" v-model="email" type="email" class="form-control mb-3" autocomplete="email" required />
      <div class="form-check mb-3">
        <input id="aceite" v-model="aceite" type="checkbox" class="form-check-input" required />
        <label class="form-check-label small" for="aceite">
          Aceito que meu nome e e-mail sejam usados pela equipe do Dindin para fins deste projeto acadêmico.
        </label>
      </div>
      <button class="btn btn-dindin w-100" :disabled="enviando">{{ enviando ? 'Entrando...' : 'Testar a demo' }}</button>
    </form>
    <p class="small text-center mt-3 mb-0">
      Quer usar em viagens, festas ou por mês? <RouterLink to="/interesse" class="link-escuro">Entre na lista de interessados</RouterLink>
    </p>
  </div>
  </div>
</template>
