// carregar dados do usuário no cabeçalho
function loadUserHeader() {
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
    
    if (user) {
        // atualizar foto do perfil no cabeçalho
        const headerAvatar = document.querySelector('.profile-img');
        if (headerAvatar && user.avatar) {
            headerAvatar.src = user.avatar;
        }
        
        // atualizar nome no cabeçalho
        const headerName = document.querySelector('.btn-profile span');
        if (headerName && user.name) {
            // mostrar apenas o primeiro nome
            const firstName = user.name.split(' ')[0];
            headerName.textContent = firstName;
        }
        
        // atualizar nome no menu lateral
        const sidebarName = document.querySelector('.user-name');
        if (sidebarName && user.name) {
            sidebarName.textContent = user.name;
        }
        
        // atualizar avatar no menu lateral
        const sidebarAvatar = document.querySelector('.user-avatar');
        if (sidebarAvatar && user.avatar) {
            sidebarAvatar.src = user.avatar;
        }
        
        // atualizar nome na saudação
        const pageDescription = document.querySelector('.page-description');
        if (pageDescription && user.name) {
            const firstName = user.name.split(' ')[0];
            pageDescription.textContent = `Bem-vindo de volta, ${firstName}! Aqui está o resumo do seu negócio.`;
        }
        
        // atualizar nome no dropdown
        const dropdownProfileName = document.querySelector('.dropdown-item:first-child');
        if (dropdownProfileName && user.name) {
            dropdownProfileName.innerHTML = `<i class="fas fa-user"></i> ${user.name}`;
        }
    }
}

// alternar menu lateral para mobile
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const btnMenu = document.getElementById('btnMenu');
const closeSidebar = document.getElementById('closeSidebar');

btnMenu.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
});

closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// dropdown menu
const profileBtn = document.getElementById('profileBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

if (profileBtn) {
    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });
}

document.addEventListener('click', () => {
    if (dropdownMenu) {
        dropdownMenu.classList.remove('show');
    }
});

// tema escuro/claro
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// navegação do menu lateral
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // remove active de todos
        navLinks.forEach(l => l.parentElement.classList.remove('active'));
        // adiciona active ao clicado
        link.parentElement.classList.add('active');
        
        // fecha menu lateral no mobile
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});

// gráficos
// Gráfico de Receita
const revenueCanvas = document.getElementById('revenueChart');
if (revenueCanvas) {
    const revenueCtx = revenueCanvas.getContext('2d');
    new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Receita 2024',
                data: [32000, 35000, 38000, 42000, 40000, 45000, 48000, 52000, 50000, 55000, 58000, 62000],
                borderColor: '#6C5CE7',
                backgroundColor: 'rgba(108, 92, 231, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#6C5CE7',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--border-color')
                    },
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

// gráfico de tráfego
const trafficCanvas = document.getElementById('trafficChart');
if (trafficCanvas) {
    const trafficCtx = trafficCanvas.getContext('2d');
    new Chart(trafficCtx, {
        type: 'doughnut',
        data: {
            labels: ['Orgânico', 'Direto', 'Social', 'Referência'],
            datasets: [{
                data: [45, 25, 20, 10],
                backgroundColor: ['#6C5CE7', '#00CEC9', '#fdcb6e', '#e17055'],
                borderWidth: 0,
                hoverBorderWidth: 3,
                hoverBorderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyleWidth: 10
                    }
                }
            },
            cutout: '70%'
        }
    });
}

// navegação entre páginas
document.addEventListener('DOMContentLoaded', () => {
    // mapeamento das páginas
    const pageRoutes = {
        '#dashboard': 'index.html',
        '#analytics': 'pages/analise.html',
        '#users': 'pages/usuarios.html',
        '#messages': 'pages/msg.html',
        '#config': 'pages/config.html'
    };

    // navegação da menu lateral
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const page = pageRoutes[href];
            
            if (page && page !== 'index.html') {
                e.preventDefault();
                // animação de saída
                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                    mainContent.style.opacity = '0';
                    mainContent.style.transform = 'translateY(10px)';
                    mainContent.style.transition = 'all 0.3s ease';
                }
                
                setTimeout(() => {
                    window.location.href = page;
                }, 300);
            }
        });
    });

    // link do perfil no cabeçalho
    const profileBtnNav = document.getElementById('profileBtn');
    if (profileBtnNav) {
        profileBtnNav.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-menu')) {
                window.location.href = 'pages/perfil.html';
            }
        });
    }

    // links do dropdown
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const routes = ['pages/perfil.html', 'pages/config.html'];
            if (routes[index]) {
                window.location.href = routes[index];
            }
        });
    });

    // logout
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('isLoggedIn');
            window.location.href = 'login.html';
        });
    }

    // logout no dropdown
    const logoutDropdown = document.querySelector('.dropdown-item.logout');
    if (logoutDropdown) {
        logoutDropdown.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('isLoggedIn');
            window.location.href = 'login.html';
        });
    }
});

// atualizar dados quando a página ganhar foco
window.addEventListener('focus', () => {
    loadUserHeader();
    console.log('Dados do usuário atualizados');
});

// verificar autenticação
if (!localStorage.getItem('isLoggedIn') && !sessionStorage.getItem('isLoggedIn')) {
    window.location.href = 'login.html';
}

console.log(' Dashboard carregado com sucesso!');