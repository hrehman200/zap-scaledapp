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

describe('Languages', () => {

    it('should list existing languages', (done) => {
        const bundle = {
            inputData: {},
            authData: authData
        };

        appTester(App.triggers.language.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const language = results[0];
                if (language.id != null) {
                    language.id.should.eql(1);
                }
                done();
            })
            .catch(done);
    });
});
