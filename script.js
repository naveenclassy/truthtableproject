document.getElementById('truthTableForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const expression = document.getElementById('expression').value.trim();
    if (!expression) return;

    const tableBody = document.querySelector('#truthTable tbody');
    tableBody.innerHTML = ''; // Clear previous results

    // Generate all combinations of p, B, and C
    const combinations = [
        { p: 'T', q: 'T', r: 'T' },
        { p: 'T', q: 'T', r: 'F' },
        { p: 'T', q: 'F', r: 'T' },
        { p: 'T', q: 'F', r: 'F' },
        { p: 'F', q: 'T', r: 'T' },
        { p: 'F', q: 'T', r: 'F' },
        { p: 'F', q: 'F', r: 'T' },
        { p: 'F', q: 'F', r: 'F' }
    ];

    // Evaluate the expression for each combination
    combinations.forEach(({ p, q, r }) => {
        const result = evaluateExpression(expression, { p, q, r });
        const row = `<tr>
            <td>${p}</td>
            <td>${q}</td>
            <td>${r}</td>
            <td>${result}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    document.getElementById('truthTable').classList.remove('hidden');
});

function evaluateExpression(expression, values) {
    // Replace variables with their values
    const substituted = expression
        .replace(/p/g, values.p)
        .replace(/q/g, values.q)
        .replace(/r/g, values.r);

    // Evaluate logical operations
    try {
        var output = new Function('return ' + parseBooleanExpression(substituted))();
        if(output==true) return 'T';
        else return 'F';
    } catch (e) {
        return 'Invalid Expression';
    }
}

function parseBooleanExpression(expr) {
    // Replace operators with JavaScript equivalents
    // Replace true/false with T/F and handle NOT operation properly
    return expr
        .replace(/T/g, 'true')
        .replace(/F/g, 'false')
        .replace(/\!/g, 'not ')
        .replace(/\&/g, '&&')
        .replace(/\|/g, '||')
        .replace(/\^/g, '^')
        .replace(/not true/g, '!true')
        .replace(/not false/g, '!false');
}
