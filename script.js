document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    if (menuButton && menu) {
        menuButton.addEventListener("click", () => {
            const isOpen = menu.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });

        menu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("open");
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    }
});

/* ===== CARROSSEL DE AVALIAÇÕES ===== */

const avaliacoes = [
    {
        nome: "João Victor Biolchi",
        texto: "Profissional maravilhosa! Um atendimento que tem mudado a minha vida, recomendo demais!",
        estrelas: 5,
        data: "há 3 anos"
    },
    {
        nome: "Naka Master",
        texto: "Ótima profissional, consegue desenvolver um vínculo com facilidade, faz a terapia parecer uma conversa com uma grande amiga! super atenciosa e dedicada, me ajudou muito!",
        estrelas: 5,
        data: "há 3 anos"
    },
    {
        nome: "Annick Nowak",
        texto: "Atendimento humanizado, proporcionando acolhimento e permitindo uma experiência mais confortável. Ótima profissional. Gratidão.",
        estrelas: 5,
        data: "há 3 anos"
    },
    {
        nome: "Caroline Amaral",
        texto: "Paolla é uma ótima pessoa e profissional! Recomendo demais!",
        estrelas: 5,
        data: "há 3 anos"
    },
    {
        nome: "João Pedro Nowak",
        texto: "Atendimento ético e humanizado",
        estrelas: 5,
        data: "há 3 anos"
    }
];

const trilha = document.querySelector("#avaliacoes-trilha");
const indicadores = document.querySelector("#avaliacoes-indicadores");
const btnAnterior = document.querySelector(".avaliacao-seta.anterior");
const btnProxima = document.querySelector(".avaliacao-seta.proxima");

if (trilha && indicadores && btnAnterior && btnProxima) {

    let indiceAtual = 0;

    // Criar os cards
    avaliacoes.forEach(avaliacao => {

        const card = document.createElement("article");
        card.className = "avaliacao-card";

        const estrelas = document.createElement("span");
        estrelas.className = "estrelas";
        estrelas.textContent = "★".repeat(avaliacao.estrelas);
        estrelas.setAttribute(
            "aria-label",
            `${avaliacao.estrelas} de 5 estrelas`
        );

        const texto = document.createElement("p");
        texto.className = "avaliacao-texto";
        texto.textContent = avaliacao.texto;

        const autor = document.createElement("span");
        autor.className = "avaliacao-autor";
        autor.textContent = avaliacao.nome;

        const data = document.createElement("span");
        data.className = "avaliacao-data";
        data.textContent = avaliacao.data;

        card.append(estrelas, texto, autor, data);
        trilha.appendChild(card);
    });

    function quantidadeVisivel() {
        return window.innerWidth <= 720 ? 1 : 2;
    }

    function totalPaginas() {
        return Math.max(1, avaliacoes.length - quantidadeVisivel() + 1);
    }

    function atualizarCarrossel() {

        const cards = trilha.querySelectorAll(".avaliacao-card");

        if (!cards.length) return;

        indiceAtual = Math.min(
            indiceAtual,
            totalPaginas() - 1
        );

        const primeiroCard = cards[0];
        const gap = parseFloat(getComputedStyle(trilha).gap) || 0;

        const deslocamento =
            indiceAtual * (primeiroCard.getBoundingClientRect().width + gap);

        trilha.style.transform = `translateX(-${deslocamento}px)`;

        btnAnterior.disabled = indiceAtual === 0;
        btnProxima.disabled = indiceAtual >= totalPaginas() - 1;

        indicadores.replaceChildren();

        for (let i = 0; i < totalPaginas(); i++) {

            const indicador = document.createElement("button");
            indicador.type = "button";
            indicador.setAttribute("aria-label", `Mostrar avaliação ${i + 1}`);

            if (i === indiceAtual) {
                indicador.classList.add("ativo");
                indicador.setAttribute("aria-current", "true");
            }

            indicador.addEventListener("click", () => {
                indiceAtual = i;
                atualizarCarrossel();
            });

            indicadores.appendChild(indicador);
        }
    }

    btnAnterior.addEventListener("click", () => {
        indiceAtual--;
        atualizarCarrossel();
    });

    btnProxima.addEventListener("click", () => {
        indiceAtual++;
        atualizarCarrossel();
    });

    window.addEventListener("resize", atualizarCarrossel);

    atualizarCarrossel();
}