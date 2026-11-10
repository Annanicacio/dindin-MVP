/**
 * Dindin - recebe os cadastros do app e grava na planilha "Clientes da DinDin".
 * Como instalar: veja o passo a passo no README (seção "Coleta de contatos").
 *
 * Os valores são gravados de acordo com os títulos da linha 1 de cada aba.
 * Títulos reconhecidos: Nome, E-mail, Telefone, Data, Interesses.
 * Para guardar a data ou os interesses, basta criar uma coluna com esse título.
 */
const PLANILHA_ID = '10S0PbVjo7SxgXjECpx78N0dXC_RKCBEqfuShm1KyNNg';
const ABAS = {
  visitantes: 'Visitantes',
  interessados: 'Interessados - Premium',
};

/**
 * TESTE: rode esta função no editor (botão Executar) para autorizar o script.
 * Ela grava uma linha "Teste" na aba Visitantes e mostra o resultado no Registro de execução.
 */
function testar() {
  const r = JSON.parse(doPost({ postData: { contents: JSON.stringify(
    { tabela: 'visitantes', nome: 'Teste', email: 'teste@exemplo.com' }) } }).getContent());
  if (!r.ok) throw new Error('Falhou: ' + r.erro);
  console.log('Deu certo! Confira a linha "Teste" na aba Visitantes.');
}

function doPost(e) {
  if (!e || !e.postData) {
    throw new Error('Não rode doPost pelo botão Executar. Selecione a função "testar" no menu ao lado e execute de novo.');
  }
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // evita linhas sobrepostas com envios simultâneos
  try {
    const d = JSON.parse(e.postData.contents);
    const nomeAba = ABAS[d.tabela];
    if (!nomeAba) return resposta({ ok: false, erro: 'tabela inválida' });

    const aba = SpreadsheetApp.openById(PLANILHA_ID).getSheetByName(nomeAba);
    if (!aba) return resposta({ ok: false, erro: 'aba não encontrada: ' + nomeAba });

    const limpa = (v) => String(v || '').trim().slice(0, 200); // limita tamanho
    const valores = {
      'nome': limpa(d.nome),
      'e-mail': limpa(d.email),
      'email': limpa(d.email),
      // o apóstrofo mantém o telefone como texto (não vira número)
      'telefone': d.telefone ? "'" + limpa(d.telefone) : '',
      'data': new Date(),
      'interesses': limpa((d.interesses || []).join(', ')),
    };

    const titulos = aba.getRange(1, 1, 1, aba.getLastColumn()).getValues()[0];
    const linha = titulos.map((t) => valores[String(t).trim().toLowerCase()] ?? '');
    aba.appendRow(linha);
    return resposta({ ok: true });
  } catch (err) {
    return resposta({ ok: false, erro: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function resposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

