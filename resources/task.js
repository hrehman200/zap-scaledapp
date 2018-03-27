const listTasks = (z, bundle) => {
    return z.request({
        url: '{{bundle.authData.apiUrl}}/tasks',
    }).then((response) => {
        z.console.log(bundle.authData);
        z.console.log(response);
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const searchTasks = (z, bundle) => {
    return z.request({
        url: bundle.authData.apiUrl + '/tasks',
    }).then((response) => {
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
            "amount": bundle.inputData.amount,
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

// This file exports a Task resource. The definition below contains all of the keys available,
// and implements the list and create methods.
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
    // The list method on this resource becomes a Trigger on the app. Zapier will use polling to watch for new records
    list: {
        display: {
            label: 'New Task',
            description: 'Trigger when a new task is added.',
        },
        operation: {
            inputFields: [
                //{key: 'style', type: 'string', helpText: 'Explain what style of cuisine this is.'},
            ],
            perform: listTasks,
            sample: sample
        },
    },

    // The create method on this resource becomes a Write on this app
    create: {
        display: {
            label: 'Create Task',
            description: 'Creates a new task.',
        },
        operation: {
            inputFields: [
                {key: 'amount', required: true, type: 'number', label: 'Amount'},
                {key: 'invoice_id', required: true, type: 'integer', label: 'Invoice ID'}
            ],
            perform: createTask,
            sample: sample
        },
    },
    // The search method on this resource becomes a Search on this app
    search: {
        display: {
            label: 'Find Task',
            description: 'Finds an existing task by email.',
        },
        operation: {
            inputFields: [
                {key: 'email', required: true, type: 'string'},
            ],
            perform: searchTasks,
            sample: sample
        }
    },

    sample: sample,

    outputFields: [
        {key: 'id', label: 'ID'},
        {key: 'amount', label: 'Amount'},
        {key: 'invoice_id', label: 'Invoice ID'}
    ]
};


