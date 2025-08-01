// =================================================================
// INICIALIZAÇÃO E CONTROLE DE SESSÃO
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 [MAIN] DOM carregado - Iniciando aplicação...');
    
    const authToken = localStorage.getItem('authToken');
    const userRoleId = localStorage.getItem('userRoleId');
    
    console.log('🔐 [MAIN] Verificando autenticação...', {
        hasAuthToken: !!authToken,
        userRoleId: userRoleId
    });
    
    if (authToken && userRoleId) {
        console.log('✅ [MAIN] Usuário autenticado - Carregando dashboard...');
        showDashboard();
        setupPermissions(userRoleId);
        navigateToPage('home');
    } else {
        console.log('❌ [MAIN] Usuário não autenticado - Mostrando tela de login...');
        showLoginScreen();
    }
    
    console.log('⚙️ [MAIN] Configurando event listeners...');
    setupEventListeners();
    console.log('✅ [MAIN] Aplicação inicializada com sucesso!');
});

// =================================================================
// FUNÇÕES DE INICIALIZAÇÃO DE DADOS (PLACEHOLDER)
// =================================================================

// Funções placeholder para carregamento de dados que ainda não foram implementadas
// function loadClientsData() {
//     console.log('📊 [MAIN] Carregando dados de clientes...');
//     // Implementar carregamento de dados de clientes
// }

function loadLaboratoryData() {
    console.log('🔬 [MAIN] Carregando dados de laboratório...');
    // Implementar carregamento de dados de laboratório
}

function loadProductsData() {
    console.log('📦 [MAIN] Carregando dados de produtos...');
    // Implementar carregamento de dados de produtos
}

function loadFinancialData() {
    console.log('💰 [MAIN] Carregando dados financeiros...');
    // Implementar carregamento de dados financeiros
}

function loadDisparosData() {
    console.log('📢 [MAIN] Carregando dados de disparos...');
    // Implementar carregamento de dados de disparos
} 