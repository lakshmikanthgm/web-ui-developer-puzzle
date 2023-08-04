describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 2);
  });

  it('Then: I should undo last action and remove the book added previously', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="book-item"]').eq(2).find('[data-cy="add-book"]').should('be.enabled');
    cy.get('[data-testing="book-item"]').eq(2).find('[data-cy="add-book"]').click()
    cy.get('[data-testing="book-item"]').eq(2).find('[data-cy="add-book"]').should('be.disabled');
    cy.get('[data-testing="book-item"]').eq(3).find('[data-cy="add-book"]').click()
    cy.get('[data-testing="book-item"]').eq(3).find('[data-cy="add-book"]').should('be.disabled');
    cy.get('[data-cy="books-count"]').contains('4');
    cy.get('.mat-snack-bar-container').should('be.visible');
    cy.get('.mat-simple-snackbar-action').click();
    cy.get('[data-cy="books-count"]').contains('3');
    cy.get('[data-testing="book-item"]').eq(3).find('[data-cy="add-book"]').should('be.enabled');
  });
});
