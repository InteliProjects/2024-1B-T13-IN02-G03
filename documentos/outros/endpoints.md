# Detalhamento das Rotas e Endpoints

## Rotas de Materials
**Rota: Obter lista de materiais**

*Endereço:* /material

*Método:* GET

*Header:*

    Content-Type: application/json

*Body:* N/A

*Response:*
```js
[
  {
    "id": "1",
    "file": "doc1.com",
    "type": "PDF",
    "title": "Manual de montagem para o Latitude 3440"
  }
]
```
*User Story:* Reflete a US T001 e T002, em que o montador acessa e visualiza os manuais necessários.

**Rota: Criar um tipo de material**

*Endereço:* /material

*Método:* POST

*Header:*

    Content-Type: application/json

*Body:*
```js
{
  "file": "doc1.com",
  "type": "PDF",
  "title": "PDF Manual de montagem para o Latitude 3440"
}
```
*Response:*
```js
{
  "id": "1",
  "file": "doc1.com",
  "type": "PDF",
  "title": "PDF Manual de montagem para o Latitude 3440"
}
```
*User Story:* Reflete a US T005, em que o administrador adiciona manuais para os funcionários.

**Rota: Visualizar um tipo de material específico**

*Endereço:* /material/:id

*Método:* GET

*Header:*

    Content-Type: application/json

*Body:* N/A

*Response:*
```js
{
  "id": "2",
  "file": "doc2.com",
  "type": "PDF",
  "title": "Manual de montagem para o Latitude 3440"
}
```
*User Story:* Reflete a US T001, em que o montador acessa detalhes de um manual específico.

**Rota: Atualizar um tipo de material específico**

*Endereço:* /material/:id

*Método:* PUT

*Header:*

    Content-Type: application/json

*Body:*
```js
{
  "file": "doc2.com",
  "type": "PDF",
  "title": "DOC Manual de montagem para o Latitude 3440"
}
```
*Response:*
```js
{
  "id": "1",
  "file": "doc2.com",
  "type": "PDF",
  "title": "DOC Manual de montagem para o Latitude 3440"
}
```

*User Story:* Reflete a US T005, em que o administrador atualiza manuais para os funcionários.

**Rota: Remover um tipo de material específico**

*Endereço:* /material/:id

*Método:* DELETE

*Header:*

    Content-Type: application/json

*Body:* N/A

*Response:*
```js
{
  "message": "Material deleted successfully"
}
```
*User Story:* Reflete a US T005, em que o administrador remove manuais.

## Rotas de Groups

**Rota: Obter uma lista de todas as linhas de montagens**

*Endereço:* /group

*Método:* GET

*Header:*

    Content-Type: application/json

*Body:* N/A

*Response:*
```js
[
  {
    "id": "1",
    "assembly_line": 1,
    "id_users": 1
  }
]
```
*User Story:* Reflete a US T001, em que o gerente acessa e visualiza todas as linhas de montagens.

**Rota: Criar uma linha de montagem**

*Endereço:* /group

*Método:* POST

*Header:*

    Content-Type: application/json

*Body:*
```js
{
  "assembly_line": 1,
  "id_users": 1
}
```
*Response:*
```js
{
  "id": "1",
  "assembly_line": 1,
  "id_users": 1
}
```
*User Story:* Reflete a US T002, em que o gerente cria novas linhas de montagem.

**Rota: Visualizar uma linha de montagem específica**

*Endereço:* /group/:id

*Método:* GET

*Header:*

    Content-Type: application/json

*Body:* N/A

*Response:*
```js
{
  "id": "2",
  "assembly_line": 2,
  "id_users": 1
}
```
*User Story:* Reflete a US T001, em que o gerente visualiza uma linha de montagem específica.

**Rota: Atualizar uma linha de montagem específica**

*Endereço:* /group/:id

*Método:* PUT

*Header:*

    Content-Type: application/json

*Body:*
```js
{
  "assembly_line": 2,
  "id_users": 2
}
```
*Response:*
```
{
  "id": "2",
  "assembly_line": 2,
  "id_users": 2
}
```
*User Story:* Reflete a US T002, em que o gerente atualiza uma linha de montagem específica.

**Rota: Remover uma linha de montagem específica**

*Endereço:* /group/:id

*Método:* DELETE

*Header:*

    Content-Type: application/json

*Body:* N/A

*Response:*
```js
{
  "message": "Group deleted successfully"
}
```
*User Story:* Reflete a US T002, em que o gerente remove uma linha de montagem específica.

## Rotas de Products

**Rota: Obter uma lista de todos os produtos**

*Endereço:* /product

*Método:* GET

*Header:*

    Content-Type: application/json
*Body:* N/A

*Response:*
```js
[
  {
    "id": "1",
    "name": "Notebook Inspiron 15",
    "type": "Notebook",
    "model": "12ª geração Intel® Core™ i3-1215U (6-core, cache de 10MB, até 4.4GHz)"
  }
]
```

*User Story:* Reflete a US T001, em que o usuário acessa e visualiza todos os produtos.

**Rota: Criar um produto novo**

*Endereço:* /product

*Método:* POST

*Header:*

    Content-Type: application/json
*Body*
```js
{
  "name": "Notebook Inspiron 15",
  "type": "Notebook",
  "model": "12ª geração Intel® Core™ i3-1215U (6-core, cache de 10MB, até 4.4GHz)"
}
```
*Response:*
```js
{
  "id": "1",
  "name": "Notebook Inspiron 15",
  "type": "Notebook",
  "model": "12ª geração Intel® Core™ i3-1215U (6-core, cache de 10MB, até 4.4GHz)"
}
```
*User Story:* Reflete a US T002, em que o administrador cria novos produtos.

**Rota: Visualizar um produto específico**

*Endereço:* /product/:id

*Método:* GET

*Header:*

    Content-Type: application/json
*Body:* N/A

*Response:*
```js
{
  "id": "1",
  "name": "Notebook Inspiron 15",
  "type": "Notebook",
  "model": "12ª geração Intel® Core™ i3-1215U (6-core, cache de 10MB, até 4.4GHz)"
}
```
*User Story:* Reflete a US T001, em que o usuário visualiza os detalhes de um produto específico.

**Rota: Atualizar um produto existente**

*Endereço:* /product/:id

*Método:* PUT

*Header:*

    Content-Type: application/json
*Body:*
```js
{
  "name": "Notebook Inspiron 15",
  "type": "Notebook",
  "model": "12ª geração Intel® Core™ i3-1215U (6-core, cache de 10MB, até 4.4GHz)"
}
```
*Response:*
```js
{
  "id": "1",
  "name": "Notebook Inspiron 15",
  "type": "Notebook",
  "model": "12ª geração Intel® Core™ i3-1215U (6-core, cache de 10MB, até 4.4GHz)"
}
```
*User Story:* Reflete a US T002, em que o administrador atualiza os detalhes de um produto existente.

**Rota: Remover um produto existente**

*Endereço:* /product/:id

*Método:* DELETE

*Header:*

    Content-Type: application/json
*Body:* N/A

*Response:*
```js
{
  "message": "Product deleted successfully"
}
```
*User Story:* Reflete a US T002, em que o administrador remove um produto existente.

## Rotas de Tasks

**Rota: Obter uma lista de todas as tarefas**

*Endereço:* /task

*Método:* GET

*Header:*

    Content-Type: application/json

*Body:* N/A

*Response:*
```js
[
  {
    "id": "1",
    "read": false,
    "important": true,
    "id_users": 1,
    "id_handbooks": 1
  }
]
```
*User Story:* Reflete a US T001 e T002, em que o usuário acessa e visualiza todas as tarefas.

**Rota: Criar uma nova tarefa**

*Endereço:* /task

*Método:* POST

*Header:*

    Content-Type: application/json
*Body:*
```js
{
  "read": false,
  "important": true,
  "id_users": 1,
  "id_handbooks": 1
}
```
*Response:*
```js
{
  "id": "1",
  "read": false,
  "important": true,
  "id_users": 1,
  "id_handbooks": 1
}
```
*User Story:* Reflete a US T003, em que o usuário cria uma nova tarefa.

**Rota: Visualizar uma tarefa específica**

*Endereço:* /task/:id

*Método:* GET

*Header:*

    Content-Type: application/json
*Body:* N/A

*Response:*
```js
{
  "id": "1",
  "read": false,
  "important": true,
  "id_users": 1,
  "id_handbooks": 1
}
```
*User Story:* Reflete a US T001, em que o usuário visualiza os detalhes de uma tarefa específica.

**Rota: Atualizar uma tarefa existente**

*Endereço:* /task/:id

*Método:* PUT

*Header:*

    Content-Type: application/json
*Body:*
```js
{
  "read": true,
  "important": true,
  "id_users": 1,
  "id_handbooks": 1
}
```
*Response:*
```js
{
  "id": "1",
  "read": true,
  "important": true,
  "id_users": 1,
  "id_handbooks": 1
}
```
*User Story:* Reflete a US T004, em que o usuário atualiza os detalhes de uma tarefa existente.

**Rota: Remover uma tarefa existente**

*Endereço:* /task/:id

*Método:* DELETE

*Header:*

    Content-Type: application/json

*Body:* N/A

*Response:*
```js
{
  "message": "Task deleted successfully"
}
```
*User Story:* Reflete a US T005, em que o usuário remove uma tarefa existente.

## Rotas de Users

**Rota: Login de Usuário**

*Endereço:* /login

*Método:* POST

*Header:*

    Content-Type: application/json
*Body:*
```js
  {
    "email": "example@example.com",
    "password": "examplePassword"
  }
```
*Response:*
```js
  {
    "id": "1",
    "email": "example@example.com",
    "name": "John Doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
```
*User Story:* Reflete a US T001, em que o usuário realiza login no sistema.

**Rota: Retorna uma lista de todos os usuários**

*Endereço:* /users

*Método:* GET

*Header:*

    Content-Type: application/json
*Body:* N/A

*Response:*
```js
[
  {
    "id": "1",
    "username": "example_user1",
    "email": "user1@example.com"
  },
  {
    "id": "2",
    "username": "example_user2",
    "email": "user2@example.com"
  }
]
```
*User Story:* Reflete a US T006 e T008, em que o administrador deseja obter uma lista de todos os usuários registrados no sistema.

**Rota: Retorna os detalhes de um usuário específico**

*Endereço:* /users/:id

*Método:* GET

*Header:*

    Content-Type: application/json
*Body:* N/A

*Response:*
```js
  {
    "id": "1",
    "username": "example_user1",
    "email": "user1@example.com"
  }
```
*User Story:* Reflete a US T008, onde o usuário visualiza os detalhes de um usuário específico.

**Rota: Cria um novo usuário**

*Endereço:* /users

*Método:* POST

*Header:*

    Content-Type: application/json
*Body:*
```js
{
  "username": "example_user",
  "email": "user@example.com",
  "password": "securepassword123"
}
```
*Response:*
```js
  {
  "id": "123",
  "username": "example_user",
  "email": "user@example.com"
  }
```
*User Story:* Reflete a US T008, em que o administrador pode criar um novo usuário no sistema.

**Rota: Atualiza as informações de um usuário existente**

*Endereço:* /users/:id

*Método:* PUT

*Header:*

    Content-Type: application/json
*Body:*
```js
{
  "username": "novousername",
  "email": "novoemail@example.com",
  "password": "novasenha123"
}
```
*Response:*
```js
{
  "id": ":id",
  "username": "novousername",
  "email": "novoemail@example.com"
}
```
*User Story:* Reflete a US T008, em que o administrador pode atualizar suas informações de outro usuário.

**Rota: Remove um usuário**

*Endereço:* /users/:id

*Método:* DELETE

*Header:*

    Content-Type: application/json
*Body:* N/A

*Response:*
```js
{
  "message": "Usuário excluído com sucesso"
}
```
*User Story:* Reflete a US T008, em que o administrador pode remover um usuário do sistema.

## Rotas de Handbooks

**Rota: Obter uma lista de todos os manuais**

*Endereço:* /handbook

*Método:* GET

*Header:*

    Content-Type: application/json
*Body:* N/A

*Response:*
```js
[
  {
    "id": 1,
    "title": "Manual de Usuário",
    "description": "Manual abrangente para usuários",
    "version": "1.0"
  },
  {
    "id": 2,
    "title": "Manual do Administrador",
    "description": "Guia detalhado para administradores",
    "version": "2.0"
  }
]
```
*User Story:* Reflete a US T002 e T007, em que o usuário pode visualizar todos os manuais disponíveis.

**Rota: Obter os detalhes de um manual**

*Endereço:* /handbook/:id

*Método:* GET

*Header:*

    Content-Type: application/json
*Body:* N/A

*Response:*
```js
  {
    "id": 2,
    "title": "Manual do Administrador",
    "description": "Guia detalhado para administradores",
    "version": "2.0"
  }
```
*User Story:* Reflete a US T004 e T007, em que o usuário pode visualizar os detalhes de um manual específico.

**Rota: Criar um novo manual**

*Endereço:* /handbook

*Método:* POST

*Header:*

    Content-Type: application/json
*Body:* N/A

*Response:*
```js
  {
    "title": "Latitude 5440",
    "description": "Este é um manual de montagem para o Latitude 5440",
    "version": "1.0",
    "id_materials": 1,
    "id_products": 1
  }
```
*User Story:* Reflete a US T005, em que o usuário pode adicionar um novo manual (_handbook_) ao sistema.

**Rota: Atualiza um manual**

*Endereço:* /handbook/:id

*Método:* PUT

*Header:*

    Content-Type: application/json
*Body:*
```js
  {
    "title": "Latitude 3440",
    "description": "Este é um manual de montagem para o Latitude 3440",
    "version": "1.0",
    "id_materials": 1,
    "id_products": 1
  }
```
*Response:*
```js
  {
    "id": 1,
    "title": "Latitude 3440",
    "description": "Este é um manual de montagem para o Latitude 3440",
    "version": "1.0",
    "id_materials": 1,
    "id_products": 1
  }
```
*User Story:* Reflete a US T005, em que o usuário pode o usuário atualiza os detalhes de um manual (*handbook*) existente.

**Rota: Apagar um manual existente**

*Endereço:* /handbook/:id

*Método:* DELETE

*Header:*

    Content-Type: application/json
*Body:* N/A

*Response:*
```js
  {
    "message": "Manual excluído com sucesso."
  }
```
*User Story:* Reflete a US T007, em que o usuário pode excluir um manual (*handbook*) existente.
