# SPS Technical Test

Este repositório contém **dois projetos**: um **backend** (Node.js) para criação de um CRUD de usuários (com autenticação JWT) e um **frontend** (React) para consumir a API e exibir/gerenciar os usuários autenticados.

---

## Objetivo

- **Backend (Node):** Criar um CRUD (API REST) em memória para cadastro de usuários, incluindo autenticação JWT.  
- **Frontend (React):** Criar um CRUD de usuários, exibindo tela de login (signIn) para autenticar e, caso autenticado, permitir cadastrar, editar, remover e listar usuários.

---

## Regras Principais

### **Backend (Node)**

1. **Usuário admin pré-cadastrado** para autenticação:
```json
{
  "name": "admin",
  "email": "admin@spsgroup.com.br",
  "type": "admin",
  "password": "1234"
}
```

- **Criar rota de autenticação** (gera JWT)
- **Rotas da API** só podem ser executadas se estiver autenticado
- **CRUD de usuários**:
  - Cadastrar (email, nome, type, password)
  - Não permitir e-mail duplicado
  - Remover usuário
  - Alterar dados do usuário

### **Frontend (React)**
- Página de login (signIn) para autenticar o usuário
- Armazenar token (pode ser localStorage)
- Somente usuários autenticados podem listar e cadastrar usuários
- Consumir a API criada anteriormente (test-sps-server)

## Tecnologias Utilizadas

#### **Backend**
- Node.js  
- Express  
- JWT  
- Repositório em memória (sem banco real)

#### **Frontend**
- React  
- Axios  
- React Icons  
- React Toastify  
- Armazenamento do Token em localStorage

## Estrutura de Pastas


---

## Passo a Passo para Executar

### Opção 1: Instalação e Execução Manual

1. **Clonar o repositório**:
```
git clone https://github.com/Robetjunior/sps-technical-test.git 
cd spsgroup
```

2. **Instalar todas as dependências** (Backend e Frontend) de uma vez::

```
npm run install-all
```


3. **Executar ambos simultaneamente**:
```
npm run dev
```

Backend em: http://localhost:3000  
Frontend em: http://localhost:3001

## Executando Testes do Backend

Para rodar os testes unitários do backend, há duas opções:

1. Acesse a pasta do backend:
```
cd spsgroup-backend
```

2. Instale as dependências (caso não tenha feito):
```
npm install
```

3. Execute os testes:
```
npm test
```

### Autor
José Roberto Ferreira Junior

GitHub: [https://github.com/Robetjunior](https://github.com/Robetjunior)

LinkedIn: [https://www.linkedin.com/in/jos%C3%A9-roberto-dev/](https://www.linkedin.com/in/jos%C3%A9-roberto-dev/)