const math = require("mathjs");
const verificaSistema = require("./verificaSistema");
const verificaSistemaLinear = verificaSistema.verificaSistemaLinear;
const diagonalDominante = require("./diagonalDominante");
const diagonalD = diagonalDominante.diagonalD;

function gaussJacobi(A, b, taxaDeErro, numeroMaxIteracoes, chuteInicial) {
  console.log(diagonalD(A));

  let solucaoAnterior = [];
  let solucaoAtual = [];
  for (let k = 0; k < b.length; k++) {
    solucaoAnterior[k] = chuteInicial[k]; //Math.floor((Math.random() * 10000) + 1);
  }

  let contadorDeIteracoes = 0;
  let criterioDeParada = false;

  while (
    criterioDeParada === false &&
    contadorDeIteracoes < numeroMaxIteracoes
  ) {
    for (let i = 0; i < b.length; i++) {
      let soma = 0;
      for (let j = 0; j < b.length; j++) {
        if (j != i) {
          soma = soma + (A[i][j] * solucaoAnterior[j]) / A[i][i];
        }
        solucaoAtual[i] = b[i] / A[i][i] - soma;
      }
    }
    //console.log(Math.abs(math.norm(solucaoAtual) - math.norm(solucaoAnterior)));
    if (
      Math.abs(math.norm(solucaoAtual) - math.norm(solucaoAnterior)) <=
      taxaDeErro
    ) {
      criterioDeParada = true;
    } else {
      solucaoAnterior = solucaoAtual.slice(0);
    }
    contadorDeIteracoes += 1;
  }
  return solucaoAtual;
}

let matrizA = [[3, 2, -1], [1, 9, 2], [2, 8, 9]];
let vetorB = [-9, -2, 2];
let taxaDeErro = 0;
let numeroMaxIteracoes = 100000;
const solucao = gaussJacobi(matrizA, vetorB, taxaDeErro, numeroMaxIteracoes, [
  0,
  0,
  0
]);

console.log("\nO vetor solução da última iteração é:\n");
console.log(solucao);

console.log(verificaSistemaLinear(matrizA, solucao, vetorB));
