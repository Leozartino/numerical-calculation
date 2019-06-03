function verificaInte(A, b, taxaDeErro, numeroMaxIteracoes, chuteInicial) {
  let TesteCondicional = null;
  if (Array.isArray(A)) {
    for (let i = 0; i < A.length; i++) {
      for (let j = 0; j < A.length; j++) {
        if (typeof A[i][j] != "number") {
          console.log(
            `O valor: ${A[i][j]} não é um valor válido para a posição na coluna`
          );
          TesteCondicional = true;
        }
      }
    }
  } else if (!Array.isArray(A)) {
    console.log("Erro! Informe um array válido!");
    TesteCondicional = true;
  }

  if (Array.isArray(b)) {
    for (let x = 0; x < A.length; x++) {
      if (typeof b[x] != "number") {
        console.log(
          `O valor: ${b[x]} não é um valor válido para a posição na coluna!`
        );
        TesteCondicional = true;
      }
    }
  } else if (!Array.isArray(b)) {
    console.log("Informe um array válido para o vetorB, por favor!");
    TesteCondicional = true;
  }

  if (typeof taxaDeErro != "number") {
    console.log("Informe um válor númerico para taxaDeErro, por favor!");
    TesteCondicional = true;
  }

  if (typeof numeroMaxIteracoes != "number") {
    console.log(
      "Informe um válor númerico para numeroMaxIteracoes, por favor!"
    );
    TesteCondicional = true;
  }

  if (!Array.isArray(chuteInicial)) {
    console.log("Informe um array para chuteInicial, por favor!");
    TesteCondicional = true;
  } else if (Array.isArray(chuteInicial)) {
    for (let y = 0; y < A.length; y++) {
      if (typeof chuteInicial[y] != "number") {
        console.log(`O valor: ${chuteInicial[y]} não é um valor válido!`);
        TesteCondicional = true;
      }
    }
  }
  if (TesteCondicional) {
    return 0;
  }

  return 1;
}

module.exports = {
  verificaInte
};
