const listTaxRates = (z, bundle) => {
    return z.request({
        url: '{{bundle.authData.apiUrl}}/tax_rates',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const searchTaxRates = (z, bundle) => {
    return z.request({
        url: bundle.authData.apiUrl + '/tax_rates',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const getTaxRate = (z, bundle) => {
    return z.request({
        url: `${bundle.authData.apiUrl}/tax_rates/${bundle.inputData.id}`,
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        return res.data;
    });
};

const createTaxRate = (z, bundle) => {
    const requestOptions = {
        url: bundle.authData.apiUrl + '/tax_rates',
        method: 'POST',
        body: JSON.stringify({
            "name": bundle.inputData.name,
            "rate": bundle.inputData.rate,
            "is_inclusive": bundle.inputData.is_inclusive
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
    "name": "GST",
    "account_key": "asimplestring",
    "rate": 17.5,
    "is_inclusive": false,
    "updated_at": 1451160233,
    "archived_at": 1451160233
};

module.exports = {
    key: 'tax_rate',
    noun: 'Tax Rate',
    get: {
        display: {
            label: 'Get TaxRate',
            description: 'Gets a tax_rate.',
        },
        operation: {
            inputFields: [
                {key: 'id', required: true},
            ],
            perform: getTaxRate,
            sample: sample
        }
    },
    // The list method on this resource becomes a Trigger on the app. Zapier will use polling to watch for new records
    list: {
        display: {
            label: 'New TaxRate',
            description: 'Trigger when a new tax_rate is added.',
        },
        operation: {
            inputFields: [
                //{key: 'style', type: 'string', helpText: 'Explain what style of cuisine this is.'},
            ],
            perform: listTaxRates,
            sample: sample
        },
    },

    // The create method on this resource becomes a Write on this app
    create: {
        display: {
            label: 'Create TaxRate',
            description: 'Creates a new tax_rate.',
        },
        operation: {
            inputFields: [
                {key: 'name', required: true, type: 'string', label: 'Name'},
                {key: 'rate', required: true, type: 'number', label: 'Rate'},
                {key: 'is_inclusive', required: true, type: 'boolean', label: 'Is Inclusive?'}
            ],
            perform: createTaxRate,
            sample: sample
        },
    },

    sample: sample,

    outputFields: [
        {key: 'id', label: 'id'},
        {key: 'name', label: 'Name'},
        {key: 'account_key', label: 'Account Key'},
        {key: 'rate', label: 'Rate'},
        {key: 'is_inclusive', label: 'Is Inclusive'},
        {key: 'updated_at', label: 'Updated at'},
        {key: 'archived_at', label: 'Archived at'}
    ]
};


