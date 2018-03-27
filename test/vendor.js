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

let createdId = 0;

describe('Vendors', () => {

    it('should create a new vendor', (done) => {
        const bundle = {
            inputData: {
                user_id: 1,
                account_key: "fel2zddn0pznuiavuxcvszwclidi6fkp",
                address1: "10 Main St.",
                address2: "1st Floor",
                city: "New York",
                state: "NY",
                postal_code: 10010,
                country_id: 840,
                work_phone: "(212) 555-1212",
                private_notes: "Notes...",
                last_login: "2016-01-01 12:10:00",
                website: "http://www.example.com",
                is_deleted: false,
                vat_number: "123456",
                id_number: "123456"
            },
            authData: authData
        };

        appTester(App.resources.vendor.create.operation.perform, bundle)
            .then((results) => {
                const vendor = results;
                vendor.work_phone.should.eql('(212) 555-1212');
                createdId = vendor.id;
                done();
            })
            .catch(done);
    });

    it('should list existing vendors', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.vendor.list.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const vendor = results[0];
                if(vendor.name != null) {
                    vendor.name.should.eql('haris');
                }
                done();
            })
            .catch(done);
    });

    it('should search vendor with email hrehman200@gmail.com', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.vendor.search.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const vendor = results[0];
                if(vendor.name != null) {
                    vendor.name.should.eql('haris');
                }
                done();
            })
            .catch(done);
    });

    it('should get vendor with id 1', (done) => {
        const bundle = {
            inputData: {
                id: 1
            },
            authData: authData
        };

        appTester(App.resources.vendor.get.operation.perform, bundle)
            .then((results) => {
                const vendor = results;
                vendor.name.should.eql('haris');
                done();
            })
            .catch(done);
    });

    it('should update vendor with id 1', (done) => {
        const bundle = {
            inputData: {
                id: 1,
                work_phone: "923139431791",
            },
            authData: authData
        };

        appTester(App.creates.vendorUpdate.operation.perform, bundle)
            .then((results) => {
                const vendor = results;
                vendor.work_phone.should.eql('923139431791');
                done();
            })
            .catch(done);
    });

    it('should delete vendor with id 1', (done) => {
        const bundle = {
            inputData: {
                id: 1
            },
            authData: authData
        };

        appTester(App.creates.vendorDelete.operation.perform, bundle)
            .then((results) => {
                const vendor = results;
                vendor.id.should.eql(1);
                done();
            })
            .catch(done);
    });
});
