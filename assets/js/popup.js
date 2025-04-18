document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("project-modal");
    const modalTitle = document.getElementById("project-title");
    const modalDescription = document.getElementById("project-description");
    const githubLink = document.getElementById("github-link");
    const closeModal = document.querySelector(".close");
    const prevBtn = document.getElementById("prev-project");
    const nextBtn = document.getElementById("next-project");

    const cards = document.querySelectorAll(".project-card");
    const projectData = Array.from(cards).map(card => {
        return {
            title: card.querySelector("h3")?.textContent || "Untitled",
            description: card.dataset.description || "No description provided.",
            github: card.querySelector("a")?.href || "#"
        };
    });

    let currentIndex = 0;

    function openModal(index) {
        const project = projectData[index];
        currentIndex = index;
        modalTitle.textContent = project.title;
        modalDescription.innerHTML = project.description;
        githubLink.href = project.github;
        modal.style.display = "flex";
    }

    cards.forEach((card, index) => {
        card.addEventListener("click", () => openModal(index));
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + projectData.length) % projectData.length;
        openModal(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % projectData.length;
        openModal(currentIndex);
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
