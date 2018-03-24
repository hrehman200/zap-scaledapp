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

describe('Zap-ScaledApp', () => {

    it('should list existing clients', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.client.list.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const client = results[0];
                if(client.name != null) {
                    client.name.should.eql('haris');
                }
                done();
            })
            .catch(done);
    });

    it('should search client with email hrehman200@gmail.com', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.client.search.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const client = results[0];
                if(client.name != null) {
                    client.name.should.eql('haris');
                }
                done();
            })
            .catch(done);
    });

    it('should get client with id 1', (done) => {
        const bundle = {
            inputData: {
                id: 1
            },
            authData: authData
        };

        appTester(App.resources.client.get.operation.perform, bundle)
            .then((results) => {
                const client = results;
                client.name.should.eql('haris');
                done();
            })
            .catch(done);
    });

    it('should create a new client', (done) => {
        const bundle = {
            inputData: {
                user_id: 1,
                name: 'haris 2',
                account_key: "123456",
                address1: "10 Main St.",
                address2: "1st Floor",
                city: "New York",
                state: "NY",
                postal_code: 10010,
                country_id: 840,
                work_phone: "(212) 555-1212",
                private_notes: "Notes...",
                public_notes: "Notes...",
                last_login: "2016-01-01 12:10:00",
                website: "http://www.example.com",
                industry_id: '05135e268d5e47f6820b0cd6412be07f',
                size_id: '2945d9c624f446deb90d7a35e8c0e308',
                is_deleted: false,
                payment_terms: '01857b18184f4d849453a3f7a850f7bc',
                custom_value1: "Value",
                custom_value2: "Value",
                vat_number: "123456",
                id_number: "123456",
                language_id: 1,
                task_rate: 10,
                shipping_address1: "10 Main St.",
                shipping_address2: "1st Floor",
                shipping_city: "New York",
                shipping_state: "NY",
                shipping_postal_code: 10010,
                shipping_country_id: 840,
                show_tasks_in_portal: false
            },
            authData: authData
        };

        appTester(App.resources.client.create.operation.perform, bundle)
            .then((results) => {
                const client = results;
                client.shipping_address1.should.eql('10 Main St.');
                done();
            })
            .catch(done);
    });

    it('should update client with id 1', (done) => {
        const bundle = {
            inputData: {
                id: 1,
                shipping_address1: "10 Main St UPDATED",
            },
            authData: authData
        };

        appTester(App.creates.clientUpdate.operation.perform, bundle)
            .then((results) => {
                const client = results;
                client.shipping_address1.should.eql('10 Main St UPDATED');
                done();
            })
            .catch(done);
    });

    it('should delete client with id 1', (done) => {
        const bundle = {
            inputData: {
                id: 1
            },
            authData: authData
        };

        appTester(App.creates.clientDelete.operation.perform, bundle)
            .then((results) => {
                const client = results;
                client.id.should.eql(1);
                done();
            })
            .catch(done);
    });
});
