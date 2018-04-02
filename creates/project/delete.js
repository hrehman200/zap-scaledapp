const Project = require('./../../resources/project');

module.exports = {
    key: 'projectDelete',
    noun: 'Project',
    display: {
        label: 'Delete Project',
        description: 'Deletes a project.'
    },
    operation: {
        inputFields: [
            {key: 'project_id', required: true, type: 'integer', label: 'Project ID'},
        ],
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/projects/' + bundle.inputData.id,
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

        sample: Project.sample,
        outputFields: Project.outputFields
    }
};
