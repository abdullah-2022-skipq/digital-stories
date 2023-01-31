describe('template spec', () => {
  it('passes', () => {
    const IDENTIFIER = Date.now().toString().slice(-5, -1);
    cy.visit('http://localhost:3000');

    // click on get started button
    cy.get('[data-testid="button"]').click();

    // enter name
    cy.get(':nth-child(1) > [data-testid="input"]')
      .click()
      .type(`Cypress ${IDENTIFIER}`);

    // enter email
    const email = `cypress-${IDENTIFIER}@test.com`;
    cy.get(':nth-child(2) > [data-testid="input"]').click().type(email);

    // click next button
    cy.get('[data-testid="button"]').click();

    // enter username
    const username = `cypress-${IDENTIFIER}`;
    cy.get('[data-testid="input"]').click().type(username);

    // click next
    cy.get('.StepUsername_buttonWrapper__jTTd0').click();

    // password
    const password = 'myPassword1';
    cy.get(':nth-child(1) > [data-testid="input"]').click().type(password);
    cy.get(':nth-child(2) > [data-testid="input"]').click().type(password);
    cy.get('[data-testid="button"]').click();

    // set profile picture
    cy.get('.StepProfilePicture_avatarLabel__sJkzS').click();

    // create account
    cy.get('[data-testid="button"]').click();
  });
});
