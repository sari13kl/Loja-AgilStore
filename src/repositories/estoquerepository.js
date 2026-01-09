import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Arquivo JSON - corrigido para src/data/estoque.json
export const FILE_PATH = path.resolve(__dirname, '../data/estoque.json');
export const DIR_PATH = path.dirname(FILE_PATH);

// Salvar o estoque no JSON
export const salvarEstoque = (estoque) => {
    try {
        // Verifica se o diretório existe
        if (!fs.existsSync(DIR_PATH)) {
            fs.mkdirSync(DIR_PATH, { recursive: true });
        }
        fs.writeFileSync(FILE_PATH, JSON.stringify(estoque, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error('Erro ao salvar o estoque:', error.message);
        throw error;
    }
};

// Carregar o estoque do JSON
export const carregarEstoque = () => {
    try {
        if (fs.existsSync(FILE_PATH)) {
            const data = fs.readFileSync(FILE_PATH, 'utf-8');
            return JSON.parse(data);
        } else {
            // Cria o arquivo vazio se não existir
            salvarEstoque([]);
            return [];
        }
    } catch (error) {
        console.error('Erro ao carregar o estoque:', error.message);
        return [];
    }
};
