export const brl = (v) => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// saldo > 0: tem a receber | saldo < 0: está devendo
export function calcularSaldos(g) {
  const s = Object.fromEntries(g.membros.map((m) => [m.id, 0]))
  for (const d of g.despesas) {
    const parte = d.valor / d.divididoEntre.length
    s[d.pagoPor] += d.valor
    d.divididoEntre.forEach((id) => (s[id] -= parte))
  }
  for (const a of g.acertos) { s[a.de] += a.valor; s[a.para] -= a.valor }
  return s
}

// transforma saldos em poucos pagamentos: "fulano paga X a beltrano"
export function sugerirAcertos(saldos) {
  const dev = [], rec = []
  for (const [id, v] of Object.entries(saldos)) {
    if (v < -0.01) dev.push({ id, v: -v }); else if (v > 0.01) rec.push({ id, v })
  }
  const out = []
  while (dev.length && rec.length) {
    const d = dev[0], r = rec[0], x = Math.min(d.v, r.v)
    out.push({ de: d.id, para: r.id, valor: Math.round(x * 100) / 100 })
    d.v -= x; r.v -= x
    if (d.v < 0.01) dev.shift()
    if (r.v < 0.01) rec.shift()
  }
  return out
}
