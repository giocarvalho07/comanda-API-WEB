// Inicializar o menu lateral
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, { edge: 'left' });
});


// Função para formatar a data no formato dd-MM-yyyy
function formatDate(date) {
    const parts = date.split("-");
    if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return date;
}    

// Total de pedidos por forma de pagamento no frontend com paginação
async function fetchDataPedidosPorFormaPagamento(pageNumber) {
    const url = `https://comanda-api.onrender.com/api/v1/tabela/pedidos-forma-pagamento?page=${pageNumber || 1}`; // URL com parâmetro de página
    //const url = `http://localhost:8080/api/v1/tabela/pedidos-forma-pagamento?page=${pageNumber || 1}`; // URL com parâmetro de página

    try {
        const response = await fetch(url, { method: 'GET', mode: 'cors' });

        if (!response.ok) {
            throw new Error('Erro na solicitação. Status: ' + response.status);
        }

        const data = await response.json();
        const tbody = document.getElementById("pedidos-por-forma-pagamento");

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
            const dataPagamentoCell = row.insertCell(1);
            const identificadorPedidoCell = row.insertCell(2);
            const formaPagamentoCell = row.insertCell(3);

            idPedidoCell.textContent = item.idPedido;
            dataPagamentoCell.textContent = formatDate(item.dataPagamento); // Formata a data
            identificadorPedidoCell.textContent = item.identificadorPedido;
            formaPagamentoCell.textContent = item.formaPagamento;
        });

        // Adicione a navegação da página
        createPagination(data.length, pageNumber, 'pedidos-por-forma-pagamento');

    } catch (error) {
        console.error('Erro: ' + error);
        const tbody = document.getElementById("pedidos-por-forma-pagamento");
        const row = tbody.insertRow();
        const errorCell = row.insertCell(0);
        errorCell.colSpan = 4;
        errorCell.textContent = "Erro na solicitação";
    }
}

// Função para criar a navegação da página
function createPagination(totalItems, currentPage, targetTableId) {
    const totalPages = Math.ceil(totalItems / 10);
    const pagination = document.getElementById("pagination-" + targetTableId);
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
            fetchDataPedidosPorFormaPagamento(i);
        });
        pageItem.appendChild(pageLink);
        pagination.appendChild(pageItem);
    }
}

window.addEventListener("load", () => {
    fetchDataPedidosPorFormaPagamento(1); // Carregando a página 1 por padrão
});