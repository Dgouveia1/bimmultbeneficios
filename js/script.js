        document.addEventListener('DOMContentLoaded', () => {
            const isLoggedIn = localStorage.getItem('loggedIn');

            if (isLoggedIn === 'true') {
                console.log('Usuário já está logado');
                loginScreen.style.display = 'none';
                dashboard.style.display = 'flex';
                initializeDashboard();
            } else {
                console.log('Usuário precisa fazer login');
                loginScreen.style.display = 'flex';
                dashboard.style.display = 'none';
            }
        });


        // Sample data for clients
        let clientsData = [];

async function loadClientsData() {
    try {
        const response = await fetch('https://webhook.ia-tess.com.br/webhook/carga-clientes', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },

        });

        if (response.ok) {
            const newData = await response.json();
            // Compare newData with clientsData
            const isDifferent = JSON.stringify(newData) !== JSON.stringify(clientsData);
            if (isDifferent) {
                clientsData = newData;
                populateClientsTable();
            }
        } else {
            console.error('Erro ao carregar clientes:', response.statusText);
        }
    } catch (error) {
        console.error('Falha na requisição do webhook:', error);
    }
}

function startClientsPolling() {
    setInterval(() => {
        loadClientsData();
    }, 10000); // CADA 10 SEGUNDOS
}





        // Sample data for products
        let productsData = [];
const productsWebhookUrl = 'https://webhook.ia-tess.com.br/webhook/d5408cf6-3ae5-4e2f-bdb3-bee8882e704d'; // URL do seu webhook para produtos

// Função para carregar dados de produtos
async function loadProductsData() {
    try {
        const response = await fetch(productsWebhookUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const newData = await response.json();
            const isDifferent = JSON.stringify(newData) !== JSON.stringify(productsData);
            if (isDifferent) {
                productsData = newData;
                populateProductsTable();
            }
        } else {
            console.error('Erro ao carregar produtos:', response.statusText);
        }
    } catch (error) {
        console.error('Falha na requisição do webhook:', error);
    }
}

// Polling para produtos (1 minuto)
function startProductsPolling() {
    setInterval(() => {
        loadProductsData();
    }, 10000); // 10 segundos
}

        // Sample data for finance
        const financeData = [
            { date: '2025-06-16', client: 'ANTONIO OLIVEIRA DE ALMEIDA', description: 'Mensalidade Plano Premium', type: 'receita', value: 289.90, status: 'pago', dueDate: '2025-06-15' },
            { date: '2025-06-15', client: 'MARIA IZABEL TORINI', description: 'Taxa de Adesão', type: 'receita', value: 99.90, status: 'pago', dueDate: '2025-06-15' },
            { date: '2025-06-14', client: 'JOSE PASCHOALINI', description: 'Mensalidade Plano Essencial', type: 'receita', value: 189.90, status: 'pendente', dueDate: '2025-06-20' },
            { date: '2025-06-13', client: 'LUCAS SUGAMARA LIMA', description: 'Mult Funeral', type: 'receita', value: 16.80, status: 'atrasado', dueDate: '2025-06-10' },
            { date: '2025-06-12', client: 'Fornecedor XYZ', description: 'Compra de Materiais', type: 'despesa', value: 1250.00, status: 'pago', dueDate: '2025-06-12' },
            { date: '2025-06-11', client: 'CLETTON REGINALDO', description: 'Club Mult', type: 'receita', value: 16.25, status: 'pago', dueDate: '2025-06-11' },
            { date: '2025-06-10', client: 'Empresa ABC', description: 'Serviços de TI', type: 'despesa', value: 850.00, status: 'pendente', dueDate: '2025-06-25' },
            { date: '2025-06-09', client: 'ANTONIO OLIVEIRA DE ALMEIDA', description: 'Telemedicina', type: 'receita', value: 65.60, status: 'pago', dueDate: '2025-06-09' }
        ];

        // Sample data for tasks
        const tasksData = [
            { id: 1, title: 'Revisar contratos de clientes', description: 'Revisar e atualizar contratos vencidos', priority: 'high', dueDate: '2025-06-20', status: 'todo' },
            { id: 2, title: 'Atualizar sistema de pagamentos', description: 'Implementar nova gateway de pagamento', priority: 'medium', dueDate: '2025-06-25', status: 'todo' },
            { id: 3, title: 'Treinamento equipe vendas', description: 'Capacitar equipe sobre novos produtos', priority: 'high', dueDate: '2025-06-18', status: 'todo' },
            { id: 4, title: 'Análise financeira mensal', description: 'Preparar relatório financeiro de maio', priority: 'medium', dueDate: '2025-06-22', status: 'todo' },
            { id: 5, title: 'Backup do sistema', description: 'Realizar backup completo dos dados', priority: 'low', dueDate: '2025-06-30', status: 'todo' },
            { id: 6, title: 'Desenvolver nova funcionalidade', description: 'Criar módulo de relatórios avançados', priority: 'high', dueDate: '2025-06-28', status: 'inprogress' },
            { id: 7, title: 'Reunião com fornecedores', description: 'Negociar novos contratos de fornecimento', priority: 'medium', dueDate: '2025-06-19', status: 'inprogress' },
            { id: 8, title: 'Auditoria de segurança', description: 'Verificar vulnerabilidades do sistema', priority: 'high', dueDate: '2025-06-21', status: 'inprogress' },
            { id: 9, title: 'Campanha de marketing', description: 'Lançar campanha para novos produtos', priority: 'low', dueDate: '2025-06-15', status: 'completed' },
            { id: 10, title: 'Atualização de documentação', description: 'Atualizar manuais do usuário', priority: 'low', dueDate: '2025-06-10', status: 'completed' },
            { id: 11, title: 'Migração de dados', description: 'Migrar dados para novo servidor', priority: 'medium', dueDate: '2025-06-12', status: 'completed' },
            { id: 12, title: 'Teste de performance', description: 'Testar performance do sistema', priority: 'medium', dueDate: '2025-06-14', status: 'completed' },
            { id: 13, title: 'Integração com API externa', description: 'Integrar sistema com API de terceiros', priority: 'high', dueDate: '2025-06-16', status: 'completed' },
            { id: 14, title: 'Otimização de banco de dados', description: 'Otimizar queries e índices', priority: 'medium', dueDate: '2025-06-11', status: 'completed' },
            { id: 15, title: 'Implementar notificações', description: 'Sistema de notificações por email', priority: 'low', dueDate: '2025-06-13', status: 'completed' }
        ];

        // Sample data for calendar events
        const calendarEvents = [
            { date: '2025-06-16', time: '09:00', title: 'Reunião com cliente', description: 'Apresentação de novos produtos', type: 'meeting' },
            { date: '2025-06-16', time: '14:30', title: 'Consulta médica', description: 'Dr. Silva - Cardiologia', type: 'consultation' },
            { date: '2025-06-16', time: '16:00', title: 'Revisar contratos', description: 'Análise de contratos vencidos', type: 'task' },
            { date: '2025-06-17', time: '10:00', title: 'Treinamento equipe', description: 'Capacitação sobre novos produtos', type: 'meeting' },
            { date: '2025-06-17', time: '15:00', title: 'Auditoria sistema', description: 'Verificação de segurança', type: 'task' },
            { date: '2025-06-18', time: '08:30', title: 'Consulta oftalmologia', description: 'Dr. Santos - Oftalmologia', type: 'consultation' },
            { date: '2025-06-18', time: '11:00', title: 'Reunião fornecedores', description: 'Negociação de contratos', type: 'meeting' },
            { date: '2025-06-19', time: '09:30', title: 'Análise financeira', description: 'Relatório mensal', type: 'task' },
            { date: '2025-06-19', time: '14:00', title: 'Consulta pediatria', description: 'Dra. Lima - Pediatria', type: 'consultation' },
            { date: '2025-06-20', time: '10:30', title: 'Apresentação resultados', description: 'Reunião diretoria', type: 'meeting' },
            { date: '2025-06-21', time: '13:00', title: 'Backup sistema', description: 'Backup completo dos dados', type: 'task' },
            { date: '2025-06-22', time: '16:30', title: 'Consulta dermatologia', description: 'Dr. Costa - Dermatologia', type: 'consultation' }
        ];

        // Current date and calendar state
        let currentDate = new Date();
        let currentView = 'month';
        let selectedDate = new Date();

        // DOM Elements
        const loginScreen = document.getElementById('loginScreen');
        const dashboard = document.getElementById('dashboard');
        const loginForm = document.getElementById('loginForm');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const cartaoBim = document.getElementById('cartaoBim');
        const ferramentasSubmenu = document.getElementById('ferramentasSubmenu');
        const cartaoSubmenu = document.getElementById('cartaoSubmenu');
        const menuItems = document.querySelectorAll('.menu-item[data-page]');
        const submenuItems = document.querySelectorAll('.submenu-item');
        const pageContents = document.querySelectorAll('.page-content');
        
        // Modal elements
        // const editClientModal = document.getElementById('editClientModal');
        // const closeEditClientModal = document.getElementById('closeEditClientModal');
        // const cancelEditClient = document.getElementById('cancelEditClient');
        const financeModal = document.getElementById('financeModal');
        const closeFinanceModal = document.getElementById('closeFinanceModal');
        const editProductModal = document.getElementById('editProductModal');
        const closeEditProductModal = document.getElementById('closeEditProductModal');
        const cancelEditProduct = document.getElementById('cancelEditProduct');
        const addTaskModal = document.getElementById('addTaskModal');
        const closeAddTaskModal = document.getElementById('closeAddTaskModal');
        const cancelAddTask = document.getElementById('cancelAddTask');
        const newClientModal = document.getElementById('newClientModal');
        const closeNewClientModal = document.getElementById('closeNewClientModal');
        const cancelNewClient = document.getElementById('cancelNewClient');
        const addDependenteBtn = document.getElementById('addDependenteBtn');
        const dependentesContainer = document.getElementById('dependentesContainer');
        const newClientForm = document.getElementById('newClientForm');
        
        // Table bodies
        const clientsTableBody = document.getElementById('clientsTableBody');
        const productsTableBody = document.getElementById('productsTableBody');
        const financeTableBody = document.getElementById('financeTableBody');
        
        // Kanban containers
        const todoTasks = document.getElementById('todoTasks');
        const inProgressTasks = document.getElementById('inProgressTasks');
        const completedTasks = document.getElementById('completedTasks');
        
        // Calendar elements
        const calendarGrid = document.getElementById('calendarGrid');
        const calendarMonthView = document.getElementById('calendarMonthView');
        const agendaDayView = document.getElementById('agendaDayView');
        const agendaEvents = document.getElementById('agendaEvents');
        const selectedDateElement = document.getElementById('selectedDate');
        const prevMonthBtn = document.getElementById('prevMonth');
        const nextMonthBtn = document.getElementById('nextMonth');
        const viewBtns = document.querySelectorAll('.view-btn');
        
        // Search inputs
        const clientSearch = document.getElementById('clientSearch');
        const productSearch = document.getElementById('productSearch');
        const financeSearch = document.getElementById('financeSearch');
        
        // Filter selects
        const clientFilter = document.getElementById('clientFilter');
       const productFilter = document.getElementById('productFilter');
        const categoryFilter = document.getElementById('categoryFilter');
        const financeFilter = document.getElementById('financeFilter');
        const statusFilter = document.getElementById('statusFilter');

        document.querySelector('#clientesPage .btn-outline').addEventListener('click', exportClientsToCSV);
        
        // Login functionality
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            console.log('Tentativa de login:', username, password); // Debug
            
            if (username == 'admin' && password === 'admin') {
                console.log('Login bem-sucedido!'); // Debug
                
                // Salva no LocalStorage que o usuário está logado
                localStorage.setItem('loggedIn', 'true');
                
                loginScreen.style.display = 'none';
                dashboard.style.display = 'flex';
                initializeDashboard();
            } else {
                alert('Credenciais inválidas! Use: admin / admin');
            }
        });

        
        // Initialize dashboard
        function initializeDashboard() {
            loadClientsData();  // clientes do Webhook
            startClientsPolling(); // Start polling for real-time updates
            loadProductsData(); 
            populateProductsTable();
            populateFinanceTable();
            populateKanbanBoard();
            generateCalendar();
            populateAgendaEvents();
        }

        
                // Dentro da função initializeDashboard ou similar:
        if (productSearch) productSearch.addEventListener('input', filterProducts);
        if (productFilter) productFilter.addEventListener('change', filterProducts);

        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
        
        // Cartão Bim toggle
        cartaoBim.addEventListener('click', function() {
            cartaoSubmenu.classList.toggle('active');
        });
        
        // Menu navigation
        menuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const targetPage = this.getAttribute('data-page');
                navigateToPage(targetPage);
                
                // Update active menu item
                document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // Close sidebar on mobile
                if (window.innerWidth <= 992) {
                    closeSidebar();
                }
            });
        });
        
        // Submenu navigation
        submenuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const targetPage = this.getAttribute('data-page');
                navigateToPage(targetPage);
                
                // Update active menu item
                document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
                cartaoBim.classList.add('active');
                
                // Update active submenu item
                submenuItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // Close sidebar on mobile
                if (window.innerWidth <= 992) {
                    closeSidebar();
                }
            });
        });
        
        // Navigate to page function
        function navigateToPage(pageName) {
            pageContents.forEach(page => {
                page.classList.remove('active');
                if (page.id === `${pageName}Page`) {
                    page.classList.add('active');
                }
            });
        }
        
        // Search and filter functionality
        if (clientSearch) clientSearch.addEventListener('input', filterClients);
        if (clientFilter) clientFilter.addEventListener('change', filterClients);
        if (productSearch) productSearch.addEventListener('input', filterProducts);
        if (productFilter) productFilter.addEventListener('change', filterClients);
        if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
        if (financeSearch) financeSearch.addEventListener('input', filterFinance);
        if (financeFilter) financeFilter.addEventListener('change', filterFinance);
        if (statusFilter) statusFilter.addEventListener('change', filterFinance);
        
        // Populate clients table
function populateClientsTable(data = clientsData) {
    if (!clientsTableBody) return;

    clientsTableBody.innerHTML = '';

    data.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.Carteirinha}</td>
            <td>${client.Nome}</td>
            <td>${client.CPF}</td>
            <td>${client.Telefone}</td>
            <td>${client.Plano ?? ''}</td>
            <td>
            <span class="status ${client.Status === 'ATIVO' ? 'status-active' : 'status-inactive'}">
                ${client.Status === 'ATIVO' ? 'Ativo' : 'Inativo'}
            </span>
            </td>

            <td class="actions">
                <button class="action-btn action-edit" data-id="${client.id_carteirinha}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn action-finance" data-id="${client.id_carteirinha}">
                    <i class="fas fa-dollar-sign"></i>
                </button>
                <button class="action-btn action-card" data-id="${client.id_carteirinha}">
                    <i class="fas fa-id-card"></i>
                </button>
            </td>
        `;
        clientsTableBody.appendChild(row);
    });
}

            
            // Add event listeners to action buttons
            document.querySelectorAll('.action-edit').forEach(btn => {
                btn.addEventListener('click', function() {
                    openEditClientModal(this.getAttribute('data-id'));
                });
            });
            
            document.querySelectorAll('.action-finance').forEach(btn => {
                btn.addEventListener('click', function() {
                    financeModal.style.display = 'flex';
                });
            });
            
            document.querySelectorAll('.action-card').forEach(btn => {
                btn.addEventListener('click', function() {
                    const clientId = this.getAttribute('data-id');
                    openCarteirinhaModal(this.getAttribute('data-id'));
                });
            });
        
        
        // Populate products table
        function populateProductsTable(data = productsData) {
            if (!productsTableBody) return;
            
            productsTableBody.innerHTML = '';
            
            data.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.id_produto}</td>
                    <td>${product.nome_produto}</td>
                    <td>
                        <span class="status ${product.status === 'ATIVO' ? 'status-active' : 'status-inactive'}">
                            ${product.status === 'ATIVO' ? 'Ativo' : 'Inativo'}
                        </span>
                    </td>
                    <td class="actions">
                        <button class="action-btn action-edit" data-id="${product.id_produto}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn action-delete" data-id="${product.id_produto}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                productsTableBody.appendChild(row);
            });
            
            // Add event listeners to edit buttons
            document.querySelectorAll('#productsTableBody .action-edit').forEach(btn => {
                btn.addEventListener('click', function() {
                    openEditProductModal(this.getAttribute('data-id'));
                });
            });

            
            // Add event listeners to delete buttons
            document.querySelectorAll('#productsTableBody .action-delete').forEach(btn => {
                btn.addEventListener('click', function() {
                    if (confirm('Tem certeza que deseja excluir este produto?')) {
                        const productId = this.getAttribute('data-id');
                        alert('Produto excluído com sucesso!');
                        const index = productsData.findIndex(p => p.code == productId);
                        if (index > -1) {
                            productsData.splice(index, 1);
                            populateProductsTable();
                        }
                    }
                });
            });
        }
        
        // Populate finance table
        function populateFinanceTable(data = financeData) {
            if (!financeTableBody) return;
            
            financeTableBody.innerHTML = '';
            data.forEach(finance => {
                const statusClass = finance.status === 'pago' ? 'status-active' : 
                                  finance.status === 'pendente' ? 'status-pending' : 'status-inactive';
                const statusText = finance.status === 'pago' ? 'Pago' : 
                                 finance.status === 'pendente' ? 'Pendente' : 'Atrasado';
                const typeText = finance.type === 'receita' ? 'Receita' : 'Despesa';
                const typeClass = finance.type === 'receita' ? 'text-success' : 'text-danger';
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${new Date(finance.date).toLocaleDateString('pt-BR')}</td>
                    <td>${finance.client}</td>
                    <td>${finance.description}</td>
                    <td><span class="${typeClass}">${typeText}</span></td>
                    <td>R$ ${finance.value.toFixed(2)}</td>
                    <td><span class="status ${statusClass}">${statusText}</span></td>
                    <td>${new Date(finance.dueDate).toLocaleDateString('pt-BR')}</td>
                    <td class="actions">
                        <button class="action-btn action-edit" data-date="${finance.date}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn action-finance" data-date="${finance.date}">
                            <i class="fas fa-receipt"></i>
                        </button>
                    </td>
                `;
                financeTableBody.appendChild(row);
            });
        }
        
        // Populate Kanban Board
        function populateKanbanBoard() {
            if (!todoTasks || !inProgressTasks || !completedTasks) return;
            
            // Clear existing tasks
            todoTasks.innerHTML = '';
            inProgressTasks.innerHTML = '';
            completedTasks.innerHTML = '';
            
            // Populate tasks by status
            tasksData.forEach(task => {
                const taskElement = createTaskElement(task);
                
                switch(task.status) {
                    case 'todo':
                        todoTasks.appendChild(taskElement);
                        break;
                    case 'inprogress':
                        inProgressTasks.appendChild(taskElement);
                        break;
                    case 'completed':
                        completedTasks.appendChild(taskElement);
                        break;
                }
            });
            
            // Update counters
            updateKanbanCounters();
        }
        
        // Create task element
        function createTaskElement(task) {
            const taskDiv = document.createElement('div');
            taskDiv.className = `kanban-task priority-${task.priority}`;
            taskDiv.innerHTML = `
                <div class="task-title">${task.title}</div>
                <div class="task-description">${task.description}</div>
                <div class="task-meta">
                    <div class="task-date">${new Date(task.dueDate).toLocaleDateString('pt-BR')}</div>
                    <div class="task-priority ${task.priority}">${task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}</div>
                </div>
            `;
            return taskDiv;
        }
        
        // Update Kanban counters
        function updateKanbanCounters() {
            const todoCount = tasksData.filter(task => task.status === 'todo').length;
            const inProgressCount = tasksData.filter(task => task.status === 'inprogress').length;
            const completedCount = tasksData.filter(task => task.status === 'completed').length;
            
            document.querySelector('#todoTasks').parentElement.querySelector('.kanban-count').textContent = todoCount;
            document.querySelector('#inProgressTasks').parentElement.querySelector('.kanban-count').textContent = inProgressCount;
            document.querySelector('#completedTasks').parentElement.querySelector('.kanban-count').textContent = completedCount;
        }
        
        // Generate Calendar
        function generateCalendar() {
            if (!calendarGrid) return;
            
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            // Clear calendar
            calendarGrid.innerHTML = '';
            
            // Add day headers
            const dayHeaders = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
            dayHeaders.forEach(day => {
                const dayHeader = document.createElement('div');
                dayHeader.className = 'calendar-day-header';
                dayHeader.textContent = day;
                calendarGrid.appendChild(dayHeader);
            });
            
            // Get first day of month and number of days
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const daysInPrevMonth = new Date(year, month, 0).getDate();
            
            // Add previous month's trailing days
            for (let i = firstDay - 1; i >= 0; i--) {
                const dayDiv = document.createElement('div');
                dayDiv.className = 'calendar-day other-month';
                dayDiv.innerHTML = `<div class="day-number">${daysInPrevMonth - i}</div>`;
                calendarGrid.appendChild(dayDiv);
            }
            
            // Add current month's days
            for (let day = 1; day <= daysInMonth; day++) {
                const dayDiv = document.createElement('div');
                const currentDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const isToday = currentDateStr === new Date().toISOString().split('T')[0];
                
                dayDiv.className = `calendar-day ${isToday ? 'today' : ''}`;
                dayDiv.innerHTML = `
                    <div class="day-number">${day}</div>
                    <div class="day-events">${getEventsForDate(currentDateStr)}</div>
                `;
                
                dayDiv.addEventListener('click', () => {
                    selectedDate = new Date(year, month, day);
                    switchToDayView();
                });
                
                calendarGrid.appendChild(dayDiv);
            }
            
            // Add next month's leading days
            const totalCells = calendarGrid.children.length - 7; // Subtract headers
            const remainingCells = 42 - totalCells; // 6 rows * 7 days
            for (let day = 1; day <= remainingCells; day++) {
                const dayDiv = document.createElement('div');
                dayDiv.className = 'calendar-day other-month';
                dayDiv.innerHTML = `<div class="day-number">${day}</div>`;
                calendarGrid.appendChild(dayDiv);
            }
        }
        
        // Get events for specific date
        function getEventsForDate(dateStr) {
            const events = calendarEvents.filter(event => event.date === dateStr);
            return events.map(event => 
                `<div class="day-event ${event.type}">${event.title}</div>`
            ).join('');
        }
        
        // Populate agenda events for selected date
        function populateAgendaEvents() {
            if (!agendaEvents || !selectedDateElement) return;
            
            const dateStr = selectedDate.toISOString().split('T')[0];
            const events = calendarEvents.filter(event => event.date === dateStr);
            
            selectedDateElement.textContent = selectedDate.toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            agendaEvents.innerHTML = '';
            
            if (events.length === 0) {
                agendaEvents.innerHTML = '<p style="text-align: center; color: var(--gray-medium); padding: 20px;">Nenhum evento agendado para este dia.</p>';
                return;
            }
            
            events.forEach(event => {
                const eventDiv = document.createElement('div');
                eventDiv.className = `agenda-event ${event.type}`;
                eventDiv.innerHTML = `
                    <div class="event-time">${event.time}</div>
                    <div class="event-title">${event.title}</div>
                    <div class="event-description">${event.description}</div>
                `;
                agendaEvents.appendChild(eventDiv);
            });
        }
        
        // Switch to day view
        function switchToDayView() {
            currentView = 'day';
            calendarMonthView.style.display = 'none';
            agendaDayView.classList.add('active');
            
            document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector('.view-btn[data-view="day"]').classList.add('active');
            
            populateAgendaEvents();
        }
        
        // Switch to month view
        function switchToMonthView() {
            currentView = 'month';
            calendarMonthView.style.display = 'block';
            agendaDayView.classList.remove('active');
            
            document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector('.view-btn[data-view="month"]').classList.add('active');
        }
        
        // Calendar navigation
        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                generateCalendar();
            });
        }
        
        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                generateCalendar();
            });
        }
        
        // View toggle buttons
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.getAttribute('data-view');
                if (view === 'month') {
                    switchToMonthView();
                } else {
                    switchToDayView();
                }
            });
        });
        
        // Filter functions
        function filterClients() {
            if (!clientSearch || !productFilter) return;
            
            const searchTerm = clientSearch.value.toLowerCase();
            const productFilterValue = productFilter.value;
            
            const filteredData = clientsData.filter(client => {
                // Busca por Nome ou CPF
                const matchesSearch = client.Nome.toLowerCase().includes(searchTerm) ||
                                    client.CPF.toLowerCase().includes(searchTerm);
                
                // Filtro por produto (Mult/Bim)
                const matchesProduct = productFilterValue === 'all' || 
                                    (client.Plano && client.Plano.includes(productFilterValue));
                
                return matchesSearch && matchesProduct;
            });
            
            populateClientsTable(filteredData);
        }
        
        function filterProducts() {
            if (!productSearch || !productFilter) return;
            
            const searchTerm = productSearch.value.toLowerCase();
            const statusFilterValue = productFilter.value;
            
            const filteredData = productsData.filter(product => {
                const matchesSearch = product.nome.toLowerCase().includes(searchTerm) || 
                                    product.codigo.toLowerCase().includes(searchTerm);
                
                const matchesStatus = statusFilterValue === 'all' || 
                                    (statusFilterValue === 'active' && product.status === 'ativo') ||
                                    (statusFilterValue === 'inactive' && product.status === 'inativo');
                
                return matchesSearch && matchesStatus;
            });
            
            populateProductsTable(filteredData);
        }
        
        function filterFinance() {
            if (!financeSearch || !financeFilter) return;
            
            const searchTerm = financeSearch.value.toLowerCase();
            const typeFilter = financeFilter.value;
            const statusFilterValue = statusFilter ? statusFilter.value : 'all';
            
            const filteredData = financeData.filter(finance => {
                const matchesSearch = finance.client.toLowerCase().includes(searchTerm) ||
                                    finance.description.toLowerCase().includes(searchTerm);
                
                const matchesType = typeFilter === 'all' || finance.type === typeFilter;
                const matchesStatus = statusFilterValue === 'all' || finance.status === statusFilterValue;
                
                return matchesSearch && matchesType && matchesStatus;
            });
            
            populateFinanceTable(filteredData);
        }

        function exportClientsToCSV() {
            const headers = ["Carteirinha", "Nome", "CPF", "Telefone", "Plano", "Status"];
            const csvContent = [
                headers.join(","), // Cabeçalho
                ...clientsData.map(client => 
                    `"${client.Carteirinha}","${client.Nome}","${client.CPF}","${client.Telefone}","${client.Plano || ''}","${client.Status}"`
                )
            ].join("\n");

            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            
            link.setAttribute("href", url);
            link.setAttribute("download", "clientes.csv");
            link.style.visibility = "hidden";
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        
        // Open edit client modal
        function openEditClientModal(clientId) {
            const client = clientsData.find(c => c.id == clientId);
            if (client) {
                document.getElementById('clientCode').value = client.id;
                document.getElementById('clientId').value = client.originId;
                document.getElementById('socialName').value = client.socialName;
                document.getElementById('fantasyName').value = client.fantasyName;
                document.getElementById('cpfCnpj').value = client.cpf;
                document.getElementById('city').value = client.city;
                document.getElementById('state').value = client.state;
                document.getElementById('phone').value = client.phone;
                document.getElementById('email').value = client.email;
                document.getElementById('status').value = client.status;
                editClientModal.style.display = 'flex';
            }
        }
        
        // Open edit product modal
        function openEditProductModal(productCode) {
            const product = productsData.find(p => p.code == productCode);
            if (product) {
                document.getElementById('productCode').value = product.code;
                document.getElementById('productName').value = product.name;
                document.getElementById('unit').value = product.unit;
                document.getElementById('grupo').value = product.grupo;
                document.getElementById('table').value = product.table;
                document.getElementById('price').value = product.price;
                document.getElementById('cost').value = product.cost;
                document.getElementById('productStatus').value = product.status;
                document.getElementById('description').value = product.description || '';
                editProductModal.style.display = 'flex';
            }
        }
        
        // Open card modal
        function openCarteirinhaModal(clientId) {
            const client = clientsData.find(c => c.id == clientId);
            if (client) {
                document.getElementById('carteirinhaTitularNome').textContent = 'Titular: ' + client.Nome;
                document.getElementById('carteirinhaTitularCpf').textContent = 'CPF: ' + client.CPF;
                document.getElementById('carteirinhaModal').style.display = 'flex';
            }
        }
        
        // Close modals
        closeEditClientModal.addEventListener('click', () => editClientModal.style.display = 'none');
        cancelEditClient.addEventListener('click', () => editClientModal.style.display = 'none');
        closeFinanceModal.addEventListener('click', () => financeModal.style.display = 'none');
        closeEditProductModal.addEventListener('click', () => editProductModal.style.display = 'none');
        cancelEditProduct.addEventListener('click', () => editProductModal.style.display = 'none');
        closeAddTaskModal.addEventListener('click', () => addTaskModal.style.display = 'none');
        cancelAddTask.addEventListener('click', () => addTaskModal.style.display = 'none');
        closeNewClientModal.addEventListener('click', () => newClientModal.style.display = 'none');
        cancelNewClient.addEventListener('click', () => newClientModal.style.display = 'none');
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === editClientModal) editClientModal.style.display = 'none';
            if (e.target === financeModal) financeModal.style.display = 'none';
            if (e.target === editProductModal) editProductModal.style.display = 'none';
            if (e.target === addTaskModal) addTaskModal.style.display = 'none';
            if (e.target === newClientModal) newClientModal.style.display = 'none';
        });
        
        // Save client
        document.getElementById('saveClient').addEventListener('click', () => {
            const clientId = document.getElementById('clientCode').value;
            const client = clientsData.find(c => c.id == clientId);
            
            if (client) {
                // Update existing client
                client.originId = document.getElementById('clientId').value;
                client.socialName = document.getElementById('socialName').value;
                client.fantasyName = document.getElementById('fantasyName').value;
                client.cpf = document.getElementById('cpfCnpj').value;
                client.city = document.getElementById('city').value;
                client.state = document.getElementById('state').value;
                client.phone = document.getElementById('phone').value;
                client.email = document.getElementById('email').value;
                client.status = document.getElementById('status').value;
            } else {
                // Add new client
                const newClient = {
                    id: Math.max(...clientsData.map(c => c.id)) + 1,
                    originId: document.getElementById('clientId').value,
                    socialName: document.getElementById('socialName').value,
                    fantasyName: document.getElementById('fantasyName').value,
                    cpf: document.getElementById('cpfCnpj').value,
                    city: document.getElementById('city').value,
                    state: document.getElementById('state').value,
                    phone: document.getElementById('phone').value,
                    email: document.getElementById('email').value,
                    status: document.getElementById('status').value
                };
                clientsData.push(newClient);
            }
            
            populateClientsTable();
            editClientModal.style.display = 'none';
            alert('Cliente salvo com sucesso!');
        });
        
        // Save product
        document.getElementById('saveProduct').addEventListener('click', () => {
            const productCode = document.getElementById('productCode').value;
            const product = productsData.find(p => p.code == productCode);
            
            if (product) {
                // Update existing product
                product.name = document.getElementById('productName').value;
                product.unit = document.getElementById('unit').value;
                product.grupo = document.getElementById('grupo').value;
                product.table = document.getElementById('table').value;
                product.price = parseFloat(document.getElementById('price').value);
                product.cost = parseFloat(document.getElementById('cost').value);
                product.status = document.getElementById('productStatus').value;
                product.description = document.getElementById('description').value;
            } else {
                // Add new product
                const newProduct = {
                    code: Math.max(...productsData.map(p => p.code)) + 1,
                    name: document.getElementById('productName').value,
                    unit: document.getElementById('unit').value,
                    grupo: document.getElementById('grupo').value,
                    table: document.getElementById('table').value,
                    price: parseFloat(document.getElementById('price').value),
                    cost: parseFloat(document.getElementById('cost').value),
                    status: document.getElementById('productStatus').value,
                    category: 'plano',
                    description: document.getElementById('description').value
                };
                productsData.push(newProduct);
            }
            
            populateProductsTable();
            editProductModal.style.display = 'none';
            alert('Produto salvo com sucesso!');
        });
        
        // Save task
        document.getElementById('saveTask').addEventListener('click', () => {
            const title = document.getElementById('taskTitle').value;
            const description = document.getElementById('taskDescription').value;
            const priority = document.getElementById('taskPriority').value;
            const dueDate = document.getElementById('taskDueDate').value;
            const status = document.getElementById('taskStatus').value;
            
            if (title && description && dueDate) {
                const newTask = {
                    id: Math.max(...tasksData.map(t => t.id)) + 1,
                    title: title,
                    description: description,
                    priority: priority,
                    dueDate: dueDate,
                    status: status
                };
                
                tasksData.push(newTask);
                populateKanbanBoard();
                addTaskModal.style.display = 'none';
                
                // Reset form
                document.getElementById('taskTitle').value = '';
                document.getElementById('taskDescription').value = '';
                document.getElementById('taskPriority').value = 'low';
                document.getElementById('taskDueDate').value = '';
                document.getElementById('taskStatus').value = 'todo';
                
                alert('Tarefa criada com sucesso!');
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
        
        // Add new client
        document.getElementById('addClientBtn').addEventListener('click', function() {
            // Reset form
            document.getElementById('clientCode').value = '';
            document.getElementById('clientId').value = '';
            document.getElementById('socialName').value = '';
            document.getElementById('fantasyName').value = '';
            document.getElementById('cpfCnpj').value = '';
            document.getElementById('city').value = '';
            document.getElementById('state').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('email').value = '';
            document.getElementById('status').value = 'active';
            
            // Change modal title
            // document.querySelector('#editClientModal .modal-title').textContent = 'Adicionar Novo Cliente';
            
            // Show modal
            // editClientModal.style.display = 'flex';
        });
        
        // Add new product
        document.getElementById('addProductBtn').addEventListener('click', function() {
            // Reset form
            document.getElementById('productCode').value = '';
            document.getElementById('productName').value = '';
            document.getElementById('unit').value = 'UN';
            document.getElementById('grupo').value = '11 - PLANO';
            document.getElementById('table').value = '100';
            document.getElementById('price').value = '';
            document.getElementById('cost').value = '';
            document.getElementById('productStatus').value = 'active';
            document.getElementById('description').value = '';
            
            // Change modal title
            document.querySelector('#editProductModal .modal-title').textContent = 'Adicionar Novo Produto';
            
            // Show modal
            editProductModal.style.display = 'flex';
        });
        
        // Add new task
        document.getElementById('addTaskBtn').addEventListener('click', function() {
            // Reset form
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDescription').value = '';
            document.getElementById('taskPriority').value = 'low';
            document.getElementById('taskDueDate').value = '';
            document.getElementById('taskStatus').value = 'todo';
            
            // Show modal
            addTaskModal.style.display = 'flex';
        });
        
        // Sidebar functions
        function toggleSidebar() {
            sidebar.classList.toggle('sidebar-active');
            sidebarOverlay.style.display = sidebar.classList.contains('sidebar-active') ? 'block' : 'none';
        }
        
        function closeSidebar() {
            sidebar.classList.remove('sidebar-active');
            sidebarOverlay.style.display = 'none';
        }
        
        // ================ [NEW CLIENT MODAL FUNCTIONALITY] ================ //
        // Função para aplicar máscaras
        function applyMasks() {
            // Máscara para telefone (##) #####-####
            const phoneInput = document.getElementById('telefone');
            if (phoneInput) {
                phoneInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 2) {
                        value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7, 11);
                    } else if (value.length > 0) {
                        value = '(' + value;
                    }
                    e.target.value = value.substring(0, 15);
                });
            }

            // Máscara para CPF: ###.###.###-##
            const cpfInput = document.getElementById('cpf');
            if (cpfInput) {
                cpfInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 9) {
                        value = value.substring(0, 3) + '.' + value.substring(3, 6) + '.' + value.substring(6, 9) + '-' + value.substring(9, 11);
                    } else if (value.length > 6) {
                        value = value.substring(0, 3) + '.' + value.substring(3, 6) + '.' + value.substring(6);
                    } else if (value.length > 3) {
                        value = value.substring(0, 3) + '.' + value.substring(3);
                    }
                    e.target.value = value.substring(0, 14);
                });
            }

            // Máscara para data de nascimento: DD/MM/AAAA
            const birthInput = document.getElementById('data_nascimento');
            if (birthInput) {
                birthInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 4) {
                        value = value.substring(0, 2) + '/' + value.substring(2, 4) + '/' + value.substring(4, 8);
                    } else if (value.length > 2) {
                        value = value.substring(0, 2) + '/' + value.substring(2);
                    }
                    e.target.value = value.substring(0, 10);
                });
            }

            // Máscara para CEP: #####-###
            const cepInput = document.getElementById('cep');
            if (cepInput) {
                cepInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 5) {
                        value = value.substring(0, 5) + '-' + value.substring(5, 8);
                    }
                    e.target.value = value.substring(0, 9);
                });
            }
        }

        // Aplicar máscaras quando a modal for aberta
        document.getElementById('addClientBtn').addEventListener('click', function() {
            newClientModal.style.display = 'flex';
            // Resetar o formulário
            newClientForm.reset();
            // Aplicar máscaras após os campos serem renderizados
            setTimeout(applyMasks, 0);
        });

        // Busca CEP
        const cepInput = document.getElementById('cep');
        if (cepInput) {
            cepInput.addEventListener('blur', async function() {
                const cep = this.value.replace(/\D/g, '');
                if (cep.length === 8) {
                    try {
                        const response = await fetch('https://viacep.com.br/ws/' + cep + '/json/');
                        const data = await response.json();
                        if (!data.erro) {
                            const enderecoInput = document.getElementById('endereco');
                            if (enderecoInput) {
                                enderecoInput.value = data.logradouro;
                            }
                            const municipioInput = document.getElementById('municipio');
                            if (municipioInput) {
                                municipioInput.value = data.localidade;
                    }
                        }
                    } catch (error) {
                        console.error('Erro ao buscar CEP:', error);
                    }
                }
            });
        }

        // Adicionar dependente
        let dependenteCount = 0;
        const maxDependentes = 6;

        if (addDependenteBtn && dependentesContainer) {
            addDependenteBtn.addEventListener('click', () => {
                if (dependenteCount >= maxDependentes) {
                    alert('Máximo de 6 dependentes atingido.');
                    return;
                }
                dependenteCount++;
                const div = document.createElement('div');
                div.classList.add('card');
                div.innerHTML = `
                    <h4>Dependente ${dependenteCount} <button type="button" class="remove-dep-btn">Remover</button></h4>
                    <div class="form-row">
                        <div class="form-group"><label>Nome</label><input type="text" name="dep_nome_${dependenteCount}" required></div>
                        <div class="form-group"><label>Sobrenome</label><input type="text" name="dep_sobrenome_${dependenteCount}" required></div>
                        <div class="form-group"><label>Telefone</label><input type="text" name="dep_telefone_${dependenteCount}" placeholder="(00) 00000-0000"></div>
                        <div class="form-group"><label>CPF</label><input type="text" name="dep_cpf_${dependenteCount}" placeholder="000.000.000-00"></div>
                        <div class="form-group"><label>Data Nasc.</label><input type="text" name="dep_data_nascimento_${dependenteCount}" placeholder="DD/MM/AAAA"></div>
                        <div class="form-group">
                            <label>Sexo</label>
                            <select name="dep_sexo_${dependenteCount}">
                                <option value="">Selecione</option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                            </select>
                        </div>
                        <div class="form-group"><label>Email</label><input type="email" name="dep_email_${dependenteCount}"></div>
                    </div>
                `;
                dependentesContainer.appendChild(div);

                // Aplicar máscaras aos novos campos do dependente
                applyMasksToDependente(div);

                // Adiciona listener para o botão remover dependente
                const removeBtn = div.querySelector('.remove-dep-btn');
                removeBtn.addEventListener('click', () => {
                    dependentesContainer.removeChild(div);
                    dependenteCount--;
                    renumerarDependentes();
                });
            });
        }

        function renumerarDependentes() {
            const dependentes = dependentesContainer.querySelectorAll('.card');
            dependentes.forEach((dep, index) => {
                const num = index + 1;
                // Atualiza o título com número correto e botão remover
                dep.querySelector('h4').innerHTML = `Dependente ${num} <button type="button" class="remove-dep-btn">Remover</button>`;

                // Atualiza os nomes dos inputs e selects para refletir o novo índice
                dep.querySelectorAll('input, select').forEach(input => {
                    const name = input.name;
                    input.name = name.replace(/\d+$/, num);
                });

                // Atualiza o listener do botão remover para cada dependente renumerado
                const btn = dep.querySelector('.remove-dep-btn');
                btn.onclick = () => {
                    dependentesContainer.removeChild(dep);
                    dependenteCount--;
                    renumerarDependentes();
                };
            });
            dependenteCount = dependentes.length;
        }

        function applyMasksToDependente(container) {
            const phoneInput = container.querySelector('input[placeholder="(00) 00000-0000"]');
            if (phoneInput) {
                phoneInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 2) {
                        value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7, 11);
                    } else if (value.length > 0) {
                        value = '(' + value;
                    }
                    e.target.value = value.substring(0, 15);
                });
            }

            const cpfInput = container.querySelector('input[placeholder="000.000.000-00"]');
            if (cpfInput) {
                cpfInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 9) {
                        value = value.substring(0, 3) + '.' + value.substring(3, 6) + '.' + value.substring(6, 9) + '-' + value.substring(9, 11);
                    } else if (value.length > 6) {
                        value = value.substring(0, 3) + '.' + value.substring(3, 6) + '.' + value.substring(6);
                    } else if (value.length > 3) {
                        value = value.substring(0, 3) + '.' + value.substring(3);
                    }
                    e.target.value = value.substring(0, 14);
                });
            }

            const birthInput = container.querySelector('input[placeholder="DD/MM/AAAA"]');
            if (birthInput) {
                birthInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 4) {
                        value = value.substring(0, 2) + '/' + value.substring(2, 4) + '/' + value.substring(4, 8);
                    } else if (value.length > 2) {
                        value = value.substring(0, 2) + '/' + value.substring(2);
                    }
                    e.target.value = value.substring(0, 10);
                });
            }
        }

        // CPF validation function
        function validateCPF(cpf) {
            cpf = cpf.replace(/[^\d]+/g, '');
            if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
                return false;
            }
            let sum = 0;
            let remainder;

            for (let i = 1; i <= 9; i++) {
                sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
            }
            remainder = (sum * 10) % 11;
            if (remainder === 10 || remainder === 11) remainder = 0;
            if (remainder !== parseInt(cpf.substring(9, 10))) return false;

            sum = 0;
            for (let i = 1; i <= 10; i++) {
                sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
            }
            remainder = (sum * 10) % 11;
            if (remainder === 10 || remainder === 11) remainder = 0;
            if (remainder !== parseInt(cpf.substring(10, 11))) return false;

            return true;
        }

        // Envio do formulário de novo cliente
        if (newClientForm) {
            newClientForm.addEventListener('submit', async function(e) {
                e.preventDefault();

                const cpfInput = document.getElementById('cpf');
                const cpfValue = cpfInput ? cpfInput.value : '';

                if (!validateCPF(cpfValue)) {
                    alert('CPF inválido. Por favor, insira um CPF válido.');
                    cpfInput.focus();
                    return;
                }

                const titular = {};              // Aqui ficam os dados do cliente principal
                const dependentes = [];          // Aqui vai o array de dependentes

                const formData = new FormData(this);

                // Coletar campos do titular (tudo que NÃO começa com 'dep_')
                formData.forEach((value, key) => {
                    if (!key.startsWith('dep_')) {
                        titular[key] = value;
                    }
                });

                // Coletar os dependentes direto do DOM
                const dependentesDivs = dependentesContainer.querySelectorAll('.card');
                dependentesDivs.forEach((depDiv, idx) => {
                    const index = idx + 1;
                    const dependente = {
                        nome: depDiv.querySelector(`input[name="dep_nome_${index}"]`)?.value || '',
                        sobrenome: depDiv.querySelector(`input[name="dep_sobrenome_${index}"]`)?.value || '',
                        telefone: depDiv.querySelector(`input[name="dep_telefone_${index}"]`)?.value || '',
                        cpf: depDiv.querySelector(`input[name="dep_cpf_${index}"]`)?.value || '',
                        data_nascimento: depDiv.querySelector(`input[name="dep_data_nascimento_${index}"]`)?.value || '',
                        sexo: depDiv.querySelector(`select[name="dep_sexo_${index}"]`)?.value || '',
                        email: depDiv.querySelector(`input[name="dep_email_${index}"]`)?.value || ''
                    };
                    dependentes.push(dependente);
                });

                const payload = {
                    titular: titular,
                    dependentes: dependentes
                };

                console.log('Enviando para o webhook:', payload);  // Debug

                try {
                    const response = await fetch('https://auto.ia-tess.com.br/webhook/cc8f95e6-902f-469c-bd50-77826fa1dde7', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                if (response.ok) {
                    alert('Novo cliente salvo com sucesso!');
                    // Add the new client to clientsData to update the table
                    const newClientId = clientsData.length > 0 ? Math.max(...clientsData.map(c => c.id)) + 1 : 1;
                    const newClient = {
                        id: newClientId,
                        originId: titular.originId || '',
                        socialName: titular.socialName || '',
                        fantasyName: titular.fantasyName || '',
                        cpf: titular.cpf || '',
                        city: titular.city || '',
                        state: titular.state || '',
                        phone: titular.phone || '',
                        email: titular.email || '',
                        status: titular.status || 'active'
                    };
                    clientsData.push(newClient);
                    populateClientsTable();

                    newClientModal.style.display = 'none';
                    newClientForm.reset();
                    dependentesContainer.innerHTML = '';
                    dependenteCount = 0;
                } else {
                    alert('Erro ao salvar cliente.');
                }
                } catch (error) {
                    console.error('Erro ao salvar:', error);
                    alert('Erro na comunicação com o servidor.');
                }
            });
        }

                // Disparos functionality
        const disparosForm = document.getElementById('disparosForm');
        const disparoResult = document.getElementById('disparoResult');
        const disparoStatus = document.getElementById('disparoStatus');

        if (disparosForm) {
            disparosForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const plano = document.getElementById('planoDisparo').value;
                const sexo = document.getElementById('sexoDisparo').value;
                const cidade = document.getElementById('cidadeDisparo').value;
                const mensagem = document.getElementById('mensagemDisparo').value;
                
                // Mostrar loading
                disparoResult.style.display = 'block';
                disparoStatus.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Enviando disparo...</p>';
                
                try {
                    // Dados para enviar
                    const payload = {
                        plano,
                        sexo,
                        cidade,
                        mensagem
                    };
                    
                    
                    const webhookUrl = 'https://webhook.ia-tess.com.br/webhook/disparos';
                    
                    const response = await fetch(webhookUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });
                    
                    if (response.ok) {
                        disparoStatus.innerHTML = `
                            <div style="background: var(--green-light); padding: 15px; border-radius: 8px;">
                                <p style="color: var(--confirmed-color);">
                                    <i class="fas fa-check-circle"></i> Disparo realizado com sucesso!
                                </p>
                                <p><strong>Detalhes:</strong></p>
                                <ul>
                                    <li><strong>Plano:</strong> ${plano}</li>
                                    <li><strong>Sexo:</strong> ${sexo}</li>
                                    <li><strong>Cidade:</strong> ${cidade}</li>
                                    <li><strong>Mensagem:</strong> ${mensagem}</li>
                                </ul>
                            </div>
                        `;
                    } else {
                        throw new Error('Erro na resposta do servidor');
                    }
                } catch (error) {
                    disparoStatus.innerHTML = `
                        <div style="background: var(--red-light); padding: 15px; border-radius: 8px;">
                            <p style="color: var(--cancelled-color);">
                                <i class="fas fa-exclamation-circle"></i> Erro ao enviar disparo: ${error.message}
                            </p>
                            <p>Por favor, tente novamente mais tarde.</p>
                        </div>
                    `;
                }
            });
        }



        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM carregado'); // Debug
            
            // Show the cartão bim submenu by default
            if (cartaoSubmenu) {
                cartaoSubmenu.classList.add('active');
            }

             if (clinicaSubmenu) {
                clinicaSubmenu.classList.add('active');
            }

             if (ferramentasSubmenu) {
                ferramentasSubmenu.classList.add('active');
            }
            
            // Set today's date for agenda
            selectedDate = new Date();
        })

        function logout() {
            localStorage.removeItem('loggedIn');
            loginScreen.style.display = 'flex';
            dashboard.style.display = 'none';
        }

// Função unificada para abrir o modal de carteirinha
function openCarteirinhaModal(nome, cpf) {
    const modal = document.getElementById('carteirinhaModal');
    const nomeEl = document.getElementById('carteirinhaTitularNome');
    const cpfEl = document.getElementById('carteirinhaTitularCpf');
    const spinner = document.getElementById('carteirinhaSpinner');
    const img = modal.querySelector('.carteirinha-img');
    
    if (!modal || !nomeEl || !cpfEl || !spinner || !img) {
        console.error('Elementos do modal não encontrados');
        return;
    }
    
    // Atualiza os dados do titular
    nomeEl.textContent = nome || 'Nome não disponível';
    cpfEl.textContent = cpf ? `CPF: ${cpf}` : 'CPF não disponível';
    
    // Prepara a imagem para carregamento
    spinner.style.display = 'flex';
    img.style.display = 'none';
    modal.style.display = 'flex';
    
    // Configura os callbacks de carregamento e erro
    img.onload = function() {
        spinner.style.display = 'none';
        img.style.display = 'block';
        console.log('Imagem da carteirinha carregada com sucesso');
    };
    
    img.onerror = function() {
        spinner.style.display = 'none';
        console.error('Falha ao carregar a imagem da carteirinha');
        // Pode adicionar uma imagem de fallback ou mensagem aqui
    };
    
    // Força o recarregamento da imagem com um parâmetro único para evitar cache
    const timestamp = new Date().getTime();
    img.src = img.src.split('?')[0] + '?t=' + timestamp;
}

// Configuração do botão de impressão
const printCarteirinhaBtn = document.getElementById('printCarteirinhaBtn');
if (printCarteirinhaBtn) {
    printCarteirinhaBtn.addEventListener('click', function() {
        // Verifica se a imagem está visível antes de imprimir
        const img = document.querySelector('#carteirinhaModal .carteirinha-img');
        if (img && img.style.display !== 'none') {
            window.print();
        } else {
            alert('Aguarde a carteirinha carregar completamente antes de imprimir.');
        }
    });
}

// Event delegation para os botões de ação na tabela de clientes
if (clientsTableBody) {
    clientsTableBody.addEventListener('click', function(e) {
        const cardBtn = e.target.closest('.action-card');
        if (cardBtn) {
            const row = cardBtn.closest('tr');
            const nome = row.cells[1].textContent;
            const cpf = row.cells[2].textContent;
            openCarteirinhaModal(nome, cpf);
        }
    });
}

// Fechar modal
const closeCarteirinhaModal = document.getElementById('closeCarteirinhaModal');
if (closeCarteirinhaModal) {
    closeCarteirinhaModal.addEventListener('click', function() {
        const modal = document.getElementById('carteirinhaModal');
        if (modal) modal.style.display = 'none';
    });
}
