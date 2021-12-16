describe('My First Test', () => {
  it('Visit the login page', () => {
      cy.visit('login')

      cy.contains('Angular') //.click('topLeft')
  })
})