import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    const nomePerfil = localStorage.getItem('perfilAtivoNome');
    const imagemPerfil = localStorage.getItem('perfilAtivoImagem');

    const kidsLink = document.querySelector('.kids-link');
    const profileIcon = document.querySelector('.profile-icon');

    const defaultName = 'Seu nome';
    const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png';

    if (kidsLink) {
        kidsLink.textContent = nomePerfil || defaultName;
    }

    if (profileIcon) {
        profileIcon.src = imagemPerfil || defaultImage;
    }

    const container = document.getElementById('main-content');
    
    if (container) {
        categories.forEach(category => {
            const carousel = createCarousel(category);
            container.appendChild(carousel);
        });
    }
});
