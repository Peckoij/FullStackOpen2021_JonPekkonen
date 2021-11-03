/* eslint-disable no-undef */
describe('Blog ', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })


    it('front page can be opened', function () {
        cy.contains('Blogs')
    })
    it('login form is shown', function () {
        cy.contains('username')
        cy.contains('password')
    })
    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('jpekkonen')
            cy.get('#password').type('parasSalasana1kina')
            cy.contains('login').click()
            cy.contains('Jon Pekkonen logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('jpekkonen')
            cy.get('#password').type('huonoinvääräsalasanauikinä')
            cy.contains('login').click()
            cy.contains('invalid username or password')
        })
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.get('#username').type('jpekkonen')
            cy.get('#password').type('parasSalasana1kina')
            cy.contains('login').click()
            cy.contains('Jon Pekkonen logged in')
        })
        it('a blog can be created', function () {
            cy.contains('create new blog').click()
            cy.get('#author').type('Cypress')
            cy.get('#title').type('Automated test cypress-blog ')
            cy.get('#url').type('cypress-testing.io')
            cy.get('#submitBlog').click()
            cy.contains('Blog posted succesfully!')
        })
        it('a blog can be liked', function () {
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('Blog liked succesfully!')
        })
        it('a blog can be removed', function () {
            cy.contains('Automated test cypress-blog Cypress').contains('view').click()
            cy.contains('delete').click()
            cy.contains('Blog removed succesfully!')
        })
        /*   it('blogs are sorted, most liked first', function() {
             cy.contains('view').click()
             cy.contains('likes').as('firstBlog')
           })
         */
    })
})