// ================================
// SAFIRA - API Functions
// ================================

/**
 * Fazer requisição GET para listar dados
 * @param {string} acao - Ação a executar (listar-estoque, listar-clientes, etc)
 * @returns {Promise} Dados da API
 */
async function apiGet(acao) {
  try {
    const url = `${CONFIG.API_URL}?acao=${acao}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status !== 'sucesso') {
      console.error('Erro na API:', data.mensagem);
      return [];
    }
    
    return data.dados || [];
  } catch (error) {
    console.error('Erro ao conectar:', error);
    return [];
  }
}

/**
 * Fazer requisição POST para salvar dados
 * @param {string} modulo - Módulo (estoque, clientes, etc)
 * @param {object} dados - Dados a salvar
 * @returns {Promise} Resposta da API
 */
async function apiPost(modulo, dados) {
  try {
    const payload = {
      modulo: modulo,
      senha: CONFIG.SENHA,
      ...dados
    };

    const response = await fetch(CONFIG.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao salvar:', error);
    return { status: 'erro', mensagem: error.message };
  }
}

// ================================
// FUNÇÕES POR MÓDULO
// ================================

// ESTOQUE
async function listarEstoque() {
  return await apiGet('listar-estoque');
}

async function salvarProduto(dados) {
  return await apiPost('estoque', dados);
}

// CLIENTES
async function listarClientes() {
  return await apiGet('listar-clientes');
}

async function salvarCliente(dados) {
  return await apiPost('clientes', dados);
}

// VENDAS
async function listarVendas() {
  return await apiGet('listar-vendas');
}

async function salvarVenda(dados) {
  return await apiPost('vendas', dados);
}

// SERVIÇOS
async function listarServicos() {
  return await apiGet('listar-servicos');
}

async function salvarServico(dados) {
  return await apiPost('servicos', dados);
}

// FINANCEIRO
async function listarFinanceiro() {
  return await apiGet('listar-financeiro');
}

async function salvarFinanceiro(dados) {
  return await apiPost('financeiro', dados);
}
