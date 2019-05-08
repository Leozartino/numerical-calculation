let matriz = [[3, 5, 6], [7, 8, 9], [10, 2, 4]];
let b = [2, -3, 4];

function verificaPivo(A) {
  let maiorValor,
    linhaP,
    antigaLinha = null;
  const A = A;

  for (i in A) {
    for (j in A) {
      maiorValor = A[i][i];
      antigaLinha = i;
      if (maiorValor > A[j][i]) {
        maiorValor = A[j][i];
        linhaP = j;
      }
    }
    if (maiorValor != A[i][i]) {
      A = trocaLinha(A, linhaP, antigaLinha);
    }
  }
}

function trocaLinha(A, linhaP, antigaLinha) {
  let aux = A[antigaLinha];
  A[antigaLinha] = A[linhaP];
  A[linhaP] = aux;
  return A;
}
