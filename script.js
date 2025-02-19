// Переключатель темы
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");
  const themeIcon = document.getElementById("theme-icon");
  if (body.classList.contains("dark-theme")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
  // Сохраняем выбор в localStorage
  localStorage.setItem(
    "theme",
    body.classList.contains("dark-theme") ? "dark" : "light"
  );
});

// При загрузке страницы, применяем сохраненную тему
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.classList.remove("light-theme", "dark-theme");
    body.classList.add(savedTheme + "-theme");
  }
});

// Динамическая загрузка проектов из JSON
function loadProjects() {
  fetch("projects.json")
    .then((response) => response.json())
    .then((projects) => {
      const projectsContainer = document.getElementById("projects");
      projectsContainer.innerHTML = ""; // Очистить содержимое
      projects.forEach((project) => {
        const projectElement = document.createElement("div");
        projectElement.className = "project-card";
        projectElement.innerHTML = `
          <div class="project-icon"><i class="fas fa-code"></i></div>
          <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            ${
              project.link
                ? `<div class="project-link-card"><i class="fas fa-external-link-alt"></i><a href="${project.link}" target="_blank" class="project-link">Подробнее</a></div>`
                : ""
            }
          </div>
        `;
        projectsContainer.appendChild(projectElement);
      });
    })
    .catch((error) => {
      console.error("Ошибка загрузки проектов:", error);
    });
}
document.addEventListener("DOMContentLoaded", loadProjects);

// Анимация появления при скролле с использованием Intersection Observer
const revealElements = document.querySelectorAll(".reveal");

const observerOptions = {
  threshold: 0.2,
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((el) => {
  revealOnScroll.observe(el);
});
