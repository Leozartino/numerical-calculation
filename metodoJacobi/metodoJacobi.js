const math = require("mathjs");
const verificaSistemaLinear = require("./verificaSistema")
  .verificaSistemaLinear;
const diagonalD = require("./diagonalDominante").diagonalD;
const verificaEntradas = require("./verificaIntegridade").verificaEntradas;

function gaussJacobi(A, b, taxaDeErro, numeroMaxIteracoes, chuteInicial) {
  const resp = verificaEntradas(
    A,
    b,
    taxaDeErro,
    numeroMaxIteracoes,
    chuteInicial
  );
  //Deu bom!
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
      /*     console.log(
        Math.abs(math.norm(solucaoAtual) - math.norm(solucaoAnterior))
      ); */
      if (
        Math.abs(math.norm(solucaoAtual) - math.norm(solucaoAnterior)) <=
        taxaDeErro
      ) {
        criterioDeParada = true;
      } else {
        solucaoAnterior = solucaoAtual.slice(0);
      }
      contadorDeIteracoes += 1;

      if (contadorDeIteracoes === numeroMaxIteracoes && !criterioDeParada) {
        //Numero de iterações chega ao maximo, mas criterio nao é satisfeito
        console.log("Tolerância não atingida!");
      } else if (
        //Numero de iterações é atingido e cirterio de parada é satisfeito
        //Ou só quando o critério de parada é satisfeito independente do numero de iterações
        (contadorDeIteracoes === numeroMaxIteracoes && criterioDeParada) ||
        criterioDeParada
      ) {
        console.log(
          `Tolerância atingida: ${Math.abs(
            math.norm(solucaoAtual) - math.norm(solucaoAnterior)
          )} com: ${contadorDeIteracoes} iterações feitas`
        );
      }
    }

    return solucaoAtual;

    //Deu ruim!
  } else if (resp === 0) {
    return resp;
  }
}

const matrizA = [
  [3, 1, 0, 0, 0],
  [1, 3, 1, 0, 0],
  [0, 1, 3, 1, 0],
  [0, 0, 1, 3, 1],
  [0, 0, 0, 1, 3]
];
const vetorB = [5, 8, 8, 11, 6];
const taxaDeErro = 0.000001;
const numeroMaxIteracoes = 100; //30 iterações para atingir
const chuteInicial = [0, 0, 0, 0, 0];

const solucao = gaussJacobi(
  matrizA,
  vetorB,
  taxaDeErro,
  numeroMaxIteracoes,
  chuteInicial
);

if (Array.isArray(solucao)) {
  console.log("\nO vetor solução da última iteração é:\n");
  console.log(solucao);
  console.log(verificaSistemaLinear(matrizA, solucao, vetorB));
} else {
  console.log("Sem solução");
}

/* Teste 01 e 02: Testar com 10 iterações inicialmente e depois com 100
const matrizA = [
  [3, 1, 0, 0, 0],
  [1, 3, 1, 0, 0],
  [0, 1, 3, 1, 0],
  [0, 0, 1, 3, 1],
  [0, 0, 0, 1, 3]
];
const vetorB = [5, 8, 8, 11, 6];
const taxaDeErro = 0.000001;
const numeroMaxIteracoes = 100; //30 iterações para atingir
const chuteInicial = [0, 0, 0, 0, 0];

 */

/* Teste 03:

const matrizA = [[10, 2, 0, 0], [3, 10, 4, 0], [0, 1, 7, 5], [0, 0, 3, 4]];
const vetorB = [3, 4, 5, 6];
const taxaDeErro = 0.000001;
const numeroMaxIteracoes = 100; //50 antigi
const chuteInicial = [0, 0, 0, 0];
 */

/* Teste 4:

const matrizA = [
  [1, 1, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0],
  [0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0],
  [0, 0, 0, 2, 1, 2],
  [0, 0, 0, 0, 1, 1]
];
const vetorB = [2, 7, 6, 13, 8, 8];
const taxaDeErro = 0.000001;
const numeroMaxIteracoes = 20;
const chuteInicial = [0, 0, 0, 0, 0, 0];

 */

/* Teste 5:

 const matrizA = [[3, 1, -1] , [-1, -4, 1], [1, -2, -5]];
 const vetorB = [2, -10, 10];
 const taxaDeErro = 0.000001;
 const numeroMaxIteracoes = 100;
 const chuteInicial = [0, 0, 0];
 
 */
