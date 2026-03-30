// Script para gerenciar Dark Mode e Light Mode

// Objeto com configuração dos temas
const themes = {
    dark: {
        name: 'dark',
        colors: {
            background: '#000000',
            text: '#ffffff',
            secondary: '#1f2937',
            border: '#444444',
            accent: '#b20710'
        }
    },
    light: {
        name: 'light',
        colors: {
            background: '#ffffff',
            text: '#000000',
            secondary: '#f3f4f6',
            border: '#e5e7eb',
            accent: '#dc2626'
        }
    }
};

// Função para inicializar o tema ao carregar a página
function initializeTheme() {
    // Busca o tema salvo no localStorage ou usa 'dark' como padrão
    const savedTheme = localStorage.getItem('theme') || 'dark';
    // Aplica o tema salvo
    applyTheme(savedTheme);
    // Atualiza o estado do botão
    updateThemeButton(savedTheme);
    // Configura o event listener do botão
    setupThemeButton();
}

// Função para aplicar o tema selecionado
function applyTheme(themeName) {
    // Obtém o objeto do tema
    const theme = themes[themeName];
    
    if (!theme) {
        console.warn(`Tema "${themeName}" não encontrado`);
        return;
    }

    // Seleciona a raiz do documento
    const root = document.documentElement;
    
    // Define as variáveis CSS para o tema
    root.style.setProperty('--bg-color', theme.colors.background);
    root.style.setProperty('--text-color', theme.colors.text);
    root.style.setProperty('--secondary-color', theme.colors.secondary);
    root.style.setProperty('--border-color', theme.colors.border);
    root.style.setProperty('--accent-color', theme.colors.accent);

    // Adiciona classe ao body identificando o tema ativo
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${themeName}-theme`);

    // Salva o tema no localStorage para persistência
    localStorage.setItem('theme', themeName);
}

// Função para alternar entre temas
function toggleTheme() {
    // Obtém o tema atual
    const currentTheme = localStorage.getItem('theme') || 'dark';
    // Define o novo tema (oposto do atual)
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Aplica o novo tema
    applyTheme(newTheme);
    // Atualiza o botão
    updateThemeButton(newTheme);
    
    // Exibe mensagem de feedback (opcional)
    console.log(`Tema alterado para: ${newTheme}`);
}

// Função para atualizar o estado e ícone do botão
function updateThemeButton(themeName) {
    // Busca o botão de tema
    const themeButton = document.getElementById('theme-toggle');
    
    if (!themeButton) return;
    
    // Define aria-label para acessibilidade
    if (themeName === 'dark') {
        themeButton.setAttribute('aria-label', 'Ativar modo claro');
        themeButton.textContent = '☀️'; // Sol = Light Mode
    } else {
        themeButton.setAttribute('aria-label', 'Ativar modo escuro');
        themeButton.textContent = '🌙'; // Lua = Dark Mode
    }
    
    // Adiciona classe visual ao botão
    themeButton.classList.toggle('light-mode', themeName === 'light');
}

// Função para configurar o event listener
function setupThemeButton() {
    // Busca o botão de tema
    const themeButton = document.getElementById('theme-toggle');
    
    if (!themeButton) {
        // Se o botão não estiver disponível ainda, tenta novamente em breve
        setTimeout(setupThemeButton, 100);
        return;
    }
    
    // Adiciona listener de clique ao botão
    themeButton.addEventListener('click', toggleTheme);
    
    // Adiciona suporte a navegação por teclado
    themeButton.addEventListener('keydown', (event) => {
        // Alterna de tema ao pressionar Enter ou Space
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleTheme();
        }
    });
}

// Inicializa o tema quando o DOM estiver carregado
if (document.readyState === 'loading') {
    // DOM ainda está carregando
    document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
    // DOM já está carregado
    initializeTheme();
}
