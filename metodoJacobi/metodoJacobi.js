const math = require("mathjs");
const verificaSistema = require("./verificaSistema");
const verificaSistemaLinear = verificaSistema.verificaSistemaLinear;

function gaussJacobi(A, b, taxaDeErro, numeroMaxIteracoes) {
  let elementoIncognita = [];
  let x = [];
  let chuteInicial = [7 / 10, -8 / 5, 6 / 10];
  for (let k = 0; k < b.length; k++) {
    elementoIncognita[k] = 0; //Math.floor((Math.random() * 10000) + 1);
  }

  let contadorDeIteracoes = 0;
  let continuar = true;

  while (continuar && contadorDeIteracoes < numeroMaxIteracoes) {
    for (let i = 0; i < b.length; i++) {
      soma = 0;
      for (let j = 0; j < b.length; j++) {
        if (j != i) {
          soma = soma + (A[i][j] * elementoIncognita[j]) / A[i][i];
        }
        x[i] = b[i] / A[i][i] - soma;
      }
    }
    if (Math.abs(math.norm(x) - math.norm(elementoIncognita)) < taxaDeErro) {
      continuar = false;
    } else {
      elementoIncognita = x.slice(0);
    }
    contadorDeIteracoes += 1;
  }
  return x;
}

let matrizA = [[8, 1, -1], [1, -7, 2], [2, 1, 9]];
let vetorB = [8, -4, 12];
let taxaDeErro = 0.0005;
let numeroMaxIteracoes = 100000;
const solucao = gaussJacobi(matrizA, vetorB, taxaDeErro, numeroMaxIteracoes);

console.log("\nO vetor solução da última iteração é:\n");
console.log(solucao);

console.log(verificaSistemaLinear(matrizA, solucao, vetorB));
