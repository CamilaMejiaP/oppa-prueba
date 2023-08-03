
from itertools import product, combinations

cantElementos = int(input("digite cantidad de elementos a usar: "))
calorias = int(input("Escriba cantidad minima de calorias: "))
peso = int(input("Escriba el peso maximo: "))
elementos = []
pesos = []
calorias_list = []


contador = 1
while(contador <= cantElementos):

    pesoE = int(input("Escriba el peso del elemento #" + str(contador) + ": "))
    calE = int(input("Escriba las calorías del elemento #" + str(contador) + ": "))
    elementos.append({'peso': pesoE, 'calorias': calE, 'nombre': 'E'+str(contador)})
    contador += 1

print("elementos de la lista:" + str(elementos))


def add_conjuntos(elementos,calorias_minimas, peso_maximo):
    elementos_optimos = []
    max_calorias = 0
    min_peso = float('inf')

    for r in range(1, len(elementos) + 1):
        for elemento in combinations(elementos, r):
            total_calorias = sum(elemento['calorias'] for elemento in elemento)
            total_peso = sum(elemento['peso'] for elemento in elemento)

            if total_calorias >= calorias_minimas and total_peso <= peso_maximo:
                if total_calorias > max_calorias or (total_calorias == max_calorias and total_peso < min_peso):
                    max_calorias = total_calorias
                    min_peso = total_peso
                    elementos_optimos = [elemento['nombre'] for elemento in elemento]

    return elementos_optimos


conjunto_optimo = add_conjuntos(elementos,calorias, peso)
print("elementos óptimos:", conjunto_optimo)






