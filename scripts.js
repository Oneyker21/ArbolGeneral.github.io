class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
    }
}

function parseTree(input) {
    const stack = [];
    let currentNode = null;
    let valueBuffer = '';

    for (const char of input) {
        if (char === '(') {
            if (currentNode !== null) {
                stack.push(currentNode);
            }
            currentNode = new TreeNode(null);
            valueBuffer = '';
        } else if (char === ')') {
            if (stack.length > 0) {
                const parent = stack.pop();
                parent.children.push(currentNode);
                currentNode = parent;
            }
            if (valueBuffer !== '') {
                currentNode.value = valueBuffer;
                valueBuffer = '';
            }
        } else {
            valueBuffer += char;
        }
    }

    return currentNode;
}

function calcularCaminoInternoExterno(root) {
    function calcularCaminoInterno(node) {
        if (!node) return 0;
        let caminoInterno = 0;
        for (const child of node.children) {
            caminoInterno += calcularCaminoInterno(child) + 1;
        }
        return caminoInterno;
    }

    function calcularCaminoExterno(node) {
        if (!node) return 0;
        if (!node.children.length) return 0;
        let caminoExterno = 0;
        for (const child of node.children) {
            caminoExterno += calcularCaminoExterno(child) + 1;
        }
        return caminoExterno;
    }

    function contarNodos(node) {
        if (!node) return 0;
        let count = 1;
        for (const child of node.children) {
            count += contarNodos(child);
        }
        return count;
    }

    const lci = calcularCaminoInterno(root);
    const lce = calcularCaminoExterno(root);
    const totalNodos = contarNodos(root);
    const mlci = lci / totalNodos;
    const mlce = lce / totalNodos;

    return { lci, lce, mlci, mlce };
}

document.getElementById('calcularButton').addEventListener('click', () => {
    const input = document.getElementById('arbolInput').value;
    const root = parseTree(input);
    const resultado = calcularCaminoInternoExterno(root);
    document.getElementById('lci').textContent = `LCI: ${resultado.lci}`;
    document.getElementById('lce').textContent = `LCE: ${resultado.lce}`;
    document.getElementById('mlci').textContent = `MLCI: ${resultado.mlci}`;
    document.getElementById('mlce').textContent = `MLCE: ${resultado.mlce}`;
});

document.getElementById('limpiarButton').addEventListener('click', () => {
    document.getElementById('arbolInput').value = '';
    document.getElementById('lci').textContent = '';
    document.getElementById('lce').textContent = '';
    document.getElementById('mlci').textContent = '';
    document.getElementById('mlce').textContent = '';
});
