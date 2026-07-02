// ================================
// SAFIRA - Utility Functions
// ================================

/**
 * Formatar valor em moeda brasileira
 * @param {number} valor - Valor a formatar
 * @returns {string} Valor formatado em R$
 */
function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

/**
 * Formatar data para DD/MM/YYYY
 * @param {string|Date} data - Data a formatar
 * @returns {string} Data formatada
 */
function formatarData(data) {
  if (!data) return '';
  
  const d = new Date(data);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();
  
  return `${dia}/${mes}/${ano}`;
}

/**
 * Formatar hora para HH:MM
 * @param {string|Date} data - Data/hora a formatar
 * @returns {string} Hora formatada
 */
function formatarHora(data) {
  if (!data) return '';
  
  const d = new Date(data);
  const horas = String(d.getHours()).padStart(2, '0');
  const minutos = String(d.getMinutes()).padStart(2, '0');
  
  return `${horas}:${minutos}`;
}

/**
 * Validar email
 * @param {string} email - Email a validar
 * @returns {boolean} True se válido
 */
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validar telefone brasileiro
 * @param {string} telefone - Telefone a validar
 * @returns {boolean} True se válido
 */
function validarTelefone(telefone) {
  const regex = /^\(?[0-9]{2}\)?[\s]?9?[\s]?[0-9]{4}[-]?[0-9]{4}$/;
  return regex.test(telefone);
}

/**
 * Validar CPF
 * @param {string} cpf - CPF a validar
 * @returns {boolean} True se válido
 */
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, '');
  
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  // Verificar primeiro dígito
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf[i]) * (10 - i);
  }
  let resto = soma % 11;
  let digito1 = resto < 2 ? 0 : 11 - resto;
  
  if (parseInt(cpf[9]) !== digito1) return false;
  
  // Verificar segundo dígito
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf[i]) * (11 - i);
  }
  resto = soma % 11;
  let digito2 = resto < 2 ? 0 : 11 - resto;
  
  if (parseInt(cpf[10]) !== digito2) return false;
  
  return true;
}

/**
 * Máscara para CPF (000.000.000-00)
 * @param {string} cpf - CPF sem máscara
 * @returns {string} CPF com máscara
 */
function mascaraCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, '');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Máscara para telefone ((00) 90000-0000)
 * @param {string} telefone - Telefone sem máscara
 * @returns {string} Telefone com máscara
 */
function mascaraTelefone(telefone) {
  telefone = telefone.replace(/[^\d]/g, '');
  
  if (telefone.length === 11) {
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (telefone.length === 10) {
    return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return telefone;
}

/**
 * Calcular lucro (%)
 * @param {number} custo - Preço de custo
 * @param {number} venda - Preço de venda
 * @returns {number} Percentual de lucro
 */
function calcularLucro(custo, venda) {
  if (custo === 0) return 0;
  return ((venda - custo) / custo * 100).toFixed(2);
}

/**
 * Mostrar mensagem de sucesso
 * @param {string} mensagem - Mensagem a mostrar
 * @param {number} duracao - Duração em ms (padrão: 3000)
 */
function mostrarSucesso(mensagem, duracao = 3000) {
  mostrarNotificacao(mensagem, 'sucesso', duracao);
}

/**
 * Mostrar mensagem de erro
 * @param {string} mensagem - Mensagem a mostrar
 * @param {number} duracao - Duração em ms (padrão: 5000)
 */
function mostrarErro(mensagem, duracao = 5000) {
  mostrarNotificacao(mensagem, 'erro', duracao);
}

/**
 * Mostrar mensagem de aviso
 * @param {string} mensagem - Mensagem a mostrar
 * @param {number} duracao - Duração em ms (padrão: 4000)
 */
function mostrarAviso(mensagem, duracao = 4000) {
  mostrarNotificacao(mensagem, 'aviso', duracao);
}

/**
 * Função interna para mostrar notificações
 */
function mostrarNotificacao(mensagem, tipo, duracao) {
  const div = document.createElement('div');
  div.className = `notificacao notificacao-${tipo}`;
  div.textContent = mensagem;
  
  const style = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 6px;
    z-index: 9999;
    animation: slideIn 0.3s ease;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  `;
  
  if (tipo === 'sucesso') {
    div.style.cssText = `${style} background: #d4edda; color: #155724; border: 1px solid #c3e6cb;`;
  } else if (tipo === 'erro') {
    div.style.cssText = `${style} background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;`;
  } else if (tipo === 'aviso') {
    div.style.cssText = `${style} background: #fff3cd; color: #856404; border: 1px solid #ffeaa7;`;
  }
  
  document.body.appendChild(div);
  
  setTimeout(() => {
    div.style.opacity = '0';
    div.style.transition = 'opacity 0.3s ease';
    setTimeout(() => div.remove(), 300);
  }, duracao);
}

/**
 * Gerar ID único
 * @returns {string} ID único
 */
function gerarID() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Obter data de hoje no formato YYYY-MM-DD
 * @returns {string} Data de hoje
 */
function obterDataHoje() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  
  return `${ano}-${mes}-${dia}`;
}

/**
 * Limpar formulário
 * @param {string} selectorFormulario - Seletor CSS do formulário
 */
function limparFormulario(selectorFormulario) {
  const formulario = document.querySelector(selectorFormulario);
  if (formulario) {
    formulario.reset();
  }
}

/**
 * Fechar modal
 * @param {string} selectorModal - Seletor CSS do modal
 */
function fecharModal(selectorModal) {
  const modal = document.querySelector(selectorModal);
  if (modal) {
    modal.style.display = 'none';
  }
}

/**
 * Abrir modal
 * @param {string} selectorModal - Seletor CSS do modal
 */
function abrirModal(selectorModal) {
  const modal = document.querySelector(selectorModal);
  if (modal) {
    modal.style.display = 'flex';
  }
}
