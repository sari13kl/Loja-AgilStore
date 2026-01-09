# Loja AgilStore — Gerenciamento de Produtos

Aplicação desenvolvida em Node.js para gerenciamento de produtos via terminal.

## Como rodar a aplicação localmente

### Pré-requisitos

- Node.js >= 14.0.0 instalado
- npm (já incluso com o Node.js)

### Instalação e execução

1. **Clone o repositório:**
```bash
git clone https://github.com/sari13kl/Loja-AgilStore
```
2. **Clone o repositório:**
```bash
cd Loja-AgilStore
```

3. **Instale as dependências:**
```bash
npm install
```

4. **Execute a aplicação:**
```bash
npm start
```

A aplicação será iniciada no terminal com um menu interativo para gerenciamento do estoque.


## Tecnologias utilizadas

- **Node.js** - Runtime JavaScript
- **ES6 Modules** - Sistema de módulos moderno
- **readline-sync** - Interface de linha de comando interativa
- **File System (fs)** - Persistência em JSON

## Estrutura do Projeto

```
Loja-AgilStore/
├── src/
│   ├── cli/            # Interface de linha de comando
│   │   ├── menu.js
│   │   └── exemenu.js
│   ├── services/       # Regras de negócio
│   │   └── product.js
│   ├── repositories/   # Camada de acesso aos dados
│   │   └── estoquerepository.js
│   └── data/           # Arquivo de persistência JSON
│       └── estoque.json
├── index.js            # Ponto de entrada da aplicação
├── package.json
└── README.md
```

## Como usar

Ao executar a aplicação, você verá um menu com as seguintes opções:

```
    1 → Adicionar produto
    2 → Listar produtos
    3 → Atualizar produto
    4 → Excluir produto
    5 → Buscar produto
    0 → Sair do programa
```

### Exemplo de uso

1. Digite **1** para adicionar um produto
2. Informe os dados: nome, categoria, quantidade e preço
3. O produto será salvo automaticamente no arquivo JSON
4. Use a opção **2** para visualizar todos os produtos cadastrados

## Persistência de Dados

Os dados são salvos automaticamente no arquivo `src/data/estoque.json`. Esse arquivo é criado automaticamente na primeira execução.

**Nota:** O arquivo `estoque.json` não é versionado no Git (está no `.gitignore`).
