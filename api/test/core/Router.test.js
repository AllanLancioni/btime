'use strict'

const { SingleRoute, RouteGroup } = require('../../src/core/router')
const chai = require('chai')
// const chaiAsPromised = require('chai-as-promised')
// chai.use(chaiAsPromised);
const expect = chai.expect
chai.should()

describe('Router', () => {

    describe('RouterGroup', () => {

        it('should set a route', async () => {
            expect(await new SingleRoute('GET', '/test', () => 'OK!')).to.be.instanceOf(SingleRoute)
        })

    })

})