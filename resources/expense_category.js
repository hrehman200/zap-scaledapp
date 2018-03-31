const listExpenseCategories = (z, bundle) => {
    return z.request({
        url: '{{bundle.authData.apiUrl}}/expense_categories',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const searchExpenseCategories = (z, bundle) => {
    return z.request({
        url: bundle.authData.apiUrl + '/expense_categories',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const getExpenseCategory = (z, bundle) => {
    return z.request({
        url: `${bundle.authData.apiUrl}/expense_categories/${bundle.inputData.id}`,
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        return res.data;
    });
};

const createExpenseCategory = (z, bundle) => {
    const requestOptions = {
        url: bundle.authData.apiUrl + '/expense_categories',
        method: 'POST',
        body: JSON.stringify({
            "name": bundle.inputData.name
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
    "updated_at": 1451160233,
    "archived_at": 1451160233
};

const inputFields = [
    {key: 'name', required: true, type: 'string', label: 'Name'}
];

module.exports = {
    key: 'expense_category',
    noun: 'Expense Category',

    get: {
        display: {
            label: 'Get Expense Category',
            description: 'Gets an expense category.',
        },
        operation: {
            inputFields: [
                {key: 'id', required: true},
            ],
            perform: getExpenseCategory,
            sample: sample
        }
    },

    list: {
        display: {
            label: 'New Expense Category',
            description: 'Trigger when a new expense category is added.',
        },
        operation: {
            inputFields: [
            ],
            perform: listExpenseCategories,
            sample: sample
        },
    },

    create: {
        display: {
            label: 'Create Expense Category',
            description: 'Creates a new expense category.',
        },
        operation: {
            inputFields: inputFields,
            perform: createExpenseCategory,
            sample: sample
        },
    },

    search: {
        display: {
            label: 'Find Expense Category',
            description: 'Finds an existing expense category.',
        },
        operation: {
            inputFields: [

            ],
            perform: searchExpenseCategories,
            sample: sample
        }
    },

    sample: sample,

    outputFields: [
        {key: 'id', label: 'ID'},
        {key: 'name', label: 'Name'},
        {key: 'updated_at', label: 'Updated At'},
        {key: 'archived_at', label: 'Archived At'}
    ]
};


