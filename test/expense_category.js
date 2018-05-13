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

describe('Expense Categories', () => {

    let createdId = '';

    it('should create a new expense_category', (done) => {
        const bundle = {
            inputData: {
                "name": "Sample Expense Category " + (+new Date())
            },
            authData: authData
        };

        appTester(App.resources.expense_category.create.operation.perform, bundle)
            .then((results) => {
                const expense_category = results;
                createdId = expense_category.id;
                expense_category.name.should.containEql('Sample Expense Category');
                done();
            })
            .catch(done);
    });

    it('should list existing expense_category categories', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.expense_category.list.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const expense_category = results[0];
                if(expense_category.name != null) {
                    expense_category.name.should.containEql('Sample Expense Category');
                }
                done();
            })
            .catch(done);
    });

    it('should get expense_category with id '+createdId, (done) => {
        const bundle = {
            inputData: {
                id: createdId
            },
            authData: authData
        };

        appTester(App.resources.expense_category.get.operation.perform, bundle)
            .then((results) => {
                const expense_category = results;
                expense_category.id.should.eql(createdId);
                done();
            })
            .catch(done);
    });

    it('should update expense_category with id '+createdId, (done) => {

        let datetime = +new Date();

        const bundle = {
            inputData: {
                id: createdId,
                name: 'Updated Expense Category '+datetime
            },
            authData: authData
        };

        appTester(App.creates.expenseCategoryUpdate.operation.perform, bundle)
            .then((results) => {
                const expense_category = results;
                expense_category.name.should.eql('Updated Expense Category '+datetime);
                done();
            })
            .catch(done);
    });

    it('should delete expense_category that was created', (done) => {
        const bundle = {
            inputData: {
                id: createdId,
                name: +new Date()
            },
            authData: authData
        };

        appTester(App.creates.expenseCategoryDelete.operation.perform, bundle)
            .then((results) => {
                const expense_category = results;
                expense_category.id.should.eql(createdId);
                done();
            })
            .catch(done);
    });
});
