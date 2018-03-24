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

let createdCreditId = '';

describe('Zap-ScaledApp', () => {

    it('should create a new credit', (done) => {
        const bundle = {
            inputData: {
                "amount": 10,
                "client_id": '0aea423cbcda45339b3062f379d6d713',
                "private_notes": 'The private notes',
                "public_notes": 'The public notes'
            },
            authData: authData
        };

        appTester(App.resources.credit.create.operation.perform, bundle)
            .then((results) => {
                const credit = results;
                createdCreditId = credit.id;
                credit.last_name.should.eql('User 1');
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
                if(credit.last_name != null) {
                    credit.last_name.should.eql('User 1');
                }
                done();
            })
            .catch(done);
    });

    it('should search credit with email hrehman200@gmail.com', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.credit.search.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const credit = results[0];
                if(credit.email != null) {
                    credit.email.should.eql('testuser1@gmail.com');
                }
                done();
            })
            .catch(done);
    });

    it('should get credit with id '+createdCreditId, (done) => {
        const bundle = {
            inputData: {
                id: 1
            },
            authData: authData
        };

        appTester(App.resources.credit.get.operation.perform, bundle)
            .then((results) => {
                const credit = results;
                credit.id.should.eql(createdCreditId);
                done();
            })
            .catch(done);
    });

    /*it('should update credit with id '+createdCreditId, (done) => {
        const bundle = {
            inputData: {
                id: 1,
                shipping_address1: "10 Main St UPDATED",
            },
            authData: authData
        };

        appTester(App.creates.creditUpdate.operation.perform, bundle)
            .then((results) => {
                const credit = results;
                credit.shipping_address1.should.eql('10 Main St UPDATED');
                done();
            })
            .catch(done);
    });

    it('should delete credit with id 1', (done) => {
        const bundle = {
            inputData: {
                id: 1
            },
            authData: authData
        };

        appTester(App.creates.creditDelete.operation.perform, bundle)
            .then((results) => {
                const credit = results;
                credit.id.should.eql(1);
                done();
            })
            .catch(done);
    });*/
});
