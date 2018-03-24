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

let createdUserId = '';

describe('Zap-ScaledApp', () => {

    it('should create a new user', (done) => {
        const bundle = {
            inputData: {
                "first_name": "John",
                "last_name": "Doe",
                "email": "johndoe@isp.com",
                "account_key": "123456",
                "phone": "(212) 555-1212",
                "registered": false,
                "confirmed": false,
                "oauth_user_id": 1,
                "oauth_provider_id": 1,
                "notify_sent": false,
                "notify_viewed": false,
                "notify_paid": false,
                "notify_approved": false,
                "is_admin": false,
                "permissions": 1
            },
            authData: authData
        };

        appTester(App.resources.user.create.operation.perform, bundle)
            .then((results) => {
                const user = results;
                createdUserId = user.id;
                user.last_name.should.eql('User 1');
                done();
            })
            .catch(done);
    });

    it('should list existing users', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.user.list.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const user = results[0];
                if(user.last_name != null) {
                    user.last_name.should.eql('Admin');
                }
                done();
            })
            .catch(done);
    });

    it('should search user with email sys@admin.com', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.user.search.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const user = results[0];
                if(user.email != null) {
                    user.email.should.eql('sys@admin.com');
                }
                done();
            })
            .catch(done);
    });

    it('should get user with id 1', (done) => {
        const bundle = {
            inputData: {
                id: 1
            },
            authData: authData
        };

        appTester(App.resources.user.get.operation.perform, bundle)
            .then((results) => {
                const user = results;
                user.id.should.eql(1);
                done();
            })
            .catch(done);
    });

    /*it('should update user with id '+createdUserId, (done) => {
        const bundle = {
            inputData: {
                id: 1,
                shipping_address1: "10 Main St UPDATED",
            },
            authData: authData
        };

        appTester(App.creates.userUpdate.operation.perform, bundle)
            .then((results) => {
                const user = results;
                user.shipping_address1.should.eql('10 Main St UPDATED');
                done();
            })
            .catch(done);
    });

    it('should delete user with id 1', (done) => {
        const bundle = {
            inputData: {
                id: 1
            },
            authData: authData
        };

        appTester(App.creates.userDelete.operation.perform, bundle)
            .then((results) => {
                const user = results;
                user.id.should.eql(1);
                done();
            })
            .catch(done);
    });*/
});
