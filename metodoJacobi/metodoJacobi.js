const math = require('mathjs')

function gaussJacobi(A, b, taxaDeErro, numeroMaxIteracoes) {
	let elementoIncognita = [];
	let x = [];
	for (let k = 0; k < b.length; k++)
	{
		elementoIncognita[k] = 0; //Math.floor((Math.random() * 10000) + 1);
	}


	let contadorDeIteracoes = 0;
	let continuar = true;

	while (continuar && contadorDeIteracoes < numeroMaxIteracoes) {
	    for (let i=0; i < b.length; i++) {
	        soma = 0;
	        for (let j = 0; j < b.length; j++) {
	            if (j != i) { 
	                soma = soma + A[i][j]*elementoIncognita[j]/A[i][i];
	            }
	            x[i] = (b[i]/A[i][i]) - soma;
	        }
		}
	    if (Math.abs(math.norm(x) - math.norm(elementoIncognita)) < taxaDeErro) {
	        continuar = false;
		} else {
	        elementoIncognita = x.slice(0);
		}
	    contadorDeIteracoes +=  1;
	}
    return elementoIncognita;
}

let matrizA = [[6,2,3],[2,8,0],[4,2,10]];
let vetorB = [-2, 4, 3];
let taxaDeErro = 0.001;
let numeroMaxIteracoes = 1000;
let resolucao = gaussJacobi(matrizA, vetorB, taxaDeErro, numeroMaxIteracoes)

console.log('\nSolução:\n');
console.log(gaussJacobi(matrizA, vetorB, taxaDeErro, numeroMaxIteracoes))