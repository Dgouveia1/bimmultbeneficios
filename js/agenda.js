// =================================================================
// FUNÇÕES DE AGENDA
// =================================================================

async function loadScheduleView() {
    console.log('📅 [AGENDA] Iniciando carregamento da agenda...');
    
    const container = document.getElementById('scheduleContainer');
    if (!container) {
        console.error('❌ [AGENDA] Container da agenda não encontrado');
        return;
    }
    
    console.log('📋 [AGENDA] Container encontrado, limpando dados anteriores...');
    container.innerHTML = '';
    
    // Dados fake de profissionais
    const professionals = [
        { id: 1, name: 'Dr. João' },
        { id: 2, name: 'Dra. Maria' },
    ];

    console.log('👨‍⚕️ [AGENDA] Profissionais carregados:', professionals.length);

    let html = '<div class="time-column">';
    html += '<div class="schedule-header">Hora</div>';
    
    console.log('⏰ [AGENDA] Gerando coluna de horários...');
    for(let h = 7; h < 19; h++) {
        html += `<div class="time-slot">${String(h).padStart(2, '0')}:00</div>`;
        html += `<div class="time-slot">${String(h).padStart(2, '0')}:30</div>`;
    }
    html += '</div>';

    console.log('👥 [AGENDA] Gerando colunas dos profissionais...');
    html += '<div class="professionals-grid">';
    professionals.forEach(prof => {
        console.log(`👨‍⚕️ [AGENDA] Adicionando profissional: ${prof.name}`);
        html += `<div class="professional-column" data-prof-id="${prof.id}">`;
        html += `<div class="schedule-header">${prof.name}</div>`;
        for(let h = 7; h < 19; h++) {
            html += `<div class="time-slot"></div>`;
            html += `<div class="time-slot"></div>`;
        }
        html += '</div>';
    });
    html += '</div>';

    console.log('📝 [AGENDA] Inserindo HTML na agenda...');
    container.innerHTML = html;
    
    console.log('✅ [AGENDA] Estrutura da agenda criada, carregando agendamentos...');
    loadAppointments();
}

async function loadAppointments() {
    console.log('📋 [AGENDA] Carregando agendamentos...');
    
    // Dados fake de agendamentos
    const appointments = [
        { id: 123, patient: 'José da Silva', procedure: 'Consulta de rotina', startTime: '09:00', endTime: '10:00', professionalId: 1 },
        { id: 124, patient: 'Ana Souza', procedure: 'Exame de sangue', startTime: '10:00', endTime: '10:30', professionalId: 1 },
        { id: 125, patient: 'Carlos Oliveira', procedure: 'Retorno', startTime: '11:00', endTime: '11:30', professionalId: 2 },
        { id: 126, patient: 'Mariana Costa', procedure: 'Acompanhamento', startTime: '14:00', endTime: '14:45', professionalId: 2 }
    ];

    console.log('📊 [AGENDA] Agendamentos carregados:', appointments.length, 'consultas');

    appointments.forEach((appointment, index) => {
        console.log(`📅 [AGENDA] Processando agendamento ${index + 1}:`, appointment.patient);
        
        const profColumn = document.querySelector(`.professional-column[data-prof-id="${appointment.professionalId}"]`);
        if(profColumn) {
            console.log(`✅ [AGENDA] Coluna do profissional encontrada para: ${appointment.patient}`);
            
            const startHour = parseInt(appointment.startTime.split(':')[0]);
            const startMinute = parseInt(appointment.startTime.split(':')[1]);
            const endHour = parseInt(appointment.endTime.split(':')[0]);
            const endMinute = parseInt(appointment.endTime.split(':')[1]);

            const top = ((startHour - 7) * 120) + (startMinute / 30 * 60);
            const duration = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute));
            const height = duration / 30 * 60;

            console.log(`📐 [AGENDA] Calculando posição para ${appointment.patient}:`, {
                startTime: appointment.startTime,
                endTime: appointment.endTime,
                top: top,
                height: height
            });

            const card = document.createElement('div');
            card.className = 'appointment-card';
            card.style.top = `${top}px`;
            card.style.height = `${height}px`;
            card.innerHTML = `<strong>${appointment.patient}</strong>${appointment.procedure}`;
            profColumn.appendChild(card);
            
            console.log(`✅ [AGENDA] Agendamento ${appointment.patient} adicionado à agenda`);
        } else {
            console.error(`❌ [AGENDA] Coluna do profissional não encontrada para ID: ${appointment.professionalId}`);
        }
    });
    
    console.log('✅ [AGENDA] Carregamento de agendamentos concluído!');
}

function openNewAppointmentModal() {
    console.log('➕ [AGENDA] Abrindo modal de novo agendamento...');
    
    const modal = document.getElementById('appointmentModal');
    if (!modal) {
        console.error('❌ [AGENDA] Modal de agendamento não encontrado');
        return;
    }
    
    modal.style.display = 'flex';
    console.log('✅ [AGENDA] Modal de novo agendamento aberto');
}

function closeAppointmentModal() {
    console.log('❌ [AGENDA] Fechando modal de agendamento...');
    
    const modal = document.getElementById('appointmentModal');
    if (!modal) {
        console.error('❌ [AGENDA] Modal de agendamento não encontrado');
        return;
    }
    
    modal.style.display = 'none';
    console.log('✅ [AGENDA] Modal de agendamento fechado');
}

function saveAppointment(event) {
    console.log('💾 [AGENDA] Salvando novo agendamento...');
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const appointmentData = Object.fromEntries(formData);
    console.log('📋 [AGENDA] Dados do agendamento:', appointmentData);
    
    // Implementar salvamento via API
    console.log('🔧 [AGENDA] Função de salvamento ainda não implementada');
    
    closeAppointmentModal();
    console.log('🔄 [AGENDA] Recarregando agenda...');
    loadScheduleView(); // Recarrega a agenda
} 
