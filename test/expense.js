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

describe('Expenses', () => {

    let createdId = '';

    it('should create a new expense', (done) => {
        const bundle = {
            inputData: {
                "private_notes": "Notes...",
                "public_notes": "The public notes",
                "should_be_invoiced": false,
                "updated_at": 1451160233,
                "archived_at": 1451160233,
                "transaction_id": 1,
                "transaction_reference": "",
                "bank_id": 1,
                "expense_currency_id": 1,
                "expense_category_id": 1,
                "amount": "17.5",
                "expense_date": "2016-01-01",
                "exchange_rate": "",
                "invoice_currency_id": 1,
                "is_deleted": false,
                "tax_name1": "VAT",
                "tax_name2": "Upkeep",
                "tax_rate1": "17.5",
                "tax_rate2": "30.0",
                "client_id": 5,
                "invoice_id": 1,
                "vendor_id": 1
            },
            authData: authData
        };

        appTester(App.resources.expense.create.operation.perform, bundle)
            .then((results) => {
                const expense = results;
                createdId = expense.id;
                expense.public_notes.should.eql('The public notes');
                done();
            })
            .catch(done);
    });

    it('should list existing expenses', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.expense.list.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);
                done();
            })
            .catch(done);
    });

    it('should get expense with id '+createdId, (done) => {
        const bundle = {
            inputData: {
                id: createdId
            },
            authData: authData
        };

        appTester(App.resources.expense.get.operation.perform, bundle)
            .then((results) => {
                const expense = results;
                expense.id.should.eql(createdId);
                done();
            })
            .catch(done);
    });

    it('should update expense with id '+createdId, (done) => {
        const bundle = {
            inputData: {
                id: createdId,
                amount: 10.5
            },
            authData: authData
        };

        appTester(App.creates.expenseUpdate.operation.perform, bundle)
            .then((results) => {
                const expense = results;
                expense.amount.should.eql(10.5);
                done();
            })
            .catch(done);
    });

    it('should delete expense that was created', (done) => {
        const bundle = {
            inputData: {
                id: createdId
            },
            authData: authData
        };

        appTester(App.creates.expenseDelete.operation.perform, bundle)
            .then((results) => {
                const expense = results;
                expense.id.should.eql(createdId);
                done();
            })
            .catch(done);
    });
});
