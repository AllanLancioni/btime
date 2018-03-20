'use strict'

const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
const App = require('../src/core/App')
chai.use(chaiHttp);
chai.use(chaiAsPromised);

const baseUrl = 'http://localhost:8080';
const requester = chai.request('http://localhost:8080')


describe('Server', () => {

    describe('Init application', () => {

        it('should not throw any error', async () => {
            // expect( () => require('../src/server') ).to.not.throw()
        })

    })

    describe('Test routes', () => {
        it('should return "App works!" and status 200', async () => {
            requester.get('/')
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.be.text
                    expect(res).to.have.status(200)
                })
        })
        it('should an error 404 not found', async () => {
            requester.get('/oi')
                .end((err, res) => {
                    expect(err).to.not.be.null
                    expect(res).to.have.status(404)
                })
        })
        it('should be ok with authentication token', async () => {
            requester.get('/private')
                .set('authentication', 'oi')
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                })
        })
    })

})