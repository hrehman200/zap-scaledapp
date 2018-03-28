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

describe('Documents', () => {

    let createdId = '';

    it('should create a new document', (done) => {
        const bundle = {
            inputData: {
                "name": 'sample.png',
                'type': 'png',
                "path": 'data/sample.png',
                "invoice_id": 20,
                "file": "https://cdn.zapier.com/storage/files/f6679cf77afeaf6b8426de8d7b9642fc.pdf"
            },
            authData: authData
        };

        appTester(App.resources.document.create.operation.perform, bundle)
            .then((results) => {
                const document = results;
                createdId = document.id;
                document.name.should.eql('sample.png');
                done();
            })
            .catch(done);
    });

    it('should list existing documents', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.document.list.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const document = results[0];
                if(document.name != null) {
                    document.name.should.eql('sample.png');
                }
                done();
            })
            .catch(done);
    });

    it('should search document with email hrehman200@gmail.com', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.document.search.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const document = results[0];
                if(document.email != null) {
                    document.email.should.eql('testuser1@gmail.com');
                }
                done();
            })
            .catch(done);
    });

    it('should get document with id '+createdId, (done) => {
        const bundle = {
            inputData: {
                id: createdId
            },
            authData: authData
        };

        appTester(App.resources.document.get.operation.perform, bundle)
            .then((results) => {
                const document = results;
                document.id.should.eql(createdId);
                done();
            })
            .catch(done);
    });

    it('should delete document that was created', (done) => {
        const bundle = {
            inputData: {
                id: createdId
            },
            authData: authData
        };

        appTester(App.creates.documentDelete.operation.perform, bundle)
            .then((results) => {
                const document = results;
                document.id.should.eql(createdId);
                done();
            })
            .catch(done);
    });
});
