describe('Blog', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000/')
  })

  it('login form is shown', function () {
    cy.contains('login').click()
  })
})

describe('Login', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const testUser = {
      name: 'Test Admin',
      username: 'admin',
      password: 'admin',
    }

    cy.request('POST', 'http://localhost:3001/api/users', testUser)
  })

  it('suceeds with correct credentials', function () {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('admin')
    cy.get('#password').type('admin')
    cy.get('#login-button').click()

    cy.contains('Test Admin Logged In')
  })

  it('fails with incorrect credentials', function () {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('admin')
    cy.get('#password').type('abcd')
    cy.get('#login-button').click()

    cy.contains('wrong username or password')
  })
})

describe('When logged in', function () {
  beforeEach(function () {
    const testUser = {
      name: 'Test Admin',
      username: 'admin',
      password: 'admin',
    }
    const testBlog = {
      title: 'Cypress Blog',
      author: 'Cypress',
      url: 'asdasd',
      likes: 20,
    }

    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    cy.request('POST', 'http://localhost:3001/api/users', testUser)
    cy.login(testUser)

    cy.createBlog(testBlog)
    cy.visit('http://localhost:3000')
  })

  it('A blog can be created', function () {
    cy.contains('Test Admin Logged In')
    cy.get('#newBlog').click()
    cy.get('#title').type('TEST')
    cy.get('#author').type('tester')
    cy.get('#url').type('qweqweqwe')
    cy.get('#create').click()

    cy.contains('a new blog TEST by tester added')
  })
  it('user can like a blog', function () {
    cy.get('#view').click()
    cy.get('#like').click()
    cy.contains(21)
  })
  it('user can delete a blog', function () {
    cy.get('#view').click()
    cy.get('#delete').click()
    cy.contains('Cypress Blog Cypress').should('not.exist')
  })
})
