const perguntas = [
    {
        pergunta: "Qual é o comando para declarar uma variável em JS?",
        opcoes: ["var", "let", "const", "todas as anteriores"],
        respostaCorreta: 3
    },
    {
        pergunta: "O que é DOM em JavaScript?",
        opcoes: [
            "Document Object Model",
            "Design Oriented Model",
            "Dynamic Object Management"
        ],
        respostaCorreta: 0
    },
    {
        pergunta: "Qual método adiciona um elemento ao final de um array?",
        opcoes: [".push()", ".pop()", ".shift()", ".unshift()"],
        respostaCorreta: 0
    },
    {
        pergunta: "Qual destes NÃO é um tipo de dado primitivo em JavaScript?",
        opcoes: ["string", "number", "boolean", "array"],
        respostaCorreta: 3
    },
    {
        pergunta: "Como se escreve um comentário de uma linha em JavaScript?",
        opcoes: ["<!-- comentário -->", "// comentário", "/* comentário */", "# comentário"],
        respostaCorreta: 1
    },
    {
        pergunta: "Qual método converte JSON em um objeto JavaScript?",
        opcoes: ["JSON.parse()", "JSON.stringify()", "JSON.toObject()", "JSON.convert()"],
        respostaCorreta: 0
    },
    {
        pergunta: "O que 'NaN' significa em JavaScript?",
        opcoes: ["Not a Number", "Null and None", "New a Number", "Number is Negative"],
        respostaCorreta: 0
    },
    {
        pergunta: "Qual operador retorna verdadeiro se os valores E os tipos forem iguais?",
        opcoes: ["==", "===", "=", "!="],
        respostaCorreta: 1
    },
    {
        pergunta: "Qual método remove o último elemento de um array?",
        opcoes: [".push()", ".pop()", ".shift()", ".unshift()"],
        respostaCorreta: 1
    },
    {
        pergunta: "O que o operador '%' faz em JavaScript?",
        opcoes: ["Divide números", "Multiplica números", "Retorna o resto da divisão", "Eleva ao quadrado"],
        respostaCorreta: 2
    },
    {
        pergunta: "Qual palavra-chave é usada para declarar uma função em JS?",
        opcoes: ["func", "function", "def", "method"],
        respostaCorreta: 1
    },
    {
        pergunta: "Como se chama uma função que chama a si mesma?",
        opcoes: ["Callback", "Anonymous", "Recursive", "Arrow function"],
        respostaCorreta: 2
    },
    {
        pergunta: "Qual método transforma um array em string?",
        opcoes: [".toString()", ".join()", ".stringify()", "Ambos .toString() e .join()"],
        respostaCorreta: 3
    },
    {
        pergunta: "Qual destes é um loop em JavaScript?",
        opcoes: ["for", "while", "do...while", "Todos os anteriores"],
        respostaCorreta: 3
    },
    {
        pergunta: "O que 'this' representa em JavaScript?",
        opcoes: [
            "Sempre representa o objeto window",
            "Representa o objeto que contém a função",
            "É indefinido em todas as funções",
            "Sempre representa o objeto document"
        ],
        respostaCorreta: 1
    },
    {
        pergunta: "Qual método é usado para chamar uma função depois de um tempo?",
        opcoes: ["setInterval()", "setTimeout()", "waitFor()", "delay()"],
        respostaCorreta: 1
    },
    {
        pergunta: "Qual destes é um framework JavaScript?",
        opcoes: ["React", "Laravel", "Django", "Flask"],
        respostaCorreta: 0
    },
    {
        pergunta: "O que o método '.filter()' faz em um array?",
        opcoes: [
            "Modifica o array original",
            "Cria um novo array com elementos que passam em um teste",
            "Ordena o array",
            "Inverte a ordem do array"
        ],
        respostaCorreta: 1
    },
    {
        pergunta: "Qual destes é um operador lógico em JavaScript?",
        opcoes: ["&&", "||", "!", "Todos os anteriores"],
        respostaCorreta: 3
    }
];

let perguntaAtual = 0;
let pontuacao = 0;

// escapa caracteres HTML para evitar que textos como <!-- --> quebrem o DOM
function escaparHTML(texto) {
    return texto
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function mostrarPergunta() {
    const container = document.querySelector('.container-Principal');
    const pergunta = perguntas[perguntaAtual];

    let opcoesHTML = '';
    for (let i = 0; i < pergunta.opcoes.length; i++) {
        opcoesHTML += `<button class="opcao" onclick="verificarResposta(${i})">${escaparHTML(pergunta.opcoes[i])}</button>`;
    }

    container.innerHTML =
        `<h2 class="pergunta-texto">${escaparHTML(pergunta.pergunta)}</h2>
         <div class="opcoes-container">${opcoesHTML}</div>
         <p class="contador">${perguntaAtual + 1} / ${perguntas.length}</p>`;
}

function verificarResposta(indice) {
    const pergunta = perguntas[perguntaAtual];
    const botoes = document.querySelectorAll('.opcao');

    botoes.forEach(b => b.disabled = true);

    if (indice === pergunta.respostaCorreta) {
        botoes[indice].classList.add('correta');
        pontuacao++;
    } else {
        botoes[indice].classList.add('errada');
        botoes[pergunta.respostaCorreta].classList.add('correta');
    }

    setTimeout(function () {
        perguntaAtual++;
        if (perguntaAtual < perguntas.length) {
            mostrarPergunta();
        } else {
            mostrarResultado();
        }
    }, 1500);
}

function mostrarResultado() {
    const container = document.querySelector('.container-Principal');
    container.innerHTML =
        `<h2 class="pergunta-texto">Quiz Concluído! 🎉</h2>
         <p class="resultado">Você acertou ${pontuacao} de ${perguntas.length} perguntas!</p>
         <button onclick="reiniciarQuiz()" class="btn-reiniciar">Jogar Novamente</button>`;
}

function reiniciarQuiz() {
    perguntaAtual = 0;
    pontuacao = 0;
    mostrarPergunta();
}

window.onload = mostrarPergunta;