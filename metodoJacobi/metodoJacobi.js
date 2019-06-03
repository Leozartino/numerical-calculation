const math = require("mathjs");
const verificaSistemaLinear = require("./verificaSistema")
  .verificaSistemaLinear;
const diagonalD = require("./diagonalDominante").diagonalD;
const verificaInte = require("./verificaIntegridade").verificaInte;

function gaussJacobi(A, b, taxaDeErro, numeroMaxIteracoes, chuteInicial) {
  const resp = verificaInte(A, b, taxaDeErro, numeroMaxIteracoes, chuteInicial);
  if (resp === 1) {
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
  } else if (resp === 0) {
    return resp;
  }
}

let matrizA = [[5, 3, -2], [10, 9, 2], [2, 6, 9]];
let vetorB = ["5", -5, -6];
let taxaDeErro = 0;
let numeroMaxIteracoes = 100000;
const solucao = gaussJacobi(matrizA, vetorB, taxaDeErro, numeroMaxIteracoes, [
  0,
  0,
  0
]);

if (Array.isArray(solucao)) {
  console.log("\nO vetor solução da última iteração é:\n");
  console.log(solucao);
  console.log(verificaSistemaLinear(matrizA, solucao, vetorB));
} else {
  console.log("Sem solução");
}
