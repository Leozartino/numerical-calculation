function verificaSistemaLinear(matriz, vetorFinal, vetorB) {
  let vetorVerdade = [];
  for (let i = 0; i < matriz.length; i++) {
    let equacaoSoma = 0;
    for (let j = 0; j < matriz.length; j++) {
      equacaoSoma = matriz[i][j] * vetorFinal[j] + equacaoSoma;
      if (j === matriz.length - 1) {
        if (
          Math.trunc(equacaoSoma) != vetorB[i] &&
          Math.ceil(equacaoSoma) != vetorB[i]
        ) {
          return `${Math.ceil(equacaoSoma)} ou ${Math.trunc(
            equacaoSoma
          )} é diferente de ${vetorB[i]}. Logo a matriz não convergiu /:`;
        } else {
          vetorVerdade.push(equacaoSoma);
        }
      }
    }
  }
  return `\nTodos os valores covergiram.\nO sistema linear após a substituição é aproximadamente:\n${vetorVerdade}\nO vetor b que foi dado é:\n${vetorB}`;
}

module.exports = { verificaSistemaLinear };
