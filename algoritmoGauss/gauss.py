import numpy as np
import sys

def criaMatriz(linhas, colunas):
    Matriz = np.zeros((linhas, colunas) , dtype = float)

    for l in range(linhas):
        for c in range(colunas):
            
            while(True):
                try:
                    Matriz[l][c] = float(input(f'Inseir na linha {l+1} coluna{c+1} na matriz:'))
                    break
                except:
                    print('Dado invalido!! Insire um valor do tipo float')

            

    return Matriz        

def triangular (matriz):
    linhaDoPivo = 0
    contador = 0
    for i in range(0,len(matriz)):
        pivo = matriz[i][i]

        if pivo == 0:
            for j in range(1,len(matriz)):
                if matriz[j][i] != 0:
                    linhaDoPivo = j
                    break 
            for x in range(0, len(matriz[0])):         
                aux = matriz[i][x]
                matriz[i][x] = matriz[linhaDoPivo][x]
                matriz[linhaDoPivo][x] = aux

        for a in range (i+1, len(matriz)):
            mIK = (matriz[a][i]  / pivo)
            for b in range(i+1, len(matriz[0])):
                matriz[a][b] = matriz[a][b] - (mIK * matriz[i][b])
                matriz[a][i] = 0
            print(f'Passos do escalonamento:{contador}\n{matriz}\n')
            contador += 1    

    return matriz    
    
def retroSubstiuicao(matriz):
    numeroDeEquacoesInconi = len(matriz)
    vetorDeZeros = numeroDeEquacoesInconi * [0]
    for i in range(numeroDeEquacoesInconi - 1, -1, -1):
        soma = sum([matriz[i][j] * vetorDeZeros[j] for j in range(i+1, numeroDeEquacoesInconi)])
        if matriz[i][i] == 0:
            print('=*' * 15)
            print('\n      Sistema Impossível\n')
            print('=*' * 15)
            sys.exit()
        vetorDeZeros[i] = (matriz[i][numeroDeEquacoesInconi] - soma) / matriz[i][i]
        

    return vetorDeZeros

def resolve(A):
    print(f'\nA matriz original é :\n{A}')
    triangular(A)
    print(f'\nA matriz triangular é:\n{A}\n')
    x = retroSubstiuicao(A)
    print(f'Os coeficientes são: {x}')

entradaLinhas = int(input('\nInsira a quantidade de linhas:\n'))
entradaColunas = int(input('\nInsira a quantidade de colunas:\n'))
m = criaMatriz(entradaLinhas,entradaColunas)
resolve(m)
