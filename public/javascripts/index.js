window.onload = () => {
    fetch('/list').then(response => response.json())
        .then(data => {
            displayTable(data);
        });

    document.getElementById('send').addEventListener('click', event => {
        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: document.getElementById('search').value,
            })
        }).then(response => response.json()).then(data => {
            displayTable(data);
        });
    });
};

function displayTable(data) {
    let htmlString = '';
    for (let i = 0; i < data.length; i++) {
        htmlString += `<tr><td>${data[i].id}</td><td>${data[i].owner}</td><td>${data[i].amount} €</td></tr>`;
    }
    document.getElementById('bankTable').innerHTML = htmlString;
}
