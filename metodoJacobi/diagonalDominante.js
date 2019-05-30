function diagonalD(A) {
  const tamanhoMatriz = A.length;

  for (let i = 0; i < tamanhoMatriz; i++) {
    let somaAdjacente = 0;

    for (let j = 0; j < tamanhoMatriz; j++) {
      if (i != j) {
        somaAdjacente += Math.abs(A[i][j]);
      }
      if (j === tamanhoMatriz - 1) {
        if (!(Math.abs(A[i][i]) > somaAdjacente)) {
          return `A Matriz NÃO tem diagonal dominante!\nLogo, pode ser ou não convergente.\n`;
        }
      }
    }
  }
  return "A Matriz tem diagonal dominante e necessariamente é convergente! ";
}

module.exports = { diagonalD };
