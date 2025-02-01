/// <reference types="cypress" />
describe('Testes para a página de candidatura', () => {
    beforeEach(() => {
        cy.visit('https://ebac-jobs-e2e.vercel.app/')
    })
    it('Deve levar o usuário até o formulário de incrição', () => {
        cy.get('.Vaga_vagaLink__DeFkk').first().click()
        cy.get('input').should('have.length', 7)
    })
    it('Deve preencher o formulario de inscrição', () => {
        cy.get('.Vaga_vagaLink__DeFkk').first().click()
        cy.get('input[name="nome-completo"]').type('igor santana')
        cy.get('input[name="email"]').type('igor@santana.com')
        cy.get('input[name="telefone"]').type('11 12345678')
        cy.get('input[name="endereco"').type('rua do teste, 000')
        cy.get('#linux').check()
        cy.get('select[name="escolaridade"]').select('outros')
        cy.get('.Aplicacao_button__tw2AE').click()

        cy.on('window:alert', (conteudo) => {
            expect(conteudo).contain('Obrigado pela candidatura!')
        })
        
    })
})