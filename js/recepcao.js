// =================================================================
// FUNÇÕES DE RECEPÇÃO
// =================================================================

async function loadReceptionQueue() {
    console.log('🏥 [RECEPTION] Iniciando carregamento da fila de recepção...');
    
    const queueContainer = document.getElementById('receptionQueue');
    if (!queueContainer) {
        console.error('❌ [RECEPTION] Container da fila não encontrado');
        return;
    }
    
    console.log('📋 [RECEPTION] Container encontrado, limpando dados anteriores...');
    queueContainer.innerHTML = '';

    // Futuramente, substituir por chamada API: GET /reception/queue
    const queue = [
        { id: 123, patientName: 'José da Silva', time: '09:00', professionalName: 'Dr. João', status: 'chegou' },
        { id: 124, patientName: 'Ana Souza', time: '09:30', professionalName: 'Dra. Maria', status: 'agendado' },
        { id: 125, patientName: 'Carlos Oliveira', time: '10:00', professionalName: 'Dr. João', status: 'agendado' },
        { id: 126, patientName: 'Mariana Costa', time: '10:30', professionalName: 'Dra. Maria', status: 'chegou' }
    ];
    
    console.log('📊 [RECEPTION] Dados da fila carregados:', queue.length, 'pacientes');
    
    queue.forEach((p, index) => {
        console.log(`👤 [RECEPTION] Processando paciente ${index + 1}:`, p.patientName);
        
        const card = document.createElement('div');
        card.className = 'patient-card';
        card.innerHTML = `
            <div class="patient-card-header">
                <h4>${p.patientName}</h4>
                <span>Agendado para: ${p.time}</span>
            </div>
            <div class="patient-card-body">
                <p><strong>Profissional:</strong> ${p.professionalName}</p>
                <p><strong>Status:</strong> <span class="status status-${p.status === 'chegou' ? 'active' : 'pending'}">${p.status}</span></p>
            </div>
            <div class="patient-card-actions">
                <button class="btn btn-secondary" onclick="markArrival(${p.id})">Marcar Chegada</button>
                <button class="btn btn-success" onclick="openPaymentModal(${p.id}, '${p.patientName}')">Registrar Pagamento</button>
            </div>
        `;
        queueContainer.appendChild(card);
        console.log(`✅ [RECEPTION] Paciente ${p.patientName} adicionado à fila`);
    });
    
    console.log('✅ [RECEPTION] Carregamento da fila concluído com sucesso!');
}

async function markArrival(appointmentId) {
    console.log('✅ [RECEPTION] Marcando chegada para agendamento ID:', appointmentId);
    // Implementar chamada API para marcar chegada
    console.log('🔧 [RECEPTION] Função de marcar chegada ainda não implementada');
    alert('Função "Marcar Chegada" chamada! (ver console)');
}

function openPaymentModal(appointmentId, patientName) {
    console.log('💰 [RECEPTION] Abrindo modal de pagamento para:', patientName, 'ID:', appointmentId);
    
    const patientNameElement = document.getElementById('paymentPatientName');
    const modal = document.getElementById('paymentModal');
    
    if (!patientNameElement || !modal) {
        console.error('❌ [RECEPTION] Elementos do modal de pagamento não encontrados');
        return;
    }
    
    patientNameElement.textContent = patientName;
    modal.style.display = 'flex';
    console.log('✅ [RECEPTION] Modal de pagamento aberto com sucesso');
}

function closePaymentModal() {
    console.log('❌ [RECEPTION] Fechando modal de pagamento...');
    
    const modal = document.getElementById('paymentModal');
    const form = document.getElementById('paymentForm');
    
    if (!modal || !form) {
        console.error('❌ [RECEPTION] Elementos do modal não encontrados');
        return;
    }
    
    modal.style.display = 'none';
    form.reset();
    console.log('✅ [RECEPTION] Modal de pagamento fechado e formulário resetado');
} 