
// Inicializar o menu lateral
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, { edge: 'left' });
});


// Função para formatar a data de acordo com o padrão "dd-MM-yyyy"
function formatData(data) {
    const parts = data.split("-");
    if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return data;
}        


//total de pedidos por cliente no frontend 
async function fetchDataPedidosPorCliente(pageNumber) {
    const url = `https://comanda-api.onrender.com/api/v1/tabela/pedidos-cliente?page=${pageNumber || 1}`; // URL com parâmetro de página
    //const url = `http://localhost:8080/api/v1/tabela/pedidos-cliente?page=${pageNumber || 1}`; // URL com parâmetro de página

    try {
        const response = await fetch(url, { method: 'GET', mode: 'cors' });

        if (!response.ok) {
            throw new Error('Erro na solicitação. Status: ' + response.status);
        }

        const data = await response.json();
        const tbody = document.getElementById("pedidos-por-cliente");

        // Limpa o conteúdo atual da tabela
        tbody.innerHTML = '';

        // Define a quantidade de itens por página
        const itemsPerPage = 10;

        // Calcula o início e o fim da página atual com base no número da página
        const pageStart = (pageNumber - 1) * itemsPerPage;
        const pageEnd = pageStart + itemsPerPage;

        // Itera pelos resultados da página atual e preenche a tabela
        data.slice(pageStart, pageEnd).forEach(item => {
            const row = tbody.insertRow();
            const idPedidoCell = row.insertCell(0);
            const dataPedidoCell = row.insertCell(1);
            const clienteNomeCell = row.insertCell(2);
            const clienteSobrenomeCell = row.insertCell(3);
            const dataPagamentoCell = row.insertCell(4);
            const identificadorPedidoCell = row.insertCell(5);

            idPedidoCell.textContent = item.idPedido;
            dataPedidoCell.textContent = formatData(item.dataPedido);
            clienteNomeCell.textContent = item.clienteNome;
            clienteSobrenomeCell.textContent = item.clienteSobrenome;
            dataPagamentoCell.textContent = formatData(item.dataPagamento);
            identificadorPedidoCell.textContent = item.identificadorPedido;
        });

        // Adicione a navegação da página
        createPagination(data.length, pageNumber);

    } catch (error) {
        console.error('Erro: ' + error);
        const tbody = document.getElementById("pedidos-por-cliente");
        const row = tbody.insertRow();
        const errorCell = row.insertCell(0);
        errorCell.colSpan = 6;
        errorCell.textContent = "Erro na solicitação";
    }
}

// Função para criar a navegação da página
function createPagination(totalItems, currentPage) {
    const totalPages = Math.ceil(totalItems / 10);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('waves-effect');
        if (i === currentPage) {
            pageItem.classList.add('active');
        }
        const pageLink = document.createElement('a');
        pageLink.href = 'javascript:void(0)';
        pageLink.textContent = i;
        pageLink.addEventListener('click', () => {
            fetchDataPedidosPorCliente(i);
        });
        pageItem.appendChild(pageLink);
        pagination.appendChild(pageItem);
    }
}

window.addEventListener("load", () => {
    fetchDataPedidosPorCliente(1); // Carregando a página 1 por padrão
});

