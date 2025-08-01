// =================================================================
// FUNÇÕES DE USUÁRIOS
// =================================================================

async function loadUsers() {
    console.log('👥 [USERS] Iniciando carregamento de usuários...');
    
    const tableBody = document.getElementById('usersTableBody');
    if (!tableBody) {
        console.error('❌ [USERS] Tabela de usuários não encontrada');
        return;
    }
    
    console.log('📋 [USERS] Tabela encontrada, limpando dados anteriores...');
    tableBody.innerHTML = '';
    
    // Futuramente, substituir por chamada API: GET /users
    const users = [
        { id: 1, name: 'Admin Master', email: 'admin@bim.com', roleId: 1, isActive: true },
        { id: 2, name: 'Gerente Financeiro', email: 'financeiro@bim.com', roleId: 2, isActive: true },
        { id: 3, name: 'Dr. João', email: 'joao@bim.com', roleId: 3, isActive: true },
        { id: 4, name: 'Recepcionista Ana', email: 'ana@bim.com', roleId: 4, isActive: true }
    ];

    console.log('📊 [USERS] Dados de usuários carregados:', users.length, 'usuários');
    
    users.forEach((user, index) => {
        console.log(`👤 [USERS] Processando usuário ${index + 1}:`, user.name);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.roleId}</td>
            <td><span class="status status-${user.isActive ? 'active' : 'inactive'}">${user.isActive ? 'Ativo' : 'Inativo'}</span></td>
            <td class="actions">
                <button class="action-btn action-edit" onclick="editUser(${user.id})"><i class="fas fa-edit"></i></button>
                <button class="action-btn action-delete" onclick="deleteUser(${user.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
        console.log(`✅ [USERS] Usuário ${user.name} adicionado à tabela`);
    });
    
    console.log('✅ [USERS] Carregamento de usuários concluído com sucesso!');
}

function editUser(userId) {
    console.log('✏️ [USERS] Editando usuário ID:', userId);
    // Implementar modal de edição
    console.log('📝 [USERS] Função de edição ainda não implementada');
}

function deleteUser(userId) {
    console.log('🗑️ [USERS] Tentando excluir usuário ID:', userId);
    
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        console.log('✅ [USERS] Confirmação recebida, excluindo usuário...');
        console.log('🔧 [USERS] Função de exclusão ainda não implementada');
        // Implementar exclusão via API
    } else {
        console.log('❌ [USERS] Exclusão cancelada pelo usuário');
    }
} 