document.addEventListener('DOMContentLoaded', function() {
    // Atualiza o ano no footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Smooth scrolling para os links de navegação
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Configuração dos projetos
    const projects = [
        {
            title: "Gerenciador de Tarefas",
            image: "images/Proj_py.png",
            date: "Abril 2025",
            category: "Aplicativo Web",
            description: `
                <p>Um aplicativo para gerenciamento de tarefas com funcionalidades CRUD. Permite:</p>
                <ul>
                    <li>Adicionar novas tarefas</li>
                    <li>Excluir tarefas</li>
                </ul>
            `,
            technologies: [
                {icon: "fab fa-python", name: "Python"},
                {icon: "fab fa-js", name: "JavaScript"},
                {icon: "fab fa-html5", name: "HTML5"},
                {icon: "fab fa-css3-alt", name: "CSS3"}
            ],
            links: [
                {icon: "fab fa-github", text: "Repositório no GitHub", url: "https://github.com/GuilhermeCaetanoSouza/Gerenciador_De_Tarefas"}
            ]
        },
        {
            title: "Pokedex",
            image: "images/pokemon.png",
            date: "Novembro 2024",
            category: "Website",
            description: `
                <p>Uma Pokedex ultilizando a PokeAPI</p>
                <p>Características principais:</p>
                <ul>
                    <li>Design responsivo</li>
                    <li>Comparador Pokemon</li>
                    <li>Filtragem</li>
                    <li>Simulador de Batalhas</li>
                </ul>
            `,
            technologies: [
                {icon: "fab fa-html5", name: "HTML5"},
                {icon: "fab fa-css3-alt", name: "CSS3"},
                {icon: "fab fa-js", name: "JavaScript"},
                {icon: "fas fa-mobile-alt", name: "Responsive Design"}
            ],
            links: [
                {icon: "fas fa-external-link-alt", text: "Visitar Site", url: "https://guilhermecaetanosouza.github.io/Projeto_Pokemon/"}
            ]
        }
    ];

    // Modal de projeto
    const modal = document.getElementById('project-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalCategory = document.getElementById('modal-category');
    const modalDescription = document.getElementById('modal-description');
    const modalTech = document.getElementById('modal-tech');
    const modalLinks = document.getElementById('modal-links');
    const closeModal = document.querySelector('.close-modal');

    // Abrir modal
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.closest('.project').getAttribute('data-project-id');
            const project = projects[projectId];
            
            // Preencher modal com dados do projeto
            modalImage.src = project.image;
            modalImage.alt = project.title;
            modalTitle.textContent = project.title;
            modalDate.textContent = project.date;
            modalCategory.textContent = project.category;
            modalDescription.innerHTML = project.description;
            
            // Limpar e adicionar tecnologias
            modalTech.innerHTML = '';
            project.technologies.forEach(tech => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="${tech.icon}"></i> ${tech.name}`;
                modalTech.appendChild(li);
            });
            
            // Limpar e adicionar links
            modalLinks.innerHTML = '';
            project.links.forEach(link => {
                const a = document.createElement('a');
                a.href = link.url;
                a.className = 'project-link';
                a.target = '_blank';
                a.innerHTML = `<i class="${link.icon}"></i> ${link.text}`;
                modalLinks.appendChild(a);
            });
            
            // Mostrar modal
            document.body.classList.add('modal-open');
            modal.classList.add('active');
        });
    });

    // Fechar modal
    function closeProjectModal() {
        document.body.classList.remove('modal-open');
        modal.classList.remove('active');
    }

    closeModal.addEventListener('click', closeProjectModal);

    // Fechar ao clicar no overlay
    document.querySelector('.modal-overlay').addEventListener('click', closeProjectModal);

    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });

    // Efeito de destaque quando a seção está visível
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });

    // Fechar modal pelo botão do rodapé
    document.querySelector('.close-modal-btn')?.addEventListener('click', closeProjectModal);

    // Melhorar a acessibilidade do modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // Prevenir que o modal feche ao clicar no conteúdo
    document.querySelector('.modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
});