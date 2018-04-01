require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const config = require('../config');
const appTester = zapier.createAppTester(App);

const authData = {
    apiUrl: config.api.base_url,
    apiKey: config.api.token
};

describe('Products', () => {

    let createdId = '';

    it('should create a new product', (done) => {
        const bundle = {
            inputData: {
                "product_key": "Item",
                "notes": "Notes...",
                "cost": 10,
                "quantity": 10
            },
            authData: authData
        };

        appTester(App.resources.product.create.operation.perform, bundle)
            .then((results) => {
                const product = results;
                createdId = product.id;
                product.product_key.should.eql('Item');
                product.qty.should.eql(10);
                done();
            })
            .catch(done);
    });

    it('should list existing products', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.product.list.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const product = results[0];
                product.product_key.should.eql('Item');
                done();
            })
            .catch(done);
    });

    it('should get product with id '+createdId, (done) => {
        const bundle = {
            inputData: {
                id: createdId
            },
            authData: authData
        };

        appTester(App.resources.product.get.operation.perform, bundle)
            .then((results) => {
                const product = results;
                product.id.should.eql(createdId);
                done();
            })
            .catch(done);
    });

    it('should update product with id '+createdId, (done) => {
        const bundle = {
            inputData: {
                "id": createdId,
                "product_key": "Item 2",
                "notes": "Notes 2...",
                "cost": 20,
                "quantity": 20,
            },
            authData: authData
        };

        appTester(App.creates.productUpdate.operation.perform, bundle)
            .then((results) => {
                const product = results;
                product.product_key.should.eql('Item 2');
                product.cost.should.eql(20);
                product.qty.should.eql(20);
                done();
            })
            .catch(done);
    });

    it('should delete product that was created', (done) => {
        const bundle = {
            inputData: {
                id: createdId
            },
            authData: authData
        };

        appTester(App.creates.productDelete.operation.perform, bundle)
            .then((results) => {
                const product = results;
                product.id.should.eql(createdId);
                done();
            })
            .catch(done);
    });
});
