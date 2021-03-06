const listCredits = (z, bundle) => {
    return z.request({
        url: '{{bundle.authData.apiUrl}}/credits',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const searchCredits = (z, bundle) => {
    return z.request({
        url: bundle.authData.apiUrl + '/credits',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const getCredit = (z, bundle) => {
    return z.request({
        url: `${bundle.authData.apiUrl}/credits/${bundle.inputData.id}`,
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        return res.data;
    });
};

const createCredit = (z, bundle) => {
    const requestOptions = {
        url: bundle.authData.apiUrl + '/credits',
        method: 'POST',
        body: JSON.stringify({
            "client_id": bundle.inputData.client_id,
            'amount': bundle.inputData.amount,
            "private_notes": bundle.inputData.private_notes,
            "public_notes": bundle.inputData.public_notes
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
    "amount": 10,
    "client_id": 1,
    "private_notes": "Notes...",
    "public_notes": "Notes..."
};

const inputFields = [
    {key: 'client_id', required: true, type: 'integer', label: 'Client ID'},
    {key: 'private_notes', required: true, type: 'text', label: 'Private Notes'},
    {key: 'public_notes', required: true, type: 'text', label: 'Public Notes'}
];

module.exports = {
    key: 'credit',
    noun: 'Credit',

    get: {
        display: {
            label: 'Get Credit',
            description: 'Gets a credit.',
        },
        operation: {
            inputFields: [
                {key: 'id', required: true},
            ],
            perform: getCredit,
            sample: sample
        }
    },

    list: {
        display: {
            label: 'New Credit',
            description: 'Trigger when a new credit is added.',
        },
        operation: {
            inputFields: [
            ],
            perform: listCredits,
            sample: sample
        },
    },

    create: {
        display: {
            label: 'Create Credit',
            description: 'Creates a new credit.',
        },
        operation: {
            inputFields: inputFields,
            perform: createCredit,
            sample: sample
        },
    },

    sample: sample,

    outputFields: [
        {key: 'client_id', label: 'Client ID'},
        {key: 'amount', label: 'Amount'},
        {key: 'private_notes', label: 'Private Notes'},
        {key: 'public_notes', label: 'Public Notes'}
    ]
};


