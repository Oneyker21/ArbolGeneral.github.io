// Definición de la clase TreeNode para representar nodos en un árbol
class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = []; // Lista de hijos del nodo
    }
}

// Función para analizar la cadena de entrada y construir un árbol
function parseTree(input) {
    const stack = []; // Pila para llevar un seguimiento de los nodos
    let currentNode = null; // Nodo actual
    let valueBuffer = ''; // Búfer para construir el valor del nodo

    for (const char of input) {
        if (char === '(') {
            if (currentNode !== null) {
                stack.push(currentNode); // Si hay un nodo actual, lo agregamos a la pila
            }
            currentNode = new TreeNode(null); // Creamos un nuevo nodo
            valueBuffer = ''; // Reiniciamos el búfer de valor
        } else if (char === ')') {
            if (stack.length > 0) {
                const parent = stack.pop(); // Obtenemos el nodo padre de la pila
                parent.children.push(currentNode); // Agregamos el nodo actual como hijo del padre
                currentNode = parent; // Establecemos el nodo actual como el padre
            }
            if (valueBuffer !== '') {
                currentNode.value = valueBuffer; // Asignamos el valor del nodo actual
                valueBuffer = ''; // Reiniciamos el búfer de valor
            }
        } else {
            valueBuffer += char; // Construimos el valor del nodo carácter por carácter
        }
    }

    return currentNode; // Devolvemos el nodo raíz del árbol
}

// Función para calcular el camino interno y externo en el árbol
function calcularCaminoInternoExterno(root) {
    // Función para calcular el camino interno de un nodo y sus hijos
    function calcularCaminoInterno(node) {
        if (!node) return 0;
        let caminoInterno = 0;
        for (const child of node.children) {
            caminoInterno += calcularCaminoInterno(child) + 1;
        }
        return caminoInterno;
    }

    // Función para calcular el camino externo de un nodo y sus hijos
    function calcularCaminoExterno(node) {
        if (!node) return 0;
        if (!node.children.length) return 0;
        let caminoExterno = 0;
        for (const child of node.children) {
            caminoExterno += calcularCaminoExterno(child) + 1;
        }
        return caminoExterno;
    }

    // Función para contar el número de nodos en el árbol
    function contarNodos(node) {
        if (!node) return 0;
        let count = 1;
        for (const child of node.children) {
            count += contarNodos(child);
        }
        return count;
    }

    // Calculamos los valores requeridos
    const lci = calcularCaminoInterno(root);
    const lce = calcularCaminoExterno(root);
    const totalNodos = contarNodos(root);
    const mlci = lci / totalNodos;
    const mlce = lce / totalNodos;

    return { lci, lce, mlci, mlce }; // Devolvemos los resultados
}

// Función para mostrar los resultados en la página web
function mostrarResultados(resultado) {
    const lciElement = document.getElementById('lci');
    const lceElement = document.getElementById('lce');
    const mlciElement = document.getElementById('mlci');
    const mlceElement = document.getElementById('mlce');

    lciElement.textContent = `LCI: ${resultado.lci}`;
    lceElement.textContent = `LCE: ${resultado.lce}`;
    mlciElement.textContent = `MLCI: ${resultado.mlci}`;
    mlceElement.textContent = `MLCE: ${resultado.mlce}`;
}

// Función para mostrar los resultados con animación
function mostrarResultadosConAnimacion() {
    const resultadosContainer = document.getElementById('resultados');
    resultadosContainer.classList.remove('hidden'); // Mostramos el contenedor de resultados

    // Agregamos una animación de despliegue
    setTimeout(() => {
        resultadosContainer.style.opacity = '1';
        resultadosContainer.style.height = 'auto';
        const container = document.querySelector('.container');
        container.classList.add('expanded'); // Expandimos el contenedor principal
    }, 10);
}

// Función para limpiar los resultados con animación inversa
function limpiarResultadosConAnimacion() {
    const resultadosContainer = document.getElementById('resultados');
    resultadosContainer.style.opacity = '0';
    resultadosContainer.style.height = '0';
    const container = document.querySelector('.container');
    container.classList.remove('expanded'); // Contraemos el contenedor principal

    // Agregamos una animación de ocultación
    setTimeout(() => {
        resultadosContainer.classList.add('hidden'); // Ocultamos el contenedor de resultados
        document.getElementById('lci').textContent = '';
        document.getElementById('lce').textContent = '';
        document.getElementById('mlci').textContent = '';
        document.getElementById('mlce').textContent = '';
    }, 500); // El tiempo determina la velocidad de la animación
}

// Evento click para el botón "Calcular"
document.getElementById('calcularButton').addEventListener('click', () => {
    const input = document.getElementById('arbolInput').value;
    const root = parseTree(input); // Analizamos la entrada y construimos el árbol
    const resultado = calcularCaminoInternoExterno(root); // Calculamos los resultados

    mostrarResultados(resultado); // Mostramos los resultados
    mostrarResultadosConAnimacion(); // Mostramos los resultados con animación
});

// Evento click para el botón "Limpiar"
document.getElementById('limpiarButton').addEventListener('click', () => {
    limpiarResultadosConAnimacion(); // Limpiamos los resultados con animación inversa
});


