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

  it('Then: I should add a book and mark the book as finished', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="book-item"]').eq(0).find('[data-cy="add-book"]').contains('Want to Read').click();
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-cy="book-finished"]').click();
    cy.get('[data-cy="finsihed-on"]').should('be.visible').contains(new Date().getFullYear().toString());
    cy.get('[data-testing="book-item"]').eq(0).find('[data-cy="add-book"]').contains('Finished');
    cy.get('[data-cy="remove-book"]').eq(0).click();
    cy.get('[data-cy="drawer-close"]').click();
    cy.get('[data-testing="book-item"]').eq(0).find('[data-cy="add-book"]').click();
    cy.get('[data-testing="book-item"]').eq(0).find('[data-cy="add-book"]').contains('Want to Read');
  });
});
