import { parse } from 'uuid';
import { salvarEstoque } from '../repositories/estoquerepository.js';

export const addProduto = (estoque,{nome, categoria, quantidade, preco}) => {
    if (!nome || !categoria || quantidade == null || preco == null) {
        throw new Error('Todos os campos são obrigatórios: nome, categoria, quantidade, preco.');
    }

    // Gerar ID numérico sequencial
    let proximoId;
    if (estoque.length > 0) {
        proximoId = Math.max(...estoque.map(p => p.id)) + 1;
    } else {
        proximoId = 1;
    }
    const item = {
        id: proximoId,
        nome: nome.trim(),
        categoria: categoria.trim(),
        quantidade,
        preco: parseFloat(preco.toFixed(2))
    };

    // evitar produtos com nomes duplicados
    const produtoExistente = estoque.find(item => item.nome.toLowerCase() === nome.toLowerCase());
    if (produtoExistente) {
        throw new Error('Produto já existente! Para atualizar utilize a opção 3.');
    }
    
    estoque.push(item);
    salvarEstoque(estoque);
    return item;

}

export const listProdutos = (estoque) => {
    return estoque;
}

export const updateProduto = (estoque, id, atualizar) => {
    const produtoup = estoque.find(produto => produto.id === id);
    if (!produtoup) {
        throw new Error('Produto não encontrado.');
    }

    Object.assign(produtoup, atualizar);
    salvarEstoque(estoque);
    return produtoup;
}

export const deleteProduto = (estoque, id) => {
    const index = estoque.findIndex(produto => produto.id === id);
    if (index === -1) {
        throw new Error('Produto não encontrado.');
    }

    const [produtoRemovido] = estoque.splice(index, 1);
    salvarEstoque(estoque);
    return produtoRemovido;
}

export const searchProdutos = (estoque, termo) => {
    if (!termo?.trim()) return [];
    
    const termoLower = termo.toLowerCase().trim();
    const termoNumerico = parseInt(termo);
    
    return estoque.filter(produto => 
        produto.id === termoNumerico || 
        produto.nome.toLowerCase().includes(termoLower) || 
        produto.categoria.toLowerCase().includes(termoLower)
    );
}
