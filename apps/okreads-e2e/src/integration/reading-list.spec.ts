describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should undo last action and add the book removed previously', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="book-item"]').eq(0).find('[data-cy="add-book"]').click()
    cy.get('[data-testing="book-item"]').eq(1).find('[data-cy="add-book"]').click()
    cy.get('[data-cy="books-count"]').contains('2');
    cy.get('[data-testing="toggle-reading-list"]').click()
    cy.wait(2300);
    cy.get('[data-cy="remove-book"]').eq(1).click();
    cy.get('[data-cy="books-count"]').contains('1');
    cy.get('.mat-simple-snackbar-action').click();
    cy.get('[data-cy="books-count"]').contains('2');
  });
});
