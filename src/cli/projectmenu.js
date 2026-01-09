import readline from 'readline-sync';
import { addProduto, listProdutos, updateProduto, deleteProduto, searchProdutos } from '../services/product.js';

export const adicionarProduto = (estoque) => {
    let continuar = true;
    while (continuar) {
        const nome = readline.question('Nome: ').trim();
        const categoria = readline.question('Categoria: ').trim();
        const quantidade = readline.questionInt('Quantidade: ');
        const preco = readline.questionFloat('Preço: ');
        
        if (!nome || !categoria) {
            console.log('\nErro: Nome e categoria não podem estar vazios.');
            continuar = false;
            break;
        }
        
        try {
            const produto = addProduto(estoque, { nome, categoria, quantidade, preco });
            console.log('\nProduto adicionado com sucesso:');
            console.table([produto], ['id', 'nome', 'categoria', 'quantidade', 'preco']);
            
            const continuarResposta = readline.question('\nDeseja adicionar outro produto? (s/n): ').toLowerCase();
            if (continuarResposta !== 's') {
                continuar = false;
            }
        } catch (error) {
            console.log('\nErro ao adicionar produto:', error.message);
            continuar = false;
        }
    }
};

export const listarProdutos = (estoque) => {
    const produtos = listProdutos(estoque);
    console.log('======================  Produtos disponíveis no estoque  ======================= ');
    console.table(produtos, ['id', 'nome', 'categoria', 'quantidade', 'preco']);

    const continuarResposta = readline.question('ENTER para voltar ao menu...');
    if (continuarResposta !== '') {
        return;
    }
};

export const atualizarProduto = (estoque) => {
    console.table(estoque, ['id', 'nome', 'categoria', 'quantidade', 'preco']);
    const id = readline.questionInt('ID do produto a ser atualizado: ');
    const novonome = readline.question('Novo NOME (deixe vazio para não alterar): ');
    const novaCategoria = readline.question('Nova CATEGORIA (deixe vazio para não alterar): ');
    const novaQuantidadeStr = readline.question('Nova QUANTIDADE (deixe vazio para não alterar): ');
    const novoPrecoStr = readline.question('Novo PREÇO (deixe vazio para não alterar): ');
    
    //adicionar ao já existente
    const atualizar = {};
    if (novonome) atualizar.nome = novonome;
    if (novaCategoria) atualizar.categoria = novaCategoria;
    if (novaQuantidadeStr) atualizar.quantidade = parseInt(novaQuantidadeStr, 10);
    if (novoPrecoStr) atualizar.preco = parseFloat(novoPrecoStr);

    try {
        const produtoAtualizado = updateProduto(estoque, id, atualizar);
        console.log('\nProduto atualizado com sucesso:', produtoAtualizado);
    } catch (error) {
        console.log('\nErro ao atualizar produto:', error.message);
    }
};

export const excluirProduto = (estoque) => {
    console.table(estoque, ['id', 'nome', 'categoria', 'quantidade', 'preco']);
    const id = readline.questionInt('ID do produto a ser excluído: ');
   
    const produto = estoque.find(p => p.id === id);
    if (!produto) {
        console.log('\nProduto não encontrado.');
        return;
    }

    console.log(`\nVocê está prestes a excluir o produto: ID: ${produto.id} | Nome: ${produto.nome} | Categoria: ${produto.categoria} | Preço: R$ ${produto.preco}`);
    const confirmarResposta = readline.question('\nTem certeza que deseja excluir este produto? (s/n): ').toLowerCase();
    if (confirmarResposta !== 's') {
        console.log('\nOperação de exclusão cancelada.');
        return;
    }
    try {
        const produtoExcluido = deleteProduto(estoque, id);
        console.log('\nProduto excluído com sucesso');
    } catch (error) {
        console.log('\nErro ao excluir produto:', error.message);
    }
};

export const buscarProduto = (estoque) => {
    let continuar = true;
    while (continuar) {
        const buscar = readline.question('\nDigite o ID ou Nome do produto a ser buscado: ');
        try {
            const produtoEncontrado = searchProdutos(estoque, buscar);
            if (produtoEncontrado) {
                console.log('\nProduto encontrado:');
                console.table([produtoEncontrado], ['id', 'nome', 'categoria', 'quantidade', 'preco']);
            } else {
                console.log('\nProduto não encontrado.');
            }
        } catch (error) {
            console.log('\nErro ao buscar produto:', error.message);
        }
        const continuarResposta = readline.question('\nDeseja buscar outro produto? (s/n): ').toLowerCase();
        if (continuarResposta !== 's') {
            continuar = false;
        }
    }
};