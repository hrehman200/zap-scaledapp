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

    it('should list existing countries', (done) => {
        const bundle = {
            inputData: {},
            authData: authData
        };

        appTester(App.triggers.country.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const country = results[0];
                if (country.id != null) {
                    country.name.should.eql('Afghanistan');
                }
                done();
            })
            .catch(done);
    });
});
