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

describe('Tax Rates', () => {

    let createdId = 0;

    it('should create a new tax_rate', (done) => {
        const bundle = {
            inputData: {
                name: "GST",
                rate: 1.25,
                is_inclusive: false
            },
            authData: authData
        };

        appTester(App.resources.tax_rate.create.operation.perform, bundle)
            .then((results) => {
                const tax_rate = results;
                tax_rate.rate.should.eql(1.25);
                createdId = tax_rate.id;
                done();
            })
            .catch(done);
    });

    it('should list existing tax_rates', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.tax_rate.list.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const tax_rate = results[0];
                if(tax_rate.name != null) {
                    tax_rate.name.should.eql('GST');
                }
                done();
            })
            .catch(done);
    });

    it('should get tax_rate with id', (done) => {
        const bundle = {
            inputData: {
                id: createdId
            },
            authData: authData
        };

        appTester(App.resources.tax_rate.get.operation.perform, bundle)
            .then((results) => {
                const tax_rate = results;
                tax_rate.name.should.eql('GST');
                done();
            })
            .catch(done);
    });

    it('should update tax_rate with id', (done) => {
        const bundle = {
            inputData: {
                id: createdId,
                name: "GST 2",
                rate: 1.5,
                is_inclusive: false
            },
            authData: authData
        };

        appTester(App.creates.taxRateUpdate.operation.perform, bundle)
            .then((results) => {
                const tax_rate = results;
                tax_rate.name.should.eql("GST 2");
                done();
            })
            .catch(done);
    });

    it('should delete tax_rate with id', (done) => {
        const bundle = {
            inputData: {
                id: createdId,
                name: 'testing',
                rate: 12,
                is_inclusive: false
            },
            authData: authData
        };

        appTester(App.creates.taxRateDelete.operation.perform, bundle)
            .then((results) => {
                const tax_rate = results;
                tax_rate.id.should.eql(createdId);
                done();
            })
            .catch(done);
    });
});
