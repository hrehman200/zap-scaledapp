const Task = require('./../../resources/task');

module.exports = {
    key: 'taskUpdate',
    noun: 'Task',
    display: {
        label: 'Update Task',
        description: 'Updates a task.'
    },
    operation: {
        inputFields: Task.inputFields,
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/tasks/' + bundle.inputData.id,
                method: 'PUT',
                body: JSON.stringify({
                    "invoice_id": bundle.inputData.invoice_id,
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
