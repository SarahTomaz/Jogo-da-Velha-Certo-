/*1º Passo: Selecionar todas as células para configurar o 
funcionamento dos cliques */
const cellElements = document.querySelectorAll("[celulas]");
const contain = document.querySelectorAll("[container]");
const mensagemFinalElements = document.querySelector("[minsage]");
const winermsgElements = document.querySelector("[mensage]");
const butãoFim = document.querySelector("[butão]");
let isCircleTurn = false;
/*3º Passo: Criar função dos cliques dos botões e a apari-
ção das imagens nos quadrados*/
const startGame = () => {
    for (const cell of cellElements){
        cell.classList.remove('bolinha');
        cell.classList.remove('X');
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once : true });

        winermsgElements.classList.remove("show-winning-message");
    };
   
};

const combinações = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const fimDeJogo = (isempate) => {
    if(isempate){
        mensagemFinalElements.innerText = "Empate!";
    }else{
        mensagemFinalElements.innerText = isCircleTurn ? "Gatos Venceram!" : "Cachorros Venceram!" ;
    }

    
    winermsgElements.classList.add("show-winning-message");
};


const checarVitoria = (turnoAtual) => {
    return combinações.some((combinações) => {
        return combinações.every((index) => {
            return cellElements[index].classList.contains(turnoAtual);
        }); 
    });
};
/*4º Passo: Criação da Placemark para melhorar o código*/
const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}; 

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    contain.classList.remove("bolinha");
    contain.classList.remove("X");

    if(isCircleTurn){
        contain.classList.add("bolinha");
    }else{
        contain.classList.add("X");
    }
};

/* 2º Passo: Criação da função handleClick*/
const handleClick = (e) => {
    const cell = e.target; 
    //Colocar as marcações X ou O
    const classToAdd = isCircleTurn ? "bolinha" : "X";
    //Chamada da função
    placeMark(cell, classToAdd);

    const vitoria = checarVitoria(classToAdd);
    if (vitoria){
        fimDeJogo(false);
    }

    swapTurns();
};

butãoFim.addEventListener('click', startGame());