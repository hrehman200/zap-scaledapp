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

    it('should list existing quotes', (done) => {
        const bundle = {
            inputData: {},
            authData: authData
        };

        appTester(App.triggers.quote.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const quote = results[0];
                if (quote.id != null) {
                    quote.id.should.eql(1);
                }
                done();
            })
            .catch(done);
    });
});
