/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'
var faker = require('faker');

describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then((response) => {
          return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          let nome = faker.name.firstName()
          let email = faker.internet.email()
          let senha = faker.internet.password()
          cy.cadastrarUsuario(nome, email, senha, 'true')
               .then((response) => {
                    expect(response.status).to.equal(201)
                    expect(response.body.message).to.equal('Cadastro realizado com sucesso')
               })
     });

     it('Deve validar um usuário com email inválido', () => {
          cy.cadastrarUsuario("Fulano da Silva", "beltrano@qa.com.br", "teste", "true").
               then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body.message).to.equal('Este email já está sendo usado')
               })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          cy.request('usuarios').then((response) => {
               let id = response.body.usuarios[0]._id
               cy.request({
                    url: `usuarios/${id}`,
                    method: 'PUT',
                    body: {
                         "nome": "Fulano da Silva editado",
                         "email": "beltrano.editado@qa.com.br",
                         "password": "teste editado",
                         "administrador": "true"
                    }
               }).then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
               })
          })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          cy.request('usuarios').then((response) => {
               let id = response.body.usuarios[1]._id
               cy.request({
                    url: `usuarios/${id}`,
                    method: 'DELETE'
               }).then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body.message).to.equal('Registro excluído com sucesso')
               })
          })
     });


});
