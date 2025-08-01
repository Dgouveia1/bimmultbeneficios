// =================================================================
// FUNÇÕES DE PACIENTES
// =================================================================

async function loadPatientsData() {
    console.log('👨‍⚕️ [PATIENTS] Iniciando carregamento de dados de pacientes...');
    // Implementar carregamento de dados de pacientes
    console.log('🔧 [PATIENTS] Função de carregamento ainda não implementada');
}

function selectPatient(patientElement) {
    console.log('👤 [PATIENTS] Selecionando paciente...');
    
    if (!patientElement) {
        console.error('❌ [PATIENTS] Elemento do paciente não fornecido');
        return;
    }
    
    const patientName = patientElement.querySelector('.nome')?.textContent || 'Nome não encontrado';
    console.log('👤 [PATIENTS] Paciente selecionado:', patientName);
    
    // Remove active de todos os itens
    const allItems = document.querySelectorAll('.paciente-espera-item');
    console.log('📋 [PATIENTS] Removendo active de', allItems.length, 'itens');
    
    allItems.forEach(item => item.classList.remove('active'));
    
    // Adiciona active ao item clicado
    patientElement.classList.add('active');
    console.log('✅ [PATIENTS] Active adicionado ao paciente:', patientName);
    
    // Carrega dados do paciente selecionado
    loadPatientInfo(patientName);
}

function loadPatientInfo(patientName) {
    console.log('📋 [PATIENTS] Carregando informações do paciente:', patientName);
    
    // Atualiza informações do paciente na coluna de info
    const nameElement = document.getElementById('currentPatientName');
    const ageElement = document.getElementById('currentPatientAge');
    const lastVisitElement = document.getElementById('currentPatientLastVisit');
    
    if (!nameElement || !ageElement || !lastVisitElement) {
        console.error('❌ [PATIENTS] Elementos de informação do paciente não encontrados');
        return;
    }
    
    nameElement.textContent = patientName;
    ageElement.textContent = '42 anos';
    lastVisitElement.textContent = '15/01/2025';
    
    console.log('✅ [PATIENTS] Informações básicas atualizadas');
    
    // Carrega histórico de consultas
    loadPatientHistory(patientName);
}

function loadPatientHistory(patientName) {
    console.log('📚 [PATIENTS] Carregando histórico para:', patientName);
    // Implementar carregamento do histórico de consultas
    console.log('🔧 [PATIENTS] Função de histórico ainda não implementada');
}

function switchTab(tabName) {
    console.log('🔄 [PATIENTS] Trocando para aba:', tabName);
    
    // Remove active de todos os botões e abas
    const buttons = document.querySelectorAll('#areaAtendimento .atendimento-botoes .btn');
    const tabs = document.querySelectorAll('#areaAtendimento .aba-conteudo');
    
    console.log('🔴 [PATIENTS] Removendo active de', buttons.length, 'botões e', tabs.length, 'abas');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    tabs.forEach(aba => aba.classList.remove('active'));
    
    // Adiciona active ao botão e aba clicados
    const activeButton = document.querySelector(`[data-aba="${tabName}"]`);
    const activeTab = document.getElementById(`aba${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
    
    if (activeButton) {
        activeButton.classList.add('active');
        console.log('✅ [PATIENTS] Botão ativado:', tabName);
    } else {
        console.error('❌ [PATIENTS] Botão não encontrado para aba:', tabName);
    }
    
    if (activeTab) {
        activeTab.classList.add('active');
        console.log('✅ [PATIENTS] Aba ativada:', tabName);
    } else {
        console.error('❌ [PATIENTS] Aba não encontrada:', tabName);
    }
}

function finalizarConsulta() {
    console.log('🏁 [PATIENTS] Finalizando consulta...');
    
    const queixa = document.getElementById('queixaPrincipal')?.value || '';
    const exameFisico = document.getElementById('exameFisico')?.value || '';
    const diagnostico = document.getElementById('diagnostico')?.value || '';
    const receituario = document.getElementById('receituario')?.value || '';
    const pedidoExames = document.getElementById('pedidoExames')?.value || '';
    
    console.log('📋 [PATIENTS] Dados da consulta coletados:', {
        queixaLength: queixa.length,
        exameFisicoLength: exameFisico.length,
        diagnosticoLength: diagnostico.length,
        receituarioLength: receituario.length,
        pedidoExamesLength: pedidoExames.length
    });
    
    if (!queixa || !exameFisico || !diagnostico) {
        console.error('❌ [PATIENTS] Campos obrigatórios não preenchidos');
        alert('Por favor, preencha pelo menos a queixa, exame físico e diagnóstico.');
        return;
    }
    
    const consultaData = {
        queixa,
        exameFisico,
        diagnostico,
        receituario,
        pedidoExames,
        data: new Date().toISOString()
    };
    
    console.log('💾 [PATIENTS] Dados da consulta para salvar:', consultaData);
    // Implementar salvamento via API
    console.log('🔧 [PATIENTS] Função de salvamento ainda não implementada');
    
    alert('Consulta finalizada com sucesso!');
    clearConsultationForm();
}

function clearConsultationForm() {
    console.log('🧹 [PATIENTS] Limpando formulário de consulta...');
    
    const fields = [
        'queixaPrincipal',
        'exameFisico', 
        'diagnostico',
        'receituario',
        'pedidoExames'
    ];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.value = '';
        } else {
            console.warn('⚠️ [PATIENTS] Campo não encontrado:', fieldId);
        }
    });
    
    console.log('✅ [PATIENTS] Formulário limpo com sucesso');
} 