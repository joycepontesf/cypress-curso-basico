
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (nome, sobrenome, email, motivo, telefone, mensagem) => { 
    cy.get('#firstName').type(nome)
  cy.get('#lastName').type(sobrenome)
  cy.get('#email').type(email)
  cy.get('#product').select(motivo)
  cy.get(':nth-child(3) > input').click()
  cy.get('#phone-checkbox').click()
  cy.get('#phone').type(telefone)
  cy.get('#open-text-area').type(mensagem, { delay : 0 })
  cy.contains('button', 'Enviar').click()
  cy.get('.success')
})
