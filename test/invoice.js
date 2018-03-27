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

let invoiceNo = +new Date();

describe('Invoices', () => {

    it('should create a new invoice', (done) => {
        const bundle = {
            inputData: {
                "client_id": 5,
                "invoice_number": invoiceNo,
                "private_notes": "Private Notes...",
                "public_notes": "Public Notes..."
            },
            authData: authData
        };

        appTester(App.resources.invoice.create.operation.perform, bundle)
            .then((results) => {
                const invoice = results;
                invoice.public_notes.should.eql('Public Notes...');
                done();
            })
            .catch(done);
    });

    it('should list existing invoices', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.invoice.list.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const invoice = results[0];
                if(invoice.name != null) {
                    invoice.name.should.eql('haris');
                }
                done();
            })
            .catch(done);
    });

    it('should search invoice with email hrehman200@gmail.com', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.invoice.search.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const invoice = results[0];
                if(invoice.name != null) {
                    invoice.name.should.eql('haris');
                }
                done();
            })
            .catch(done);
    });

    it('should get invoice with id 2', (done) => {
        const bundle = {
            inputData: {
                id: 2
            },
            authData: authData
        };

        appTester(App.resources.invoice.get.operation.perform, bundle)
            .then((results) => {
                const invoice = results;
                invoice.id.should.eql(2);
                done();
            })
            .catch(done);
    });

    it('should update invoice with id 2', (done) => {
        const bundle = {
            inputData: {
                id: 2,
                client_id: 5,
                invoice_number: invoiceNo+1,
                public_notes: "Updated public notes"
            },
            authData: authData
        };

        appTester(App.creates.invoiceUpdate.operation.perform, bundle)
            .then((results) => {
                const invoice = results;
                invoice.id.should.eql(2);
                done();
            })
            .catch(done);
    });

    it('should delete invoice with id 1', (done) => {
        const bundle = {
            inputData: {
                id: 1
            },
            authData: authData
        };

        appTester(App.creates.invoiceDelete.operation.perform, bundle)
            .then((results) => {
                const invoice = results;
                invoice.id.should.eql(1);
                done();
            })
            .catch(done);
    });
});
