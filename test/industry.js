require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const config = require('../config');
const appTester = zapier.createAppTester(App);

const authData = {
    apiUrl: config.api.base_url,
    apiKey: config.api.token
};

describe('Industries', () => {

    it('should list existing industries', (done) => {
        const bundle = {
            inputData: {},
            authData: authData
        };

        appTester(App.triggers.industry.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const industry = results[0];
                if (industry.name != null) {
                    industry.name.should.eql("Accounting & Legal");
                }
                done();
            })
            .catch(done);
    });
});
