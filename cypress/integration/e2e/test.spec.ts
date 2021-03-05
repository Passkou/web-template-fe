import { expect } from 'chai';

describe('Test', () => {
  it('Step 1', () => {
    expect(true).to.be.eq(true);
    cy.visit('https://www.passkou.com');
    cy.get('.logo').should('have.attr', 'href');
  });
});