/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT - CAC TAT', () => {

  beforeEach(() => {
    cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
  })

  it('Preencher os campos obrigatórios e enviar o formulário', () => {

    //Uso de cy.clock() para congelar o relógio do navegador.
    cy.clock()

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

    //Uso de cy.tick() para pular contagem do relógio do navegador, economizando tempo de teste.
    cy.tick(3000)

    cy.get('.success').should('not.be.visible')

  })

  it('Deve exibir mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    //Uso de cy.clock() para congelar o relógio do navegador.
    cy.clock()

    cy.get('#firstName').type('Joyce')
    cy.get('#lastName').type('Pontes')
    cy.get('#email').type('joycepontesfgmail.com')
    cy.get('#product').select('Cursos')
    cy.get(':nth-child(3) > input').click()
    cy.get('#open-text-area').type('Teste do Curso Cypress Básico')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    //Uso de cy.tick() para pular contagem do relógio do navegador, economizando tempo de teste.
    cy.tick(3000)

    cy.get('.error').should('not.be.visible')

  })

  it('Deve validar que o campo Telefone só aceita valores númericos', () => {
    cy.get('#phone').type('Cypress')

    cy.get('#phone').should('be.empty')
  })

  it('Deve exibir mensagem de erro quando o campo Telefone se torna obrigatório, mas não é preenchido antes do envio do formulário', () => {

    //Uso de cy.clock() para congelar o relógio do navegador.
    cy.clock()

    cy.get('#firstName').type('Joyce')
    cy.get('#lastName').type('Pontes')
    cy.get('#email').type('joycepontesf@gmail.com')
    cy.get('#product').select('Cursos')
    cy.get(':nth-child(3) > input').click()
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste do Curso Cypress Básico', { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    //Uso de cy.tick() para pular contagem do relógio do navegador, economizando tempo de teste.
    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
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
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')

      })
  })

  //Uso da biblioteca Lodash, criando uma repetição de teste.
  Cypress._.times(5, function () {
    it('Deve marcar ambos checkboxes, depois desmarcar o último', () => {
      cy.get('input[type="checkbox"]').check().last().uncheck().should('not.to.be.checked')

    })
  })

  it('Deve selecionar um arquivo da pasta fixtures e confirmar seu nome na página', () => {
    cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')

      })
  })

  it('Deve selecionar um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Deve selecionar um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('arquivoTeste')
    cy.get('input[type="file"]').should('not.have.value').selectFile('@arquivoTeste')
      
      .then(input => {
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

  it('Deve exibir e escondr as mensagens de sucesso e erro usando o método .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible').invoke('show').should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.').invoke('hide').should('not.be.visible')
    cy.get('.error').should('not.be.visible').invoke('show').should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!').invoke('hide').should('not.be.visible')
  })

  it('Deve preencher a area de texto usando o comando invoke', () => {
    const longText = Cypress._.repeat('abcdefghi ', 30)

    cy.get('#open-text-area')
      .invoke('val', longText).should('have.value', longText)
  })

  it('Deve fazer uma requisição HTTP', () => {
    cy.request({
      method: 'GET',
      url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
  })
      .should(function(response) {
        const { status, statusText, body } = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })
  })

  it('Deve encontrar o gato escondido', () => {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
  })

})