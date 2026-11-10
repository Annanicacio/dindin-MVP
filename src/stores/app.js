import { defineStore } from 'pinia'
const KEY = 'dindin-v1'
const uid = () => Math.random().toString(36).slice(2, 9)
export const useApp = defineStore('app', {
  state: () => JSON.parse(localStorage.getItem(KEY) || '{"usuario":null,"grupos":[]}'),
  getters: { grupo: (s) => (id) => s.grupos.find((g) => g.id === id) },
  actions: {
    // único ponto de persistência: troque por chamadas a uma API depois
    salvar() { localStorage.setItem(KEY, JSON.stringify({ usuario: this.usuario, grupos: this.grupos })) },
    entrar(nome, email) { this.usuario = { nome, email }; this.salvar() },
    sair() { this.usuario = null; this.salvar() },
    criarGrupo(nome, tipo, nomes) {
      const g = { id: uid(), nome, tipo, membros: nomes.map((n) => ({ id: uid(), nome: n })), despesas: [], fixas: [], acertos: [] }
      this.grupos.push(g); this.salvar(); return g.id
    },
    add(gid, lista, item) { this.grupo(gid)[lista].push({ id: uid(), ...item }); this.salvar() },
    remover(gid, lista, id) { const g = this.grupo(gid); g[lista] = g[lista].filter((i) => i.id !== id); this.salvar() },
  },
})
