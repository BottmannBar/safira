// ================================
// SAFIRA - Configuração Global
// ================================

const CONFIG = {
  // 🔗 IMPORTANTE: Substitua pela URL do seu Google Apps Script
  API_URL: 'https://script.google.com/macros/s/AKfycbxLji6TUHczkizooRbwVOX5YwcUGmrH-nOtc8RjJqRwshzoBcLdnNlSAfA0z31oOFjb2g/exec',
  
  // 🔐 Senha de acesso (mude isso!)
  SENHA: 'SAFIRA_2026',
  
  // 📱 Informações do App
  APP_NAME: 'SAFIRA',
  APP_VERSION: '1.0.0',
  APP_SUBTITLE: 'Do Alvorecer',
  
  // 🎨 Cores da marca
  CORES: {
    primaria: '#1E3FA3',
    secundaria: '#7CC6F0',
    acento: '#00d4aa',
    fundo: '#080C1F'
  },

  // 📊 Módulos disponíveis
  MODULOS: [
    { id: 'estoque', nome: '📦 Estoque', ativo: true },
    { id: 'clientes', nome: '👥 Clientes', ativo: true },
    { id: 'vendas', nome: '🛒 Ordem de Venda', ativo: true },
    { id: 'servicos', nome: '🔧 Serviço Técnico', ativo: true },
    { id: 'financeiro', nome: '💰 Financeiro', ativo: true },
    { id: 'relatorios', nome: '📊 Relatórios', ativo: true }
  ]
};

// Exportar para usar em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
