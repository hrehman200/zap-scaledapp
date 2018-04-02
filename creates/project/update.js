const Project = require('./../../resources/project');

module.exports = {
    key: 'projectUpdate',
    noun: 'Project',
    display: {
        label: 'Update Project',
        description: 'Updates a project.'
    },
    operation: {
        inputFields: Project.inputFields,
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/projects/' + bundle.inputData.id,
                method: 'PUT',
                body: JSON.stringify({
                    "name": bundle.inputData.name,
                    'client_id': bundle.inputData.client_id,
                    "task_rate": bundle.inputData.task_rate,
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

        sample: Project.sample,
        outputFields: Project.outputFields
    }
};
