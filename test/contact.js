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

describe('Contacts', () => {

    let createdId = 0;

    it('should create a new contact', (done) => {
        const bundle = {
            inputData: {
                "first_name": 'Test',
                "last_name": 'User 1',
                "email": 'testuser1@gmail.com',
                'client_id': 5,
                "is_primary": true,
                "phone": '923139431791',
                "last_login": '2018-01-01 01:01:01',
                "send_invoice": true,
                "custom_value1": 'just',
                "custom_value2": 'testing'
            },
            authData: authData
        };

        appTester(App.resources.contact.create.operation.perform, bundle)
            .then((results) => {
                const contact = results;
                createdId = contact.id;
                contact.last_name.should.eql('User 1');
                done();
            })
            .catch(done);
    });

    it('should list existing contacts', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.contact.list.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const contact = results[0];
                if(contact.last_name != null) {
                    contact.last_name.should.eql('User 1');
                }
                done();
            })
            .catch(done);
    });

    it('should get contact with created id', (done) => {
        const bundle = {
            inputData: {
                id: createdId
            },
            authData: authData
        };

        appTester(App.resources.contact.get.operation.perform, bundle)
            .then((results) => {
                const contact = results;
                contact.id.should.eql(createdId);
                done();
            })
            .catch(done);
    });

    it('should update contact with created id', (done) => {
        const bundle = {
            inputData: {
                id: createdId,
                first_name: "Haris",
                last_name: "User 1",
                email: "testuser1@gmail.com"
            },
            authData: authData
        };

        appTester(App.creates.contactUpdate.operation.perform, bundle)
            .then((results) => {
                const contact = results;
                contact.id.should.eql(createdId);
                contact.first_name.should.eql('Haris');
                done();
            })
            .catch(done);
    });

    it('should delete contact with id 1', (done) => {
        const bundle = {
            inputData: {
                id: 1
            },
            authData: authData
        };

        appTester(App.creates.contactDelete.operation.perform, bundle)
            .then((results) => {
                const contact = results;
                contact.id.should.eql(1);
                done();
            })
            .catch(done);
    });
});
