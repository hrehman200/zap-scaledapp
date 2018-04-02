require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const config = require('../config');
const appTester = zapier.createAppTester(App);

const authData = {
    apiUrl: config.api.base_url,
    apiKey: config.api.token
};

describe('Projects', () => {

    let createdId = '';

    it('should create a new project', (done) => {
        const bundle = {
            inputData: {
                "name": "Sample",
                "client_id": 5,
                "task_rate": 10
            },
            authData: authData
        };

        appTester(App.resources.project.create.operation.perform, bundle)
            .then((results) => {
                const project = results;
                createdId = project.id;
                project.name.should.eql('Sample');
                project.task_rate.should.eql(10);
                done();
            })
            .catch(done);
    });

    it('should list existing projects', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.project.list.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);

                const project = results[0];
                project.name.should.eql('Sample');
                done();
            })
            .catch(done);
    });

    it('should get project with id '+createdId, (done) => {
        const bundle = {
            inputData: {
                id: createdId
            },
            authData: authData
        };

        appTester(App.resources.project.get.operation.perform, bundle)
            .then((results) => {
                const project = results;
                project.id.should.eql(createdId);
                done();
            })
            .catch(done);
    });

    it('should update project with id '+createdId, (done) => {
        const bundle = {
            inputData: {
                "id": createdId,
                "name": "Sample updated",
                "task_rate": 20,
            },
            authData: authData
        };

        appTester(App.creates.projectUpdate.operation.perform, bundle)
            .then((results) => {
                const project = results;
                project.name.should.eql('Sample updated');
                project.task_rate.should.eql(20);
                done();
            })
            .catch(done);
    });

    it('should delete project that was created', (done) => {
        const bundle = {
            inputData: {
                id: createdId
            },
            authData: authData
        };

        appTester(App.creates.projectDelete.operation.perform, bundle)
            .then((results) => {
                const project = results;
                project.id.should.eql(createdId);
                done();
            })
            .catch(done);
    });
});
