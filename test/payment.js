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

describe('Payments', () => {

    let createdId = '';

    it('should create a new payment', (done) => {
        const bundle = {
            inputData: {
                "invoice_id": 5,
                'amount': 10.20,
                "private_notes": 'Payment notes',
            },
            authData: authData
        };

        appTester(App.resources.payment.create.operation.perform, bundle)
            .then((results) => {
                const payment = results;
                createdId = payment.id;
                payment.private_notes.should.eql('Payment notes');
                done();
            })
            .catch(done);
    });

    it('should list existing payments', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.payment.list.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const payment = results[0];
                if(payment.private_notes != null) {
                    payment.private_notes.should.eql('Payment notes');
                }
                done();
            })
            .catch(done);
    });

    it('should get payment with id '+createdId, (done) => {
        const bundle = {
            inputData: {
                id: createdId
            },
            authData: authData
        };

        appTester(App.resources.payment.get.operation.perform, bundle)
            .then((results) => {
                const payment = results;
                payment.id.should.eql(createdId);
                done();
            })
            .catch(done);
    });

    it('should update payment with id '+createdId, (done) => {
        const bundle = {
            inputData: {
                id: createdId,
                private_notes: 'updated notes'
            },
            authData: authData
        };

        appTester(App.creates.paymentUpdate.operation.perform, bundle)
            .then((results) => {
                const payment = results;
                payment.private_notes.should.eql('updated notes');
                done();
            })
            .catch(done);
    });

    it('should delete payment that was created', (done) => {
        const bundle = {
            inputData: {
                id: createdId
            },
            authData: authData
        };

        appTester(App.creates.paymentDelete.operation.perform, bundle)
            .then((results) => {
                const payment = results;
                payment.id.should.eql(createdId);
                done();
            })
            .catch(done);
    });
});
