const listTasks = (z, bundle) => {
    return z.request({
        url: '{{bundle.authData.apiUrl}}/tasks',
    }).then((response) => {
        z.console.log(response);
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const getTask = (z, bundle) => {
    return z.request({
        url: `${bundle.authData.apiUrl}/tasks/${bundle.inputData.id}`,
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        return res.data;
    });
};

const createTask = (z, bundle) => {
    const requestOptions = {
        url: bundle.authData.apiUrl + '/tasks',
        method: 'POST',
        body: JSON.stringify({
            "invoice_id": bundle.inputData.invoice_id
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


const sample =  {
    "id": 1,
    "amount": 10,
    "invoice_id": 1
};

module.exports = {
    key: 'task',
    noun: 'Task',
    get: {
        display: {
            label: 'Get Task',
            description: 'Gets a task.',
        },
        operation: {
            inputFields: [
                {key: 'id', required: true},
            ],
            perform: getTask,
            sample: sample
        }
    },
    list: {
        display: {
            label: 'New Task',
            description: 'Trigger when a new task is added.',
        },
        operation: {
            inputFields: [
            ],
            perform: listTasks,
            sample: sample
        },
    },

    create: {
        display: {
            label: 'Create Task',
            description: 'Creates a new task.',
        },
        operation: {
            inputFields: [
                {key: 'invoice_id', required: true, type: 'integer', label: 'Invoice ID'}
            ],
            perform: createTask,
            sample: sample
        },
    },

    sample: sample,

    outputFields: [
        {key: 'id', label: 'ID'},
        {key: 'amount', label: 'Amount'},
        {key: 'invoice_id', label: 'Invoice ID'}
    ]
};


