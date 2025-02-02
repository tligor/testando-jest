/// <reference types="cypress" />

describe('Testes para a Home', () => {
    beforeEach(() => {
        // Limpa os cookies
        cy.clearCookies();
        cy.log('Cookies limpos antes da execução do teste.');

        // Recarrega a página
        cy.reload();

        // Visita a página
        cy.visit('https://agenda-contatos-react.vercel.app');
    });

    it('Deve renderizar 3 contatos inicialmente', () => {
        cy.get('.contato').should('have.length', 3);
    });

    it('Deve adicionar um novo contato e deletá-lo após', () => {
        // Verifica o número de contatos
        cy.get('.contato').should('have.length', 3).then((contatos) => {
            // Se houver 3 contatos, prossegue com o teste (Aparentemente o site salva os dados no cache, mas não achei dado no cache...)
            if (contatos.length === 3) {
                //adiciona o contato para teste
                cy.get('[type="text"]').type('Igor Santana');
                cy.get('[type="email"]').type('igor@igor.com')
                cy.get('[type="tel"]').type('11876543210'); 
                cy.get('button[type="submit"]').click();

                cy.wait(2000);

                // Verifica se o número de contatos aumentou para 4
                cy.get('.contato').should('have.length', 4);

                // Verifica se o novo contato foi adicionado
                cy.get('.contato').last().within(() => {
                    cy.get('li').should('contain', 'Igor Santana');
                    cy.get('li').should('contain', 'igor@igor.com');
                    cy.get('li').should('contain', '11876543210');

                    // Deleta o contato pra cumprir o primeiro requisito do teste, caso teste novamente.
                    cy.get('.delete').click();
                });

                // Verifica se o número de contatos voltou para 3
                cy.get('.contato').should('have.length', 3);
            } else {
                // Se não houver 3 contatos, (primeiro requisito)
                cy.log('Número de contatos não é 3, pulando o teste.');
                cy.skip();
            }
        });
    });
});
