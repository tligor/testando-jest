/// <reference types="cypress" />

describe('Testes para edição de contato', () => {
    beforeEach(() => {
        // Limpa os cookies antes do teste
        cy.clearCookies();
        cy.log('Cookies limpos antes da execução do teste.');

        // Recarrega a página para limpar os cookies
        cy.reload();

        // Visita a página
        cy.visit('https://agenda-contatos-react.vercel.app');
    });

    it('Deve editar o primeiro contato da lista', () => {
        // Verifica se há contatos na lista
        cy.get('.contato').should('have.length.greaterThan', 0).then(() => {
            // Seleciona o primeiro contato e clica no botão de editar
            cy.get('.contato').first().within(() => {
                cy.get('.edit').click();
            });

            // Altera os dados do contato
            cy.get('[type="text"]').clear().type('Teste Cypress')
            cy.get('[type="tel"]').clear().type('11 111111111');
            cy.get('[type="email"]').clear().type('teste@cypress.com');
            cy.get('button[type="submit"]').click();

            cy.wait(2000);

            // Verifica se o primeiro contato foi atualizado
            cy.get('.contato').first().within(() => {
                cy.get('li').should('contain', 'Teste Cypress');
                cy.get('li').should('contain', 'teste@cypress.com');
                cy.get('li').should('contain', '11 111111111');
            });

            // Edita o contato novamente para o original
            cy.get('.contato').first().within(() => {
                cy.get('.edit').click();
            });

            // Restaura os dados do contato para os valores originais
            cy.get('[type="text"]').clear().type('gian Souza');
            cy.get('[type="tel"]').clear().type('11912345678');
            cy.get('[type="email"]').clear().type('gian@ebac.com.br');
            cy.get('button[type="submit"]').click();

            cy.wait(2000);

            // Verifica se o primeiro contato foi restaurado corretamente
            cy.get('.contato').first().within(() => {
                cy.get('li').should('contain', 'gian Souza');
                cy.get('li').should('contain', 'gian@ebac.com.br');
                cy.get('li').should('contain', '11912345678');
            });
        });
    });
});
