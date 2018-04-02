const listProjects = (z, bundle) => {
    return z.request({
        url: '{{bundle.authData.apiUrl}}/projects',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const getProject = (z, bundle) => {
    return z.request({
        url: `${bundle.authData.apiUrl}/projects/${bundle.inputData.id}`,
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        return res.data;
    });
};

const createProject = (z, bundle) => {
    const requestOptions = {
        url: bundle.authData.apiUrl + '/projects',
        method: 'POST',
        body: JSON.stringify({
            "name": bundle.inputData.name,
            'client_id': bundle.inputData.client_id,
            "task_rate": bundle.inputData.task_rate,
        })
    };

    return z.request(requestOptions)
        .then((response) => {
            let res = z.JSON.parse(response.content);
            if(res.message) {
                throw new Error(res.message);
            }
            return res.data;
        });
};


const sample = {
    "id": 1,
    "name": "Sample",
    "client_id": 1,
    "updated_at": 1451160233,
    "archived_at": 1451160233,
    "is_deleted": false,
    "task_rate": 10
};

const inputFields = [
    {key: 'name', required: true, type: 'string', label:'Name' },
    {key: 'client_id', required: true, type: 'integer', label: 'Client ID', dynamic: 'client.id.email'},
    {key: 'task_rate', required: true, type: 'number', label: 'Task Rate'},
];

module.exports = {
    key: 'project',
    noun: 'Project',

    get: {
        display: {
            label: 'Get Project',
            description: 'Gets a project.',
        },
        operation: {
            inputFields: [
                {key: 'id', required: true},
            ],
            perform: getProject,
            sample: sample
        }
    },

    list: {
        display: {
            label: 'New Project',
            description: 'Trigger when a new project is added.',
        },
        operation: {
            inputFields: [
            ],
            perform: listProjects,
            sample: sample
        },
    },

    create: {
        display: {
            label: 'Create Project',
            description: 'Creates a new project.',
        },
        operation: {
            inputFields: inputFields,
            perform: createProject,
            sample: sample
        },
    },

    sample: sample,

    outputFields: [
        {key: 'name', label: 'Project Key'},
        {key: 'client_id', label: 'Client ID'},
        {key: 'Task Rate', label: 'Task Rate'}

    ]
};


