const listInvoices = (z, bundle) => {
    return z.request({
        url: '{{bundle.authData.apiUrl}}/invoices',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const searchInvoices = (z, bundle) => {
    return z.request({
        url: bundle.authData.apiUrl + '/invoices',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const getInvoice = (z, bundle) => {
    return z.request({
        url: `${bundle.authData.apiUrl}/invoices/${bundle.inputData.id}`,
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        return res.data;
    });
};

const createInvoice = (z, bundle) => {
    const requestOptions = {
        url: bundle.authData.apiUrl + '/invoices',
        method: 'POST',
        body: JSON.stringify({
            "amount": bundle.inputData.amount,
            "balance": bundle.inputData.balance,
            "client_id": bundle.inputData.client_id,
            "invoice_number": bundle.inputData.invoice_number,
            "private_notes": bundle.inputData.private_notes,
            "public_notes": bundle.inputData.public_notes,
            "invoice_items[]": bundle.inputData.line_items
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
    "balance": 10,
    "client_id": 1,
    "invoice_number": "0001",
    "private_notes": "Notes...",
    "public_notes": "Notes..."
};

// This file exports a Invoice resource. The definition below contains all of the keys available,
// and implements the list and create methods.
module.exports = {
    key: 'invoice',
    noun: 'Invoice',
    get: {
        display: {
            label: 'Get Invoice',
            description: 'Gets a invoice.',
        },
        operation: {
            inputFields: [
                {key: 'id', required: true},
            ],
            perform: getInvoice,
            sample: sample
        }
    },
    list: {
        display: {
            label: 'New Invoice',
            description: 'Trigger when a new invoice is added.',
        },
        operation: {
            inputFields: [
                //{key: 'style', type: 'string', helpText: 'Explain what style of cuisine this is.'},
            ],
            perform: listInvoices,
            sample: sample
        },
    },

    create: {
        display: {
            label: 'Create Invoice',
            description: 'Creates a new invoice.',
        },
        operation: {
            inputFields: [
                {key: 'amount', required: true, type: 'number', label: 'Amount'},
                {key: 'balance', required: true, type: 'number', label: 'Balance'},
                {key: 'client_id', required: true, type: 'integer', label: 'Client ID', dynamic:'client.id.name'},
                {key: 'invoice_number', required: true, type: 'string', label: 'Invoice Number'},
                {key: 'private_notes', required: true, type: 'text', label: 'Private Notes'},
                {key: 'public_notes', required: true, type: 'text', label: 'Public Notes'},
                {key: 'line_items', children: [
                    {key: 'sku', type: 'string'},
                    {key: 'cost', type: 'number'},
                    {key: 'notes', type: 'string'},
                    {key: 'qty', type: 'integer'},
                ]}
            ],
            perform: createInvoice,
            sample: sample
        },
    },

    search: {
        display: {
            label: 'Find Invoice',
            description: 'Finds an existing invoice by email.',
        },
        operation: {
            inputFields: [
                {key: 'email', required: true, type: 'string'},
            ],
            perform: searchInvoices,
            sample: sample
        }
    },

    sample: sample,

    outputFields: [
        {key: 'amount', label: 'Amount'},
        {key: 'balance', label: 'Balance'},
        {key: 'client_id', label: 'Client ID'},
        {key: 'invoice_number', label: 'Invoice Number'},
        {key: 'private_notes', label: 'Private Notes'},
        {key: 'public_notes', label: 'Public Notes'}
    ]
};


