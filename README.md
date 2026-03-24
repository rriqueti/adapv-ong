# S.O.S Caramelo - Sistema de Gestão para ONG de Adoção

Este é um sistema web completo desenvolvido para auxiliar na gestão das operações da ONG ADAPV, focada no resgate e adoção de animais. A plataforma, chamada "S.O.S Caramelo", centraliza o cadastro de animais, o processo de adoção, o gerenciamento de pessoas e outras atividades essenciais da organização.

## ✨ Funcionalidades Principais

- **Autenticação e Segurança:** Sistema de login, cadastro e logout com tokens JWT e senhas criptografadas com Bcrypt.
- **Controle de Acesso por Perfil:** Menus e funcionalidades dinâmicas baseadas nas permissões do usuário logado (Administrador, Usuário Padrão, etc.).
- **Gestão de Animais:** Cadastro completo de pets com fotos, descrição, status (disponível, adotado) e outras informações, exibidos em uma interface moderna de cards.
- **Fluxo de Adoção:** Processo de solicitação de adoção com status (Pendente, Aprovada, Rejeitada) para aprovação por um administrador.
- **Gestão de Pessoas:** Cadastro de adotantes, voluntários e outros envolvidos.
- **Interface Moderna:** Design responsivo utilizando Bootstrap 5 e componentes estilizados para uma melhor experiência de usuário.
- **Módulos Adicionais:** Estrutura preparada para gerenciar Doações, Eventos, Patrimônio, Estoque e mais.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js**
- **Express.js**
- **MySQL2:** Driver para conexão com o banco de dados MySQL.
- **JSON Web Token (JWT):** Para gerenciamento de sessões e autenticação.
- **Bcrypt.js:** Para criptografia de senhas.
- **Dotenv:** Para gerenciamento de variáveis de ambiente.
- **Luxon:** Para manipulação de datas e horas.

### Frontend
- **EJS (Embedded JavaScript templates):** Para renderização de views dinâmicas.
- **Bootstrap 5:** Framework CSS para design responsivo.
- **JavaScript (ES6+):** Para interatividade no lado do cliente.
- **SweetAlert2:** Para criar pop-ups e alertas elegantes.
- **jQuery:** Utilizado em algumas partes do template AdminLTE.

## ⚙️ Instalação e Configuração

Siga os passos abaixo para executar o projeto em seu ambiente local.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 14 ou superior)
- Um servidor de banco de dados [MySQL](https://www.mysql.com/)

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Guxta-RDM/ONG-ADAPV.git
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd ONG-ADAPV-main
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure o Banco de Dados:**
    - Crie um banco de dados no seu servidor MySQL.
    - Execute os scripts SQL necessários para criar as tabelas do sistema (ex: `tb_usuario`, `tb_pessoa`, `tb_animais`, `tb_adocao`, `tb_perfil`, `tb_permissao`, `tb_menu`, etc.).

5.  **Configure as Variáveis de Ambiente:**
    - Crie um arquivo chamado `.env` na raiz do projeto.
    - Copie o conteúdo abaixo para o arquivo `.env` e substitua os valores pelos dados da sua configuração local.

    ```env
    # Configuração do Banco de Dados
    HOST=localhost
    PORT=3306
    DB=nome_do_seu_banco
    DB_USERNAME=seu_usuario_do_banco
    DB_PASSWORD=sua_senha_do_banco

    # Chave Secreta para JWT (JSON Web Token)
    # IMPORTANTE: Substitua por uma string longa, complexa e aleatória.
    JWT_SECRET=aqui-vai-uma-chave-secreta-muito-forte-e-dificil-de-adivinhar-12345
    ```

6.  **Inicie o servidor:**
    ```bash
    node server.js
    ```

7.  Acesse a aplicação em `http://localhost:5000` no seu navegador.

## 📂 Estrutura do Projeto

O projeto segue uma estrutura baseada no padrão MVC (Model-View-Controller):

```
├── controllers/    # Lógica de negócio e controle das requisições
├── middleware/     # Funções intermediárias (autenticação, permissões)
├── models/         # Interação com o banco de dados
├── public/         # Arquivos estáticos (CSS, JS, imagens)
├── routes/         # Definição das rotas da API
├── utils/          # Módulos utilitários (ex: conexão com DB)
├── views/          # Arquivos EJS (a camada de visualização)
├── .env            # Arquivo para variáveis de ambiente (local)
├── server.js       # Arquivo principal de inicialização do servidor
└── package.json    # Dependências e scripts do projeto
```

## 📄 Licença

Este projeto está licenciado sob a licença **ISC**. Veja o arquivo `package.json` para mais detalhes.