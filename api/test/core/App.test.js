'use strict'

const App = require('../../src/core/App')
const chai = require('chai')
const expect = chai.expect

describe('App', () => {

    describe('Koa', () => {

        it('should return an cached instance of Koa', () => {
            expect(App.server).to.be.equal(App.server)
        })

        describe(`Abstraction of koa "use" method`, () => {

            it(`should throw an error`, () => {
                expect(App.use.bind('AAAAAAA')).to.throw()
            })
        })

    })

    describe('Server', () => {

        it(`should throw an error`, () => {
            expect(App.exit).to.throw();
        })

        it(`should init app don't throw an error`, () => {
            expect(App.init.bind(null, 8080)).to.not.throw()
            expect(App.exit).to.not.throw();
        })

    })

})