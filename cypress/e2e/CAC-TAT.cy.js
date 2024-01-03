/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT - CAC TAT', () => {

  beforeEach(() => {
    cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
  })

  it('Preencher os campos obrigatórios e enviar o formulário', () => {
    cy.get('#firstName').type('Joyce')
    cy.get('#lastName').type('Pontes')
    cy.get('#email').type('joycepontesf@gmail.com')
    cy.get('#product').select('Cursos')
    cy.get(':nth-child(3) > input').check()
    cy.get('#phone-checkbox').click()
    cy.get('#phone').type('81999999593')
    cy.get('#open-text-area').type('Teste do Curso Cypress Básico Teste do Curso Cypress Básico Teste do Curso Cypress Básico Teste do Curso Cypress Básico Teste do Curso Cypress Básico Teste do Curso Cypress Básico Teste do Curso Cypress Básico Teste do Curso Cypress Básico Teste do Curso Cypress Básico Teste do Curso Cypress Básico Teste do Curso Cypress Básico Teste do Curso Cypress Básico', { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('Deve exibir mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Joyce')
    cy.get('#lastName').type('Pontes')
    cy.get('#email').type('joycepontesfgmail.com')
    cy.get('#product').select('Cursos')
    cy.get(':nth-child(3) > input').click()
    cy.get('#open-text-area').type('Teste do Curso Cypress Básico')
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('Deve validar que o campo Telefone só aceita valores númericos', () => {
    cy.get('#phone').type('Cypress')

    cy.get('#phone').should('be.empty')
  })

  it('Deve exibir mensagem de erro quando o campo Telefone se torna obrigatório, mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Joyce')
    cy.get('#lastName').type('Pontes')
    cy.get('#email').type('joycepontesf@gmail.com')
    cy.get('#product').select('Cursos')
    cy.get(':nth-child(3) > input').click()
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste do Curso Cypress Básico', { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Deve preencher e limpar os campos Nome, Sobrenome, Email e Telefone', () => {
    cy.get('#firstName').type('Joyce').should('have.value', 'Joyce').clear().should('have.value', '')
    cy.get('#lastName').type('Pontes').should('have.value', 'Pontes').clear().should('have.value', '')
    cy.get('#email').type('joycepontesf@gmail.com').should('have.value', 'joycepontesf@gmail.com').clear().should('have.value', '')
    cy.get('#phone').type('81999999593').should('have.value', '81999999593').clear().should('have.value', '')
  })

  it('Deve exibir mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('Deve enviar o formuário com sucesso usando um Comando Customizado', () => {
    cy.fillMandatoryFieldsAndSubmit('Joyce', 'Pontes', 'joycepontesf@gmail.com', 'Cursos', '8199999999', 'Teste').should('be.visible')
  })

  it('Deve selecionar o produto YouTube por seu texto', () => {

    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('Deve selecionar o produto Mentoria por seu value', () => {
    
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('Deve selecionar o produto Blog por seu índice', () => {
    
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('Deve marcar o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')

  })

  it('Deve marcar cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').check().should('have.length', 3)
      .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')

      })   
  })

  it('Deve marcar ambos checkboxes, depois desmarcar o último', () => {
    cy.get('input[type="checkbox"]').check().last().uncheck().should('not.to.be.checked')

  })

  it('Deve selecionar um arquivo da pasta fixtures e confirmar seu nome na página', () => {
    cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json')
    .then(input =>{
      expect(input[0].files[0].name).to.equal('example.json')

    })
  })

  it('Deve selecionar um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
    .then(input =>{
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('Deve selecionar um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('arquivoTeste')
    cy.get('input[type="file"]').should('not.have.value').selectFile('@arquivoTeste')
    .then(input =>{
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('Deve verificar que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
  })

  it('Deve acessar a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
  })

})

