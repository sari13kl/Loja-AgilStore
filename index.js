import { executarMenu } from './src/cli/menu.js';
import { carregarEstoque } from './src/repositories/estoquerepository.js';

const estoque = carregarEstoque();

executarMenu(estoque);

