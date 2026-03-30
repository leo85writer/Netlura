// Busca o elemento da lista de filmes no DOM pelo id "movies-list".
const moviesList = document.getElementById("movies-list");
// Busca o formulário de cadastro de filmes pelo id "movie-form".
const movieForm = document.getElementById("movie-form");
// Busca a região de status usada para mensagens acessíveis (aria-live).
const statusRegion = document.getElementById("movies-status");

// Função utilitária que anuncia mensagens para o usuário na região de status.
function announce(message) {
    // Atualiza o texto da região de status com a mensagem recebida.
    statusRegion.textContent = message;
}

// Define a nota visual e semântica de um filme com base no valor recebido.
function setRating(movieItem, value) {
    // Seleciona todos os botões de estrela dentro do card do filme.
    const ratingButtons = movieItem.querySelectorAll(".star-button");
    // Seleciona o parágrafo que mostra o texto da nota (ex.: 3 de 5 estrelas).
    const ratingText = movieItem.querySelector(".rating-text");
    // Obtém o título do filme para usar na mensagem; se não existir, usa "Filme".
    const movieTitle = movieItem.querySelector("h3")?.textContent || "Filme";

    // Percorre cada botão de estrela para ativar/desativar conforme a nota escolhida.
    ratingButtons.forEach((button) => {
        // Converte o valor da estrela (data-rating) para número.
        const buttonValue = Number(button.dataset.rating);
        // Verifica se a estrela atual deve ficar ativa (até o valor selecionado).
        const isActive = buttonValue <= value;
        // Adiciona ou remove a classe "active" conforme o estado da estrela.
        button.classList.toggle("active", isActive);
        // Atualiza aria-pressed para leitores de tela entenderem o estado do botão.
        button.setAttribute("aria-pressed", String(isActive));
    });

    // Atualiza texto da nota; se valor for 0 mostra "Sem avaliacao".
    ratingText.textContent = value > 0 ? `${value} de 5 estrelas` : "Sem avaliacao";
    // Anuncia a nova nota atribuída ao filme.
    announce(`${movieTitle} recebeu ${value} de 5 estrelas.`);
}

// Retorna o HTML de um novo item de filme usando título e descrição fornecidos.
function getMovieTemplate(title, description) {
    // Usa template string para montar o card completo que será inserido na lista.
    return `
        <li class="movie-item">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 420'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%25' stop-color='%231f2937'/><stop offset='100%25' stop-color='%23b20710'/></linearGradient></defs><rect width='300' height='420' fill='url(%23g)'/><rect x='18' y='18' width='264' height='384' rx='18' fill='rgba(0,0,0,0.28)'/><text x='50%25' y='50%25' text-anchor='middle' fill='white' font-size='28' font-family='Arial'>Novo Filme</text></svg>" alt="Poster ilustrado do filme ${title}.">
            <h3>${title}</h3>
            <p>${description}</p>
            <div class="rating" role="group" aria-label="Classificar filme ${title}">
                <button type="button" class="star-button" data-rating="1" aria-label="Dar 1 estrela">☆</button>
                <button type="button" class="star-button" data-rating="2" aria-label="Dar 2 estrelas">☆</button>
                <button type="button" class="star-button" data-rating="3" aria-label="Dar 3 estrelas">☆</button>
                <button type="button" class="star-button" data-rating="4" aria-label="Dar 4 estrelas">☆</button>
                <button type="button" class="star-button" data-rating="5" aria-label="Dar 5 estrelas">☆</button>
            </div>
            <p class="rating-text" aria-live="polite">Sem avaliacao</p>
            <button class="remove-button" type="button">Remover filme</button>
        </li>
    `;
}

// Sanitiza texto para evitar injeção de HTML quando usuário digita dados no formulário.
function sanitizeText(value) {
    // Retorna o valor com caracteres especiais escapados e sem espaços nas pontas.
    return value
        // Substitui "&" pelo equivalente HTML seguro.
        .replaceAll("&", "&amp;")
        // Substitui "<" para evitar abertura de tags HTML.
        .replaceAll("<", "&lt;")
        // Substitui ">" para evitar fechamento/injeção de tags.
        .replaceAll(">", "&gt;")
        // Substitui aspas duplas para evitar quebra de atributos HTML.
        .replaceAll('"', "&quot;")
        // Remove espaços extras no começo e no fim do texto.
        .trim();
}

// Escuta cliques na lista inteira usando delegação de eventos.
moviesList.addEventListener("click", (event) => {
    // Verifica se o clique aconteceu em alguma estrela (ou dentro dela).
    const starButton = event.target.closest(".star-button");
    // Se clicou em estrela, entra neste bloco.
    if (starButton) {
        // Encontra o card do filme correspondente à estrela clicada.
        const movieItem = starButton.closest(".movie-item");
        // Lê a nota escolhida a partir do data-rating.
        const ratingValue = Number(starButton.dataset.rating);
        // Aplica a nota no card encontrado.
        setRating(movieItem, ratingValue);
        // Interrompe execução para não processar remoção no mesmo clique.
        return;
    }

    // Verifica se o clique ocorreu no botão de remover.
    const removeButton = event.target.closest(".remove-button");
    // Se clicou para remover, entra neste bloco.
    if (removeButton) {
        // Encontra o card de filme correspondente ao botão.
        const movieItem = removeButton.closest(".movie-item");
        // Captura o título do filme para exibir na mensagem de confirmação.
        const movieTitle = movieItem.querySelector("h3")?.textContent || "Filme";
        // Remove o card do filme da lista.
        movieItem.remove();
        // Anuncia que o filme foi removido.
        announce(`${movieTitle} foi removido da lista.`);
    }
});

// Escuta teclas pressionadas na lista para navegação acessível entre estrelas.
moviesList.addEventListener("keydown", (event) => {
    // Identifica se a tecla foi acionada sobre uma estrela.
    const currentStar = event.target.closest(".star-button");
    // Se não for estrela, não faz nada.
    if (!currentStar) {
        // Sai da função quando o alvo não é botão de avaliação.
        return;
    }

    // Encontra o grupo de estrelas ao qual o botão atual pertence.
    const ratingGroup = currentStar.closest(".rating");
    // Cria array com todas as estrelas desse grupo.
    const starButtons = [...ratingGroup.querySelectorAll(".star-button")];
    // Descobre índice da estrela atualmente focada.
    const currentIndex = starButtons.indexOf(currentStar);
    // Encontra o card do filme para atualizar a nota correta.
    const movieItem = currentStar.closest(".movie-item");

    // Se tecla for seta para direita ou para cima, avança uma estrela.
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
        // Impede comportamento padrão do navegador.
        event.preventDefault();
        // Calcula próximo índice com loop circular.
        const nextIndex = (currentIndex + 1) % starButtons.length;
        // Move foco para a próxima estrela.
        starButtons[nextIndex].focus();
        // Aplica a nota da estrela focada.
        setRating(movieItem, Number(starButtons[nextIndex].dataset.rating));
    // Se tecla for seta para esquerda ou para baixo, volta uma estrela.
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
        // Impede scroll/comportamento padrão.
        event.preventDefault();
        // Calcula índice anterior com loop circular.
        const previousIndex = (currentIndex - 1 + starButtons.length) % starButtons.length;
        // Move foco para a estrela anterior.
        starButtons[previousIndex].focus();
        // Aplica a nota da estrela focada.
        setRating(movieItem, Number(starButtons[previousIndex].dataset.rating));
    // Se tecla numérica de 1 a 5, define nota diretamente.
    } else if (event.key >= "1" && event.key <= "5") {
        // Impede comportamento padrão da tecla.
        event.preventDefault();
        // Converte tecla pressionada para número.
        const value = Number(event.key);
        // Foca a estrela correspondente ao número digitado.
        starButtons[value - 1].focus();
        // Aplica a nota digitada.
        setRating(movieItem, value);
    // Tecla Home define menor nota.
    } else if (event.key === "Home") {
        // Impede comportamento padrão.
        event.preventDefault();
        // Foca a primeira estrela.
        starButtons[0].focus();
        // Define nota 1.
        setRating(movieItem, 1);
    // Tecla End define maior nota.
    } else if (event.key === "End") {
        // Impede comportamento padrão.
        event.preventDefault();
        // Guarda índice máximo disponível.
        const maxIndex = starButtons.length - 1;
        // Foca a última estrela.
        starButtons[maxIndex].focus();
        // Define nota 5.
        setRating(movieItem, 5);
    }
});

// Escuta o envio do formulário para adicionar novos filmes à lista.
movieForm.addEventListener("submit", (event) => {
    // Impede o recarregamento padrão da página ao enviar formulário.
    event.preventDefault();

    // Cria objeto FormData para ler os campos do formulário.
    const formData = new FormData(movieForm);
    // Lê campo de título e converte para string (fallback vazio).
    const rawTitle = String(formData.get("title") || "");
    // Lê campo de descrição e converte para string (fallback vazio).
    const rawDescription = String(formData.get("description") || "");
    // Sanitiza título para evitar inserção de HTML malicioso.
    const title = sanitizeText(rawTitle);
    // Sanitiza descrição para evitar inserção de HTML malicioso.
    const description = sanitizeText(rawDescription);

    // Valida se título e descrição foram preenchidos.
    if (!title || !description) {
        // Anuncia erro caso algum campo esteja vazio.
        announce("Preencha titulo e descricao para adicionar um novo filme.");
        // Interrompe envio quando dados forem inválidos.
        return;
    }

    // Insere novo card de filme no final da lista.
    moviesList.insertAdjacentHTML("beforeend", getMovieTemplate(title, description));
    // Anuncia que o filme foi adicionado.
    announce(`${title} foi adicionado a lista de filmes.`);
    // Limpa os campos do formulário.
    movieForm.reset();
    // Devolve foco ao campo de título para facilitar próximo cadastro.
    document.getElementById("movie-title").focus();
});
