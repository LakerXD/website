// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Мобильное меню
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Валидация формы
const contactForm = document.getElementById('contactForm');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

emailInput.addEventListener('input', () => {
    if (!validateEmail(emailInput.value)) {
        emailError.style.display = 'block';
        emailError.textContent = 'Введите корректный email адрес';
    } else {
        emailError.style.display = 'none';
    }
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!validateEmail(email)) {
        emailError.style.display = 'block';
        emailError.textContent = 'Введите корректный email адрес';
        return;
    }

    // Здесь можно добавить отправку формы на сервер
    console.log('Форма отправлена:', { name, email, message });
    alert('Сообщение отправлено! Я свяжусь с вами в ближайшее время.');
    contactForm.reset();
});

// Изменение навигации при скролле
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за секциями
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Год в футере
document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-copyright p');
    if (copyrightElement) {
        copyrightElement.innerHTML = `&copy; ${year} Меньших Виктория. Все права защищены.`;
    }
});

// Функции для модальных окон галереи
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Закрытие модального окна при клике вне его
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Закрытие модального окна по ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
});

// Обработка изображения профиля
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.querySelector('.about-image img');
    const placeholder = document.querySelector('.image-placeholder');

    if (profileImg) {
        profileImg.onload = function() {
            // Изображение загружено успешно
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        };

        profileImg.onerror = function() {
            // Ошибка загрузки изображения
            this.style.display = 'none';
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        };

        // Проверяем, загружено ли изображение (на случай кэширования)
        if (profileImg.complete) {
            if (profileImg.naturalHeight === 0) {
                // Изображение не загружено
                profileImg.style.display = 'none';
                if (placeholder) {
                    placeholder.style.display = 'flex';
                }
            }
        }
    }
});
