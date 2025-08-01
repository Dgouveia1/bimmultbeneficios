// =================================================================
// FUNÇÕES DE LOGIN E AUTENTICAÇÃO
// =================================================================

async function handleLoginSubmit(event) {
    console.log('🔐 [AUTH] Iniciando processo de login...');
    event.preventDefault();
    
    const loginForm = event.target;
    const username = loginForm.querySelector('#username').value;
    const password = loginForm.querySelector('#password').value;
    
    console.log('👤 [AUTH] Dados de login coletados:', {
        username: username,
        passwordLength: password.length
    });
    
    const n8nWebhookUrl = 'https://webhook.ia-tess.com.br/webhook/login';
    console.log('🌐 [AUTH] Enviando requisição para:', n8nWebhookUrl);
    
    try {
        console.log('📤 [AUTH] Enviando dados de autenticação...');
        const response = await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, password: password })
        });
        
        console.log('📥 [AUTH] Resposta recebida:', {
            status: response.status,
            ok: response.ok
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ [AUTH] Resposta do servidor válida:', {
                hasToken: !!data.token,
                hasUser: !!data.user,
                hasRoleId: !!(data.user && data.user.roleId)
            });
            
            if (data && data.token && data.user && data.user.roleId) {
                console.log('💾 [AUTH] Salvando dados de autenticação no localStorage...');
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userRoleId', data.user.roleId);
                
                console.log('🔄 [AUTH] Recarregando página para aplicar autenticação...');
                window.location.reload();
            } else { 
                console.error('❌ [AUTH] Resposta do servidor inválida:', data);
                alert('Resposta do servidor inválida.'); 
            }
        } else {
            console.error('❌ [AUTH] Falha no login - Status:', response.status);
            alert('Falha no login: Credenciais inválidas.');
        }
    } catch (error) {
        console.error('💥 [AUTH] Erro de conexão:', error);
        alert('Não foi possível conectar ao servidor.');
    }
}

function logout() {
    console.log('🚪 [AUTH] Iniciando logout...');
    
    console.log('🗑️ [AUTH] Removendo dados de autenticação...');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRoleId');
    
    console.log('🔄 [AUTH] Recarregando página...');
    window.location.reload();
}

function showDashboard() {
    console.log('🏠 [AUTH] Mostrando dashboard...');
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
    console.log('✅ [AUTH] Dashboard exibido com sucesso');
}

function showLoginScreen() {
    console.log('🔐 [AUTH] Mostrando tela de login...');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('dashboard').style.display = 'none';
    console.log('✅ [AUTH] Tela de login exibida com sucesso');
}

function setupPermissions(roleId) {
    console.log('🔒 [AUTH] Configurando permissões para roleId:', roleId);
    
    const isAdmin = roleId == 1 || roleId == 2;
    console.log('👑 [AUTH] Usuário é admin?', isAdmin);
    
    const adminElements = document.querySelectorAll('.admin-only');
    console.log('🎯 [AUTH] Elementos admin encontrados:', adminElements.length);
    
    adminElements.forEach(el => {
        el.style.display = isAdmin ? 'block' : 'none';
    });
    
    console.log('✅ [AUTH] Permissões configuradas com sucesso');
} 