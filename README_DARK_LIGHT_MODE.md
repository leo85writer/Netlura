# Sistema de Dark Mode e Light Mode

## 📋 Descrição

Este projeto implementa um sistema completo de alternância entre **Dark Mode** (padrão) e **Light Mode** usando JavaScript, CSS e LocalStorage para persistência. O controle é feito através de um **ícone simples** posicionado no canto superior direito da tela.

## 🎨 Características

✅ **Dois temas completos:**
- **Dark Mode (Padrão)**: Fundo preto, texto branco, cores de acento em vermelho (#b20710)
- **Light Mode**: Fundo branco, texto preto, cores de acento em vermelho mais claro (#dc2626)

✅ **Persistência**: O tema escolhido é salvo no `localStorage` e permanece mesmo após fechar o navegador

✅ **Transições suaves**: Todas as mudanças de cor têm transições CSS de 0.3s

✅ **Acessibilidade**:
- Botão com aria-label descritivo
- Ícones intuitivos (☀️ = Light, 🌙 = Dark)
- Suporte a navegação por teclado (Enter/Space)

✅ **Ícone simples**: Apenas o ícone emoji, sem botão colorido ou texto

✅ **Posicionamento responsivo**: Fixo no canto superior direito da tela, ajustado para diferentes tamanhos de tela

✅ **Variáveis CSS**: Implementação com CSS variables para fácil manutenção

## 📁 Arquivos

### 1. `theme.js`
Script JavaScript que gerencia toda a lógica do tema:
- `themes`: Objeto com configuração de cores para cada tema
- `initializeTheme()`: Carrega o tema salvo ao abrir a página
- `applyTheme(themeName)`: Aplica o tema selecionado
- `toggleTheme()`: Alterna entre temas
- `updateThemeButton()`: Atualiza apenas o ícone (☀️ ou 🌙)
- `setupThemeButton()`: Configura os event listeners

### 2. `style.css`
Estilos CSS atualizados:
- **Variáveis CSS** no `:root` para cores padrão (dark mode)
- **`.theme-toggle`**: Ícone simples, transparente, posicionado fixo no topo direito
- **`.light-theme`**: Classe que envolve todos os estilos do light mode
- **Media queries**: Ajustes responsivos para o ícone em telas menores

### 3. `index.html` e `filmes.html`
- **Ícone `#theme-toggle`** no header (apenas ☀️ ou 🌙)
- **Link para `theme.js`**

## 🚀 Como Usar

### Implementação Automática

O sistema é **automático** após os arquivos estarem configurados:

1. Clique no **ícone** (☀️ ou 🌙) no canto superior direito da tela
2. O tema muda instantaneamente com transição suave
3. A preferência é salva no navegador

### Variáveis CSS Disponíveis

```css
--bg-color:         Cor de fundo
--text-color:       Cor de texto principal
--secondary-color:  Cor secundária (elementos auxiliares)
--border-color:     Cor de bordas
--accent-color:     Cor de destaque/acento
```

### Adicionar Novo Elemento com Suporte ao Tema

```css
.novo-elemento {
    background-color: var(--bg-color);
    color: var(--text-color);
    border-color: var(--border-color);
}

.light-theme .novo-elemento {
    /* Estilos específicos para light mode */
}
```

## 🎯 Exemplo de Uso JavaScript

```javascript
// Forçar um tema específico
applyTheme('light');

// Alternar tema
toggleTheme();

// Obter tema atual
const currentTheme = localStorage.getItem('theme');
```

## 📱 Responsividade

O ícone é posicionado de forma responsiva:
- **Desktop (1024px+)**: top: 20px; right: 20px; font-size: 1.5rem
- **Tablet (768px - 1023px)**: top: 15px; right: 15px; font-size: 1.3rem
- **Mobile (até 480px)**: top: 10px; right: 10px; font-size: 1.2rem

## 🎓 Como Funciona

1. **Ao carregar a página:**
   - Verifica o `localStorage` para um tema salvo
   - Se não houver, usa 'dark' como padrão
   - Aplica o tema via variáveis CSS e classe no body

2. **Ao clicar no ícone:**
   - O `toggleTheme()` é acionado
   - Identifica o tema atual
   - Aplica o oposto
   - Salva a preferência no localStorage
   - Atualiza apenas o ícone visualmente

3. **Persistência:**
   - O localStorage armazena a preferência
   - Na próxima visita, o tema escolhido é carregado automaticamente

## ✨ Melhorias Implementadas

- Ícone simples e elegante (apenas emoji)
- Posicionamento fixo no canto superior direito
- Responsividade completa para todos os dispositivos
- Hover sutil com fundo semi-transparente
- Transições suaves entre temas (0.3s)
- Suporte a navegação por teclado
- LocalStorage para persistência
- Event listeners robustos

## 🐛 Troubleshooting

### Ícone não aparece
- Verifique se `theme.js` está sendo carregado
- Verifique o console do navegador para erros
- Limpe o cache do navegador

### Tema não muda
- Certifique-se de que o ID `theme-toggle` está no HTML
- Verifique se o CSS do ícone está sendo carregado
- Use o DevTools para inspecionar o elemento

### LocalStorage não funciona
- Verifique se as cookies estão habilitadas
- Teste em modo incógnito/privado
- Verifique as permissões do navegador

---

**Desenvolvido para o projeto Netflix da Imersão Alura Front End** 🎬