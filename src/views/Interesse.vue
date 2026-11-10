<script setup>
import { ref } from 'vue'
import { useApp } from '../stores/app'
import { registrar, planilhaAtiva } from '../utils/leads'
const app = useApp()
const opcoes = { viagem: 'Viagens em grupo', festa: 'Festas e eventos', mensal: 'Controle por mês' }
const f = ref({ nome: app.usuario?.nome || '', email: app.usuario?.email || '', telefone: '', interesses: [] })
const aceite = ref(false), enviando = ref(false), ok = ref(false), erro = ref('')

// máscara simples: (11) 91234-5678
function mascarar(e) {
  const d = e.target.value.replace(/\D/g, '').slice(0, 11)
  f.value.telefone = d.length > 6 ? `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`
    : d.length > 2 ? `(${d.slice(0, 2)}) ${d.slice(2)}` : d
}

async function enviar() {
  erro.value = ''
  const tel = f.value.telefone.replace(/\D/g, '')
  if (tel.length < 10) { erro.value = 'Informe um telefone com DDD.'; return }
  enviando.value = true
  try {
    await registrar('interessados', {
      nome: f.value.nome.trim(), email: f.value.email.trim().toLowerCase(), telefone: tel, interesses: f.value.interesses,
    })
    ok.value = true
  } catch (e) {
    console.error(e); erro.value = 'Não foi possível enviar agora. Tente novamente em instantes.'
  } finally { enviando.value = false }
}
</script>
<template>
  <div class="mx-auto mt-4" style="max-width:460px">
    <RouterLink to="/" class="link-escuro small text-decoration-none d-inline-block mb-2">
      <i class="bi bi-arrow-left" aria-hidden="true"></i> Voltar para o início
    </RouterLink>
  <div class="cartao">
    <template v-if="ok">
      <h1 class="h4"><i class="bi bi-check-circle positivo"></i> Obrigado, {{ f.nome.split(' ')[0] }}!</h1>
      <p>Avisaremos você assim que viagens, festas e o controle por mês estiverem disponíveis.</p>
      <RouterLink :to="app.usuario ? '/grupos' : '/login'" class="btn btn-dindin">Voltar para a demo</RouterLink>
    </template>
    <form v-else @submit.prevent="enviar">
      <h1 class="h4">Lista de interessados</h1>
      <div v-if="!planilhaAtiva" class="alert alert-warning small py-2" role="status">
        Modo teste: a planilha não está configurada (falta o <code>.env.local</code>). Os cadastros ficam só neste navegador.
      </div>
      <p>Estamos preparando grupos para <strong>viagens, festas</strong> e <strong>controle de contas por mês</strong>.
        Deixe seu contato para ser avisado e ajudar a definir o produto.</p>
      <label class="form-label" for="in">Nome</label>
      <input id="in" v-model="f.nome" class="form-control mb-2" autocomplete="name" required />
      <label class="form-label" for="ie">E-mail</label>
      <input id="ie" v-model="f.email" type="email" class="form-control mb-2" autocomplete="email" required />
      <label class="form-label" for="it">Telefone / WhatsApp</label>
      <input id="it" :value="f.telefone" @input="mascarar" type="tel" inputmode="numeric" class="form-control mb-3"
        placeholder="(11) 91234-5678" autocomplete="tel" required />
      <fieldset class="mb-3">
        <legend class="form-label fs-6">O que você gostaria de usar? <span class="text-muted small">(opcional)</span></legend>
        <div v-for="(l, k) in opcoes" :key="k" class="form-check">
          <input :id="`op-${k}`" v-model="f.interesses" :value="k" type="checkbox" class="form-check-input" />
          <label class="form-check-label" :for="`op-${k}`">{{ l }}</label>
        </div>
      </fieldset>
      <div class="form-check mb-3">
        <input id="ia" v-model="aceite" type="checkbox" class="form-check-input" required />
        <label class="form-check-label small" for="ia">
          Aceito ser contatado pela equipe do Dindin por e-mail ou WhatsApp sobre o lançamento.
        </label>
      </div>
      <p v-if="erro" class="negativo small" role="alert">{{ erro }}</p>
      <button class="btn btn-dindin w-100" :disabled="enviando">{{ enviando ? 'Enviando...' : 'Quero ser avisado' }}</button>
    </form>
  </div>
  </div>
</template>

