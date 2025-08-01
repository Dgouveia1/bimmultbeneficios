// =================================================================
// MÓDULO: FUNÇÕES DE CLIENTES (Versão com Busca Corrigida)
// =================================================================

let allClients = []; // Cache em memória para todos os clientes
let filteredClients = []; // Cache para os clientes filtrados
let currentPage = 1;
let itemsPerPage = 25;

/**
 * Função principal chamada ao carregar a página de clientes.
 * Carrega os dados do webhook e prepara a interface.
 */
async function loadClientsData() {
    if (allClients.length > 0) {
        filterAndRender();
        return;
    }

    console.log('👥 [CLIENTS] Carregando todos os clientes do servidor...');
    const tableBody = document.getElementById('clientsTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Carregando clientes...</td></tr>`;
    
    try {
        const response = await fetch('https://webhook.ia-tess.com.br/webhook/mult-tabela-clientes');
        if (!response.ok) throw new Error(`Erro na rede: ${response.status}`);
        
        allClients = await response.json();
        console.log(`✅ [CLIENTS] ${allClients.length} clientes carregados.`);
        filterAndRender(); // Filtra e renderiza a tabela

    } catch (error) {
        console.error('💥 [CLIENTS] Falha ao carregar clientes:', error);
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:red;">Erro ao carregar os dados.</td></tr>`;
    }
}

/**
 * Filtra a lista de clientes com base no input de busca e renderiza a tabela.
 */
function filterAndRender() {
    const searchTerm = document.getElementById('clientsSearchInput').value.toLowerCase();
    
    // Se a busca estiver vazia, mostra todos os clientes
    if (!searchTerm) {
        filteredClients = [...allClients];
    } else {
        // CORREÇÃO APLICADA AQUI
        filteredClients = allClients.filter(client => {
            const nome = (client['NOME BENEFICIARIO'] || '').toLowerCase();
            // Converte CPF e Telefone para String antes de buscar
            const cpf = String(client['CPF'] || ''); 
            const telefone = String(client['TELEFONE'] || '');

            return nome.includes(searchTerm) || 
                   cpf.includes(searchTerm) ||
                   telefone.includes(searchTerm);
        });
    }
    
    currentPage = 1; // Reseta para a primeira página a cada nova busca
    renderCurrentPage();
}

/**
 * Renderiza a página atual da tabela de clientes e atualiza a paginação.
 */
function renderCurrentPage() {
    const tableBody = document.getElementById('clientsTableBody');
    if (!tableBody) return;

    itemsPerPage = parseInt(document.getElementById('itemsPerPage').value);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const clientsToShow = filteredClients.slice(startIndex, endIndex);

    tableBody.innerHTML = '';
    if (clientsToShow.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 40px 0;"><p>Nenhum cliente encontrado.</p></td></tr>`;
    } else {
        clientsToShow.forEach(client => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${client['NOME BENEFICIARIO'] || 'N/A'}</td>
                <td>${formatCPF(client['CPF'])}</td>
                <td>${formatPhone(client['TELEFONE'])}</td>
                <td>${formatDate(client['VENCIMENTO PARCELA'])}</td>
                <td>${formatDate(client['ENCERRAMENTO PLANO'])}</td>
                <td class="action-btn-group">
                    <button class="action-btn" title="Ver Cartão"><i class="fas fa-id-card"></i></button>
                    <button class="action-btn" title="Editar Cliente"><i class="fas fa-edit"></i></button>
                    <button class="action-btn action-delete" title="Excluir Cliente"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
    updateResultsInfo();
    updatePagination();
}

// --- Funções Auxiliares (Atualização de UI e Formatação) ---

function updateResultsInfo() {
    document.getElementById('resultsCount').textContent = filteredClients.length;
    document.getElementById('totalResults').textContent = allClients.length;
}

function updatePagination() {
    const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;
    paginationContainer.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.className = 'pagination-btn';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => { currentPage--; renderCurrentPage(); };
    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        if(totalPages > 5 && (i > 2 && i < totalPages -1 && (i < currentPage -1 || i > currentPage + 1) ) ){
             if(!paginationContainer.querySelector('.dots')){
                const dots = document.createElement('span');
                dots.className = 'dots';
                dots.textContent = '...';
                paginationContainer.appendChild(dots);
             }
             continue;
        }
        const pageButton = document.createElement('button');
        pageButton.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
        pageButton.textContent = i;
        pageButton.onclick = () => { currentPage = i; renderCurrentPage(); };
        paginationContainer.appendChild(pageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.className = 'pagination-btn';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => { currentPage++; renderCurrentPage(); };
    paginationContainer.appendChild(nextButton);
}

function formatCPF(cpf) { return cpf ? String(cpf).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : 'N/A'; }
function formatPhone(phone) { return phone ? String(phone).replace(/(\d{2})(\d{5}|\d{4})(\d{4})/, '($1) $2-$3') : 'N/A'; }
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const dateStr = String(dateString);
    if (dateStr.length === 8) { 
        return `${dateStr.substring(0, 2)}/${dateStr.substring(2, 4)}/${dateStr.substring(4)}`;
    }
    return dateStr;
}