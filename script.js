let listaPesos = [];
let listaCalorias = [];

const parentInput = document.getElementById("parentInput");
const calorias = document.getElementById("calorias");
const peso = document.getElementById("peso");

function add_input() {
    let input_peso = document.createElement('input');
    let input_cal = document.createElement('input');
    input_peso.type = 'number';
    input_cal.type = 'number';
    input_cal.placeholder = 'calorias';
    input_peso.placeholder = 'peso';
    input_peso.classList.add('pesoE');
    input_cal.classList.add('calE');

    // Agregar un salto de línea después de los inputs existentes
    parentInput.appendChild(document.createElement('br'));

    parentInput.appendChild(input_peso);
    parentInput.appendChild(input_cal);

}
function combinations(arr1, arr2) {
  const combos = [];

  function combineElements(index, currentCombo) {
    if (currentCombo.length === arr1.length) {
      const comboObj = currentCombo.map((element, idx) => ({
        peso: element,
        calorias: arr2[idx],
        nombre: 'E' + (idx + 1),
      }));
      combos.push(comboObj);
      return;
    }

    if (index >= arr1.length && index >= arr2.length) {
      return;
    }

    if (index < arr1.length) {
      combineElements(index + 1, [
        ...currentCombo,
        arr1[index]
      ]);
    }
  }

  combineElements(0, []);

  return combos;
}



function calcular() {
    const pesoElems = document.querySelectorAll('.pesoE');
    const calElems = document.querySelectorAll('.calE');

    for (let i = 0; i < pesoElems.length; i++) {
        listaPesos.push(Number(pesoElems[i].value));
        listaCalorias.push(Number(calElems[i].value));
    }
    const elementos = [
        {
            peso: 5,
            calorias: 3,
            nombre: 'E1'
        },
        {
            peso: 3,
            calorias: 5,
            nombre: 'E2'
        },
        {
            peso: 5,
            calorias: 2,
            nombre: 'E3'
        },
        {
            peso: 1,
            calorias: 8,
            nombre: 'E4'
        }, {
            peso: 2,
            calorias: 3,
            nombre: 'E5'
        },
    ];


    const objCombo = combinations(listaPesos,listaCalorias);
    console.log("Elementos:", objCombo);
    console.log("Elementos2:", objCombo);


    const elementosOptimos = mochila(peso.value, objCombo);
    document.getElementById('resultadoOptimo').innerText = "Elementos óptimos: " + elementosOptimos.toString();

}


function sumarValores(array) {
    return array.reduce((total, valor) => total + valor, 0);

}
function mochila(capacidad, elementos) {
    const n = elementos[0].length; // Obtener la cantidad de elementos del subarray (posición 0)
    const matriz = Array.from({
        length: n + 1
    }, () => Array(capacidad + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= capacidad; j++) {
            const pesoElemento = elementos[0][i - 1].peso; // Acceder al peso del elemento en el subarray (posición 0)
            const caloriasElemento = elementos[0][i - 1].calorias; // Acceder a las calorías del elemento en el subarray (posición 0)

            if (pesoElemento <= j) {
                matriz[i][j] = Math.max(matriz[i - 1][j], caloriasElemento + matriz[i - 1][j - pesoElemento]);
            } else {
                matriz[i][j] = matriz[i - 1][j];
            }
        }
    }

    const conjuntoOptimo = [];
    let i = n;
    let j = capacidad;

    while (i > 0 && j > 0) {
        if (matriz[i][j] !== matriz[i - 1][j]) {
            conjuntoOptimo.unshift('E' + i);
            j -= elementos[0][i - 1].peso; // Acceder al peso del elemento en el subarray (posición 0)
        }
        i--;
    }

    return conjuntoOptimo;
}


// Ejemplo de uso
