const Task = require('./../../resources/task');

module.exports = {
    key: 'taskDelete',
    noun: 'Task',
    display: {
        label: 'Delete Task',
        description: 'Deletes a task.'
    },
    operation: {
        inputFields: [
            {key: 'task_id', required: true, type: 'integer', label: 'Task ID'},
        ],
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/tasks/' + bundle.inputData.id,
                method: 'DELETE',
                body: JSON.stringify({
                    'name': 'bla bla'
                })
            });

            return promise.then((response) => {
                let res = z.JSON.parse(response.content);
                if(res.message) {
                    throw new Error(res.message);
                }
                res = res.data;
                return res;
            });
        },

        sample: Task.sample,
        outputFields: Task.outputFields
    }
};
