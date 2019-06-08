function verificaEntradas(A, b, taxaDeErro, numeroMaxIteracoes, chuteInicial) {
  let erro = false;
  if (Array.isArray(A)) {
    for (let i = 0; i < A.length; i++) {
      for (let j = 0; j < A.length; j++) {
        if (typeof A[i][j] != "number") {
          console.log(
            `O valor: ${A[i][j]} não é um valor válido para a posição na coluna`
          );
          erro = true;
        }
      }
    }
  } else if (!Array.isArray(A)) {
    console.log("Erro! Informe um array válido!");
    erro = true;
  }

  if (Array.isArray(b)) {
    for (let x = 0; x < A.length; x++) {
      if (typeof b[x] != "number") {
        console.log(
          `O valor: ${b[x]} não é um valor válido para a posição na coluna!`
        );
        erro = true;
      }
    }
  } else if (!Array.isArray(b)) {
    console.log("Informe um array válido para o vetorB, por favor!");
    erro = true;
  }

  if (typeof taxaDeErro != "number") {
    console.log("Informe um válor númerico para taxaDeErro, por favor!");
    erro = true;
  }

  if (typeof numeroMaxIteracoes != "number") {
    console.log(
      "Informe um válor númerico para numeroMaxIteracoes, por favor!"
    );
    erro = true;
  }

  if (!Array.isArray(chuteInicial)) {
    console.log("Informe um array para chuteInicial, por favor!");
    erro = true;
  } else if (Array.isArray(chuteInicial)) {
    for (let y = 0; y < A.length; y++) {
      if (typeof chuteInicial[y] != "number") {
        console.log(`O valor: ${chuteInicial[y]} não é um valor válido!`);
        erro = true;
      }
    }
  }
  //Se erro estiver setado como true, significa que pelo menos uma das condições verificadas são de entradas inválidas.
  if (erro) {
    return 0;
  }
  return 1; //Se retornar 1, significa que em nenhum momento o erro foi setado como true e por isso as entradas são válidas.
}

module.exports = {
  verificaEntradas
};
