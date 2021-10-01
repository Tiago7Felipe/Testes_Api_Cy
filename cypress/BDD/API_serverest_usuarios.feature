# language: pt

Funcionalidade: API Usuários

Contexto:
Dado que esteja com a URL de Usuários "http://localhost:3000/usuarios"

Cenário: Validar contrato da API de usuários
Quando realizar a chamada.
Então deve validar os dados do contrato, conforme documentação.

Cenário: Validar Listar usuários cadastrados
Quando realizar a chamada pelo método GET
Então deve me retornar uma listagem com os usuários cadastrados, status 200.

Cenário: Validar Cadastrar usuário
Quando realizar a chamada pelo método POST
E passar o body de acordo com a documentação
Então deve cadastrar o usuário com sucesso, com seguinte resposta: "Cadastro realizado com sucesso"
E status code 201, com o response body a mensagem 'Cadastro realizado com sucesso'

Cenário: Validar email usuário com email inválido
Quando realizar a chamada pelo método POST
E passar o body com um email ja cadastrados
Então deve me restornar status code 400 
E com o response body a mensagem "Este email já está sendo usado"

Cenário: Validar editar um usuário ja cadastrado
Quando realizar a chama pelo método PUT
E passar um body conforme documentação
E um id válido
Então deve me retornar um status code 200
E o response body com a mensagem 'Registro alterado com sucesso'


Cenário: Validar exluir um usuário ja cadastrado
Quando realizar a chama pelo método DELETE
E passar um id válido
Então deve me retornar um status code 200
E o response body com a mensagem 'Registro excluído com sucesso'