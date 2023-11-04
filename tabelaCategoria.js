
// Inicializar o menu lateral
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, { edge: 'left' });
});


// Função para preencher a tabela com os itens da página atual
function preencherTabelaProdutos(data, pageNumber, tbody) {
    // Define a quantidade de itens por página
    const itensPorPagina = 10;
    const pageStart = (pageNumber - 1) * itensPorPagina;
    const pageEnd = pageStart + itensPorPagina;

    tbody.innerHTML = '';

    // Itera pelos resultados da página atual e preenche a tabela
    data.slice(pageStart, pageEnd).forEach(item => {
        const row = tbody.insertRow();
        const idProdutoCell = row.insertCell(0);
        const nomeProdutoCell = row.insertCell(1);
        const tipoProdutoCell = row.insertCell(2);
        const categoriaProdutoCell = row.insertCell(3);

        idProdutoCell.textContent = item.idProduto;
        nomeProdutoCell.textContent = item.nomeProduto;
        tipoProdutoCell.textContent = item.tipoProduto;
        categoriaProdutoCell.textContent = item.categoriaProduto;
    });
}

// Função para criar a navegação da página de produtos
function createPaginationProdutos(data, tbody, pagination) {
    // Define a quantidade de itens por página
    const itensPorPagina = 10;
    const numPaginas = Math.ceil(data.length / itensPorPagina);

    // Preenche a primeira página da tabela
    preencherTabelaProdutos(data, 1, tbody);

    // Cria os links de paginação
    for (let i = 1; i <= numPaginas; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('waves-effect');
        if (i === 1) {
            pageItem.classList.add('active');
        }
        const pageLink = document.createElement('a');
        pageLink.href = 'javascript:void(0)';
        pageLink.textContent = i;
        pageLink.addEventListener('click', () => {
            preencherTabelaProdutos(data, i, tbody);
            const currentPage = pagination.querySelector('.active');
            currentPage.classList.remove('active');
            pageItem.classList.add('active');
        });
        pageItem.appendChild(pageLink);
        pagination.appendChild(pageItem);
    }
}

//total de produtos por tipo e categoria no frontend
async function fetchDataProdutosTipoCategoria(pageNumber) {
    const url = `https://comanda-api.onrender.com/api/v1/tabela/produtos-tipo-categoria?page=${pageNumber || 1}`; // URL com parâmetro de página
    //const url = `http://localhost:8080/api/v1/tabela/produtos-tipo-categoria?page=${pageNumber || 1}`; // URL com parâmetro de página

    try {
        const response = await fetch(url, { method: 'GET', mode: 'cors' });

        if (!response.ok) {
            throw new Error('Erro na solicitação. Status: ' + response.status);
        }

        const data = await response.json();
        const tbody = document.getElementById("produtos-tipo-categoria");
        const pagination = document.getElementById("pagination-produtos-tipo-categoria");

        createPaginationProdutos(data, tbody, pagination);
    } catch (error) {
        console.error('Erro: ' + error);
        const tbody = document.getElementById("produtos-tipo-categoria");
        const row = tbody.insertRow();
        const errorCell = row.insertCell(0);
        errorCell.colSpan = 4;
        errorCell.textContent = "Erro na solicitação";
    }
}

window.addEventListener("load", () => {
    fetchDataProdutosTipoCategoria(1); // Carregando a página 1 por padrão
});
