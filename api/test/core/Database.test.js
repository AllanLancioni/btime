'use strict'

const Database = require('../../src/core/Database')
const chai = require('chai')

const expect = chai.expect

describe('Database', () => {

    describe('connect with database', () => {

        it('should set connection string parameters', () => {
            expect(() => Database.connectionString = {
                drive : 'mongodb',
                user  : 'root',
                pwd   : 'btime',
                dbName: 'btime',
                port  : 17539,
                host  : 'ds117539.mlab.com'
            }).to.not.throw()
        })

        it('should get connection string concat', () => {
            expect(Database.connectionString).to.not.be.equal(null)
        })

        it('should connect with database', async () => {
            expect(await Database.createConnection()).to.be.equal(true);
        })

        it('should get cached connection with database', async () => {
            expect(() => Database.conn).to.not.throw();
            expect(Database.conn).to.be.equal(Database.conn);
        })

    })

})