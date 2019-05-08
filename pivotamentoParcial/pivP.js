let matriz = [[3, 5, 6, 2], [7, 8, 9, -3], [10, 2, 4, 4]];
let b = [2, -3, 4];

function verificaPivo(A) {
  let maiorValor,
    linhaP,
    antigaLinha = null;
  let M = A;
  let mIK;
  for (i in A) {
    maiorValor = A[i][i];
    for (j in A) {
      antigaLinha = i;
      if (maiorValor < A[j][i]) {
        maiorValor = A[j][i];
        linhaP = j;
      }
    }
    if (maiorValor != A[i][i] && i < A.length - 1) {
      M = trocaLinha(A, linhaP, antigaLinha);
    }
    for (let a = i + 1; a < M.length; a++) {
      mIK = M[a][i] / maiorValor;
      for (let b = i + 1; b < M[i].length; b++) {
        M[a][b] = M[a][b] - mIK * M[i][b];
        M[a][i] = 0;
      }
    }
  }
  //return M;
}

function trocaLinha(A, linhaP, antigaLinha) {
  let aux = A[antigaLinha];
  A[antigaLinha] = A[linhaP];
  A[linhaP] = aux;
  return A;
}
//console.log(trocaLinha(matriz, 2, 0));

verificaPivo(matriz);
