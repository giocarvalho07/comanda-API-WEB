// Inicializar o menu lateral
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, { edge: 'left' });
});



//total de pedidos no frontend 
async function fetchDataTotalPedidos() {
    const url = "https://comanda-api.onrender.com/api/v1/dashboard/total-pedidos";
    //const url = "http://localhost:8080/api/v1/dashboard/total-pedidos";

    try {
        const response = await fetch(url, { method: 'GET',mode: 'cors' });

        if (!response.ok) {
            throw new Error('Erro na solicitação. Status: ' + response.status);
        }

        const data = await response.json();

        document.getElementById("pedidos").textContent = "Número de Pedidos: " + data.totalPedidos;
    } catch (error) {
        console.error('Erro: ' + error);
        document.getElementById("pedidos").textContent = "Erro na solicitação";
    }
}

fetchDataTotalPedidos();



//total de pedidos por mês no frontend 
async function fetchDataTotalPedidosPorMes() {
    const url = "https://comanda-api.onrender.com/api/v1/dashboard/total-pedidos-por-mes";
    //const url = "http://localhost:8080/api/v1/dashboard/total-pedidos-por-mes";

    try {
        const response = await fetch(url, { method: 'GET', mode: 'cors' });

        if (!response.ok) {
            throw new Error('Erro na solicitação. Status: ' + response.status);
        }

        const data = await response.json();

        // Obtém o elemento onde desejamos exibir os resultados
        const pedidosPorMesElement = document.getElementById("pedidos-por-mes");

        // Limpa o conteúdo atual
        pedidosPorMesElement.innerHTML = '';

        // Itera pelos resultados e cria elementos para exibição
        data.forEach(item => {
            const paragraph = document.createElement('p');
            paragraph.textContent = `Mês: ${item.mes}, Total de Pedidos: ${item.totalPedidos}`;
            pedidosPorMesElement.appendChild(paragraph);
        });
    } catch (error) {
        console.error('Erro: ' + error);
        const pedidosPorMesElement = document.getElementById("pedidos-por-mes");
        pedidosPorMesElement.textContent = "Erro na solicitação";
    }
}
fetchDataTotalPedidosPorMes();



//total de pedidos por produtos no frontend 
async function fetchDataTotalProdutos() {
    const url = "https://comanda-api.onrender.com/api/v1/dashboard/total-pedidos-produtos";
    //const url = "http://localhost:8080/api/v1/dashboard/total-pedidos-produtos";

    try {
        const response = await fetch(url, { method: 'GET', mode: 'cors' });

        if (!response.ok) {
            throw new Error('Erro na solicitação. Status: ' + response.status);
        }

        const data = await response.json();

        // Obtém o elemento onde desejamos exibir os resultados
        const pedidosProdutosElement = document.getElementById("pedidos-produtos");

        // Exibe os resultados
        pedidosProdutosElement.innerHTML = `
            <p>Total de Pedidos: ${data.totalPedidos}</p>
            <p>Total de Produtos: ${data.totalProdutos}</p>
        `;
    } catch (error) {
        console.error('Erro: ' + error);
        const pedidosProdutosElement = document.getElementById("pedidos-produtos");
        pedidosProdutosElement.textContent = "Erro na solicitação";
    }
}
fetchDataTotalProdutos();



//total de pedidos por clientes no frontend 
async function fetchDataTotalClientes() {
    const url = "https://comanda-api.onrender.com/api/v1/dashboard/total-clientes";    
    //const url = "http://localhost:8080/api/v1/dashboard/total-clientes";

    try {
        const response = await fetch(url, { method: 'GET', mode: 'cors' });

        if (!response.ok) {
            throw new Error('Erro na solicitação. Status: ' + response.status);
        }

        const data = await response.json();

        // Obtém o elemento onde desejamos exibir os resultados
        const totalClientesElement = document.getElementById("total-clientes");

        // Exibe o resultado
        totalClientesElement.textContent = `Total de Clientes: ${data.totalClientes}`;
    } catch (error) {
        console.error('Erro: ' + error);
        const totalClientesElement = document.getElementById("total-clientes");
        totalClientesElement.textContent = "Erro na solicitação";
    }
}
fetchDataTotalClientes();



//total de pedidos por Forma de Pagamento no frontend 
async function fetchDataPedidosFormaPagamento() {
    const url = "https://comanda-api.onrender.com/api/v1/dashboard/pedidos-forma-pagamento";    
    //const url = "http://localhost:8080/api/v1/dashboard/pedidos-forma-pagamento"; // A URL base

    try {
        const response = await fetch(url, { method: 'GET', mode: 'cors' });

        if (!response.ok) {
            throw new Error('Erro na solicitação. Status: ' + response.status);
        }

        const data = await response.json();

        // Obtém o elemento onde deseja exibir os resultados
        const pedidosFormaPagamentoElement = document.getElementById("pedidos-forma-pagamento");

        // Limpa o conteúdo atual
        pedidosFormaPagamentoElement.innerHTML = '';

        // Itera pelos resultados e cria elementos para exibição
        data.forEach(item => {
            const paragraph = document.createElement('p');
            paragraph.textContent = `Forma de Pagamento: ${item.formaPagamento}, Total de Pedidos: ${item.quantidadePedidos}`;
            pedidosFormaPagamentoElement.appendChild(paragraph);
        });
    } catch (error) {
        console.error('Erro: ' + error);
        const pedidosFormaPagamentoElement = document.getElementById("pedidos-forma-pagamento");
        pedidosFormaPagamentoElement.textContent = "Erro na solicitação";
    }
}
fetchDataPedidosFormaPagamento();





