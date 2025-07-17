// Variaveis globais
const form = document.getElementById("form");
const toggleInput = document.getElementById("toggle");
const contentFormHeader = document.querySelector(".content-form header");
const sortedContainer = document.querySelector(".sorted-container");
const repeatButton = document.getElementById("repeatButton");
const sortTimesTitle = document.getElementById("sortTimesTitle");
const numberForm = document.getElementById("numberForm");
const sortResult = document.getElementById("sortResult");
let sortTimes = 0;
let numberContainer;
let numberList;

// gera numero aleatórios dentro do alcance minimo e máximo e quantas vezes
function generateRandomNumber(repeatTimes, rangeStart, rangeEnd) {
  // repete baseado em quantos numeros o usuario quer
  for (let i = 0; i < repeatTimes; i++) {
    while (true) {
      // gera o numero aleatório
      const randomNumber = Math.floor(
        Math.random() * (rangeEnd - rangeStart + 1) + rangeStart
      );

      // verifica se a toggleInput está checada e se o número gerado aparece no numberList
      if (toggleInput.checked && numberList.indexOf(randomNumber) === -1) {
        numberList.push(randomNumber);
        break;
        // verifica se a toggleInput não está checada
      } else if (!toggleInput.checked) {
        numberList.push(randomNumber);
        break;
      }
    }
  }
}

function showList(list) {
  // remove os elementos da tela
  numberForm.classList.add("disappear");
  setTimeout(numberForm.classList.add("remove"), 1000);

  // aparece os elementos dos numeros sorteados
  // sortResult.classList.add("appear");
  // setTimeout(sortResult.classList.remove("remove"), 5000);

  setTimeout(() => {
    sortResult.classList.add("appear");
    sortResult.classList.remove("remove");
  }, 500);

  // cria um container para cada numero sorteado
  list.forEach((number) => {
    const numberWrapper = document.createElement("div");
    const numberBg = document.createElement("div");
    const sortedNumber = document.createElement("p");
    numberContainer = numberWrapper;

    numberWrapper.classList.add("number-wrapper");
    numberBg.classList.add("number-bg");
    sortedNumber.textContent = number;

    numberWrapper.appendChild(numberBg);
    numberWrapper.appendChild(sortedNumber);
    sortedContainer.appendChild(numberWrapper);
  });

  sortTimesTitle.textContent = `${sortTimes}º resultado`;
}

// evento que le quando o botao de submit for clicado
form.onsubmit = (event) => {
  event.preventDefault();
  let repeatTimes = parseInt(document.getElementById("repeatTimes").value);
  let rangeStart = parseInt(document.getElementById("rangeStart").value);
  let rangeEnd = parseInt(document.getElementById("rangeEnd").value);
  numberList = [];

  numberForm.classList.remove("appear");

  if (rangeStart > rangeEnd) {
    alert("O valor inicial precisa ser menor que o limite máximo dos números");
    return;
  }

  sortTimes++;

  // chama a função de gerar o número aleatório passando as quantidade de repetições e o alcance minimo e máximo
  generateRandomNumber(repeatTimes, rangeStart, rangeEnd);

  // limpa as inputs
  document.getElementById("repeatTimes").value = "";
  document.getElementById("rangeStart").value = "";
  document.getElementById("rangeEnd").value = "";

  showList(numberList);
};

repeatButton.onclick = () => {
  // esvaziando a lista de numeros
  numberList.length = 0;

  // esconde o resultado dos numeros sorteado
  sortResult.classList.remove("appear");
  sortResult.classList.add("disappear");
  sortResult.classList.add("remove");

  // aparece o formulario de sorteador de numeros
  setTimeout(() => {
    numberForm.classList.remove("disappear");
    numberForm.classList.add("appear");
    numberForm.classList.remove("remove");
  }, 500);

  // remove os números sorteados
  document
    .querySelectorAll(".number-wrapper")
    .forEach((number) => number.remove());
};
