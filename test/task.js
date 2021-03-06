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

describe('Tasks', () => {

    let createdId = 0;

    it('should create a new task', (done) => {
        const bundle = {
            inputData: {
                invoice_id: 20
            },
            authData: authData
        };

        appTester(App.resources.task.create.operation.perform, bundle)
            .then((results) => {
                const task = results;
                createdId = task.id;
                createdId.should.greaterThan(0);
                done();
            })
            .catch(done);
    });

    it('should list existing tasks', (done) => {
        const bundle = {
            inputData: {
            },
            authData: authData
        };

        appTester(App.resources.task.list.operation.perform, bundle)
            .then((results) => {
                results.length.should.above(0);
                done();
            })
            .catch(done);
    });

    it('should get task with id', (done) => {
        const bundle = {
            inputData: {
                id: createdId
            },
            authData: authData
        };

        appTester(App.resources.task.get.operation.perform, bundle)
            .then((results) => {
                const task = results;
                task.id.should.eql(createdId);
                done();
            })
            .catch(done);
    });

    it('should update task with id', (done) => {
        const bundle = {
            inputData: {
                id: createdId,
                name: "GST 2",
            },
            authData: authData
        };

        appTester(App.creates.taskUpdate.operation.perform, bundle)
            .then((results) => {
                const task = results;
                task.id.should.eql(createdId);
                done();
            })
            .catch(done);
    });

    it('should delete task with id', (done) => {
        const bundle = {
            inputData: {
                id: createdId
            },
            authData: authData
        };

        appTester(App.creates.taskDelete.operation.perform, bundle)
            .then((results) => {
                const task = results;
                task.id.should.eql(createdId);
                done();
            })
            .catch(done);
    });
});
