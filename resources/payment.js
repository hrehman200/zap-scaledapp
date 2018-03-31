const listPayments = (z, bundle) => {
    return z.request({
        url: '{{bundle.authData.apiUrl}}/payments',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const getPayment = (z, bundle) => {
    return z.request({
        url: `${bundle.authData.apiUrl}/payments/${bundle.inputData.id}`,
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        return res.data;
    });
};

const createPayment = (z, bundle) => {
    const requestOptions = {
        url: bundle.authData.apiUrl + '/payments',
        method: 'POST',
        body: JSON.stringify({
            "invoice_id": bundle.inputData.invoice_id,
            'amount': bundle.inputData.amount,
            "private_notes": bundle.inputData.private_notes
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
    "invoice_id": 1,
    "private_notes": "Notes..."
};

const inputFields = [
    {key: 'invoice_id', required: true, type: 'integer', label: 'Invoice ID', dynamic:'invoice.id.invoice_number'},
    {key: 'amount', required: true, type: 'number', label: 'Amount'},
    {key: 'private_notes', required: true, type: 'text', label: 'Private Notes'}
];

module.exports = {
    key: 'payment',
    noun: 'Payment',

    get: {
        display: {
            label: 'Get Payment',
            description: 'Gets a payment.',
        },
        operation: {
            inputFields: [
                {key: 'id', required: true},
            ],
            perform: getPayment,
            sample: sample
        }
    },

    list: {
        display: {
            label: 'New Payment',
            description: 'Trigger when a new payment is added.',
        },
        operation: {
            inputFields: [
            ],
            perform: listPayments,
            sample: sample
        },
    },

    create: {
        display: {
            label: 'Create Payment',
            description: 'Creates a new payment.',
        },
        operation: {
            inputFields: inputFields,
            perform: createPayment,
            sample: sample
        },
    },

    sample: sample,

    outputFields: [
        {key: 'invoice_id', label: 'Invoice ID'},
        {key: 'private_notes', label: 'Private Notes'},
        {key: 'amount', label: 'Amount'},

    ]
};


