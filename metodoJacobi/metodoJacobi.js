const math = require("mathjs");
const verificaSistemaLinear = require("./verificaSistema")
  .verificaSistemaLinear;
const diagonalD = require("./diagonalDominante").diagonalD;
const verificaEntradas = require("./verificaIntegridade").verificaEntradas;

function gaussJacobi(A, b, taxaDeErro, numeroMaxIteracoes, chuteInicial) {
  //Armazenado o retorno da função que verifica as entradas: 0 ou 1.
  const resp = verificaEntradas(
    A,
    b,
    taxaDeErro,
    numeroMaxIteracoes,
    chuteInicial
  );
  // Se retornou 1: Deu bom! Todas as entradas são válidas e por isso é executado
  //o método
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
        console.log(
          `Tolerância não atingida! Número de iterações realizadas: ${contadorDeIteracoes}`
        );
      } else if (
        //Numero de iterações é atingido e cirterio de parada é satisfeito
        //Ou só quando o critério de parada é satisfeito independente do numero de iterações
        (contadorDeIteracoes === numeroMaxIteracoes && criterioDeParada) ||
        criterioDeParada
      ) {
        console.log(
          `Tolerância atingida: ${Math.abs(
            math.norm(solucaoAtual) - math.norm(solucaoAnterior)
          )} Número de iterações realizadas: ${contadorDeIteracoes}`
        );
        console.log(verificaSistemaLinear(matrizA, solucaoAtual, vetorB));
      }
    }

    return solucaoAtual;

    //Se retornou 0: Deu ruim! Pelo menos uma entrada dos parametros passados
    //é invalida.
  } else if (resp === 0) {
    return resp;
  }
}

//Entradas do "usuário"
const matrizA = [[5, 1, -1], [-1, -4, 1], [1, -2, -5]];
const vetorB = [2, -10, 10];
const taxaDeErro = 0.000001;
const numeroMaxIteracoes = 100;
const chuteInicial = [0, 0, 0];

//Chamada da função que resolve pelo método de Jacobi
const solucao = gaussJacobi(
  matrizA,
  vetorB,
  taxaDeErro,
  numeroMaxIteracoes,
  chuteInicial
);

//Veirifcando se o que foi retornado  é um array, se for mostra as mensagens
//e resultados.
if (Array.isArray(solucao)) {
  console.log("\nO vetor solução da última iteração é:\n");
  console.log(solucao);
}
//Se o que for retornado não for um array, significa que deu erro nas entradas e etc.
else {
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
