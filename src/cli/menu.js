import readline from "readline-sync";
import { adicionarProduto, listarProdutos, atualizarProduto, excluirProduto, buscarProduto } from "./projectmenu.js";

export const menu = () => {
    console.log(`
    ║--- Loja Ágil Store ---║

    1 → Adicionar produto
    2 → Listar produtos
    3 → Atualizar produto
    4 → Excluir produto
    5 → Buscar produto
    0 → Sair do programa
    `);
}

export const executarMenu = (estoque) => {
    let sair = false;
    while (!sair) {
        console.clear();
        menu();
        const opcao = readline.question('    Escolha uma opção: ');
        console.clear();

        switch (opcao) {
            case '1':
                console.log('\n→ Você selecionou: Adicionar produto\n');
                adicionarProduto(estoque);
                console.clear();
                break;
            case '2':
                console.log('\n→ Você selecionou: Listar produtos\n');
                listarProdutos(estoque);
                console.clear();
                break;
            case '3':
                console.log('\n→ Você selecionou: Atualizar produto\n');
                atualizarProduto(estoque);
                console.clear();
                break;
            case '4':
                console.log('\n→ Você selecionou: Excluir produto\n');
                excluirProduto(estoque);
                console.clear();
                break;
            case '5':
                console.log('\n→ Você selecionou: Buscar produto\n');
                buscarProduto(estoque);
                console.clear();
                break;
            case '0':
                sair = true;
                console.log('\n→ Saindo do programa. Até mais!\n');
                break;
            default:
                console.log('\n  Opção inválida. Tente novamente.\n');
        }
    }
};