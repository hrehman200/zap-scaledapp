require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const config = require('../config');
const appTester = zapier.createAppTester(App);

const authData = {
    apiUrl: config.api.base_url,
    apiKey: config.api.token
};

describe('Zap-ScaledApp', () => {

    it('should list existing sizes', (done) => {
        const bundle = {
            inputData: {},
            authData: authData
        };

        appTester(App.triggers.size.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const size = results[0];
                if (size.name != null) {
                    size.name.should.eql("1 - 3");
                }
                done();
            })
            .catch(done);
    });
});
