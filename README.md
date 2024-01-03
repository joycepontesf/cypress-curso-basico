## Curso Cypress Básico

Projeto criado em atendimento aos exercícios do curso Cypress Básico ministrado por [Walmyr Filho](https://walmyr.dev).

Neste repositório será encontrado uma suíte de testes automatizados na aplicação "Central de Atendimento ao Cliente TAT" exercitando itens como:

- Campos obrigatórios
- Máscara dos campos
- Comportamento dos campos tipo 'radio', 'checkbox' e 'select'
- Funcionamento do campo tipo 'file'
- Feedback da aplicação para o usuário

#### Pré-requisitos

Antes de prosseguir certifique-se de ter instalado as seguintes ferramentas:

- [Node.js](https://nodejs.org/) (versão 20.8.0 ou superior)
- [npm](https://www.npmjs.com/) (normalmente instalado com o Node.js)

#### Passos de Instalação

Abra o terminal da sua preferência e faça o clone deste repositório no seu ambiente local:

```bash
git clone https://github.com/joycepontesf/cypress-curso-basico.git
```

Ainda no terminal, navegue até a pasta já clonada em sua máquina e execute o comando abaixo para instalar as dependências usadas no projeto:

```bash
npm install
```

### Executando Testes

A suíte de testes contida neste projeto pode ser executada no modo Desktop ou Mobile Viewport.

#### Desktop

Em seu terminal, utilize os scripts abaixo para rodar os testes

`npm test` - para executar os testes no modo headless.

`npm run cy:open` - para abrir o Cypress no modo interativo.

#### Mobile

`npm run cy:mobile` - para rodar os testes simulando um dispositivo 410x860

### Dúvidas

Surgiu alguma dúvida sobre este projeto? Estou disponível em [Joyce Pontes](https://www.linkedin.com/in/joycepontes/).