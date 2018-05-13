require('should');

const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../index');
const config = require('../config');
const appTester = zapier.createAppTester(App);

const authData = {
    apiUrl: config.api.base_url,
    apiKey: config.api.token
};

describe('Credits', () => {

    let createdId = '';

    it('should create a new credit', (done) => {
        const bundle = {
            inputData: {
                "client_id": 5,
                'amount': 10.20,
                "private_notes": 'The private notes',
                "public_notes": 'The public notes'
            },
            authData: authData
        };

        appTester(App.resources.credit.create.operation.perform, bundle)
            .then((results) => {
                const credit = results;
                createdId = credit.id;
                credit.public_notes.should.eql('The public notes');
                done();
            })
            .catch(done);
    });

    it('should list existing credits', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.credit.list.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const credit = results[0];
                if(credit.amount != null) {
                    credit.amount.should.eql(10.20);
                }
                done();
            })
            .catch(done);
    });

    it('should get credit with id '+createdId, (done) => {
        const bundle = {
            inputData: {
                id: createdId
            },
            authData: authData
        };

        appTester(App.resources.credit.get.operation.perform, bundle)
            .then((results) => {
                const credit = results;
                credit.id.should.eql(createdId);
                done();
            })
            .catch(done);
    });

    it('should update credit with id '+createdId, (done) => {
        const bundle = {
            inputData: {
                id: createdId,
                amount: 10.5
            },
            authData: authData
        };

        appTester(App.creates.creditUpdate.operation.perform, bundle)
            .then((results) => {
                const credit = results;
                credit.amount.should.eql(10.5);
                done();
            })
            .catch(done);
    });

    it('should delete credit that was created', (done) => {
        const bundle = {
            inputData: {
                id: createdId
            },
            authData: authData
        };

        appTester(App.creates.creditDelete.operation.perform, bundle)
            .then((results) => {
                const credit = results;
                credit.id.should.eql(createdId);
                done();
            })
            .catch(done);
    });
});
