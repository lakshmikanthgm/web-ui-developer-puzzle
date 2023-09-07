describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 2);
  });

  it('Then: I should see search results as I am typing', () => {
    cy.get('input[type="search"]').clear().type('json');
    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
    cy.get('[data-testing="book-item"]').eq(0).find('[data-cy="title"]').contains('JSON Quick Syntax Reference');
    cy.get('[data-testing="book-item"]').eq(0).find('[data-cy="author"]').contains('Wallace Jackson');
    cy.get('[data-testing="book-item"]').eq(0).find('[data-cy="publisher"]').contains('Apress');
    cy.get('[data-testing="book-item"]').eq(0).find('[data-cy="published-date"]').contains('5/17/2016');
    cy.get('[data-testing="book-item"]').eq(0).find('[data-cy="description"]').contains("What You'll Learn");
  });
});
