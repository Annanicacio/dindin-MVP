// Envio de cadastros (visitantes da demo e interessados) para uma planilha Google via Apps Script.
// Sem VITE_SHEETS_URL no .env.local, salva no localStorage (modo teste).
const URL = import.meta.env.VITE_SHEETS_URL
const LOCAL = 'dindin-leads'

export const planilhaAtiva = Boolean(URL)

export async function registrar(tabela, dados) {
  if (!planilhaAtiva) {
    const tudo = JSON.parse(localStorage.getItem(LOCAL) || '{}')
    ;(tudo[tabela] ||= []).push({ ...dados, criado_em: new Date().toISOString() })
    localStorage.setItem(LOCAL, JSON.stringify(tudo))
    console.warn(`[Dindin] Planilha não configurada: "${tabela}" salvo no localStorage.`)
    return
  }
  // "no-cors" + text/plain evita o bloqueio de CORS do Apps Script.
  // A resposta não pode ser lida; só falhas de rede geram erro.
  await fetch(URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ tabela, ...dados }),
  })
}
