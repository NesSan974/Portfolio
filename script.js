// Au chargement de la page : simuler un clic sur le bouton "Tous"
window.addEventListener("DOMContentLoaded", () => {
    const activeBtn = document.querySelector(".filter-btn[data-filter='all']");
    if (activeBtn) activeBtn.click();
});

const buttons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Étape 1 : Animation OUT des cartes visibles
        const visibleCards = Array.from(cards).filter(card => card.classList.contains("visible"));

        visibleCards.forEach(card => {
            card.classList.remove("animate-in");
            card.classList.add("animate-out");
        });

        // Étape 2 : Après l'animation, masquer les cartes et afficher les nouvelles
        setTimeout(() => {
            cards.forEach(card => {
                const category = card.dataset.category;
                const shouldShow = filter === "all" || category === filter;

                if (shouldShow) {
                    card.classList.remove("animate-out", "hide");
                    card.classList.add("visible");
                    void card.offsetWidth; // force reflow
                    card.classList.add("animate-in");
                } else {
                    card.classList.remove("visible", "animate-out", "animate-in");
                    card.classList.add("hide");
                }
            });
        }, 300); // correspond à la durée de la transition CSS
    });
});
