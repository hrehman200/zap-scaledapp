const listClients = (z, bundle) => {
    return z.request({
        url: '{{bundle.authData.apiUrl}}/clients',
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

const searchClients = (z, bundle) => {
    return z.request({
        url: bundle.authData.apiUrl + '/clients',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const getClient = (z, bundle) => {
    return z.request({
        url: `${bundle.authData.apiUrl}/clients/${bundle.inputData.id}`,
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        return res.data;
    });
};

const createClient = (z, bundle) => {
    const requestOptions = {
        url: bundle.authData.apiUrl + '/clients',
        method: 'POST',
        body: JSON.stringify({
            "account_key": bundle.inputData.account_key,
            "address1": bundle.inputData.address1,
            "address2": bundle.inputData.address2,
            "city": bundle.inputData.city,
            "state": bundle.inputData.state,
            "postal_code": bundle.inputData.postal_code,
            "country_id": bundle.inputData.country_id,
            "work_phone": bundle.inputData.work_phone,
            "private_notes": bundle.inputData.private_notes,
            "public_notes": bundle.inputData.public_notes,
            "website": bundle.inputData.website,
            "industry_id": bundle.inputData.industry_id,
            "size_id": bundle.inputData.size_id,
            "payment_terms": bundle.inputData.payment_terms,
            "custom_value1": bundle.inputData.custom_value1,
            "custom_value2": bundle.inputData.custom_value2,
            "vat_number": bundle.inputData.vat_number,
            "id_number": bundle.inputData.id_number,
            "language_id": 1,
            "task_rate": 10,
            "shipping_address1": bundle.inputData.shipping_address1,
            "shipping_address2": bundle.inputData.shipping_address2,
            "shipping_city": bundle.inputData.shipping_city,
            "shipping_state": bundle.inputData.shipping_state,
            "shipping_postal_code": bundle.inputData.shipping_postal_code,
            "shipping_country_id": bundle.inputData.shipping_country_id,
            "show_tasks_in_portal": bundle.inputData.show_tasks_in_portal
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
    "id": "id_string",
    "user_id": 1,
    "account_key": "123456",
    "address1": "10 Main St.",
    "address2": "1st Floor",
    "city": "New York",
    "state": "NY",
    "postal_code": 10010,
    "country_id": 840,
    "work_phone": "(212) 555-1212",
    "private_notes": "Notes...",
    "public_notes": "Notes...",
    "last_login": "2016-01-01 12:10:00",
    "website": "http://www.example.com",
    "industry_id": 1,
    "size_id": 1,
    "is_deleted": false,
    "payment_terms": 30,
    "custom_value1": "Value",
    "custom_value2": "Value",
    "vat_number": "123456",
    "id_number": "123456",
    "language_id": 1,
    "task_rate": 10,
    "shipping_address1": "10 Main St.",
    "shipping_address2": "1st Floor",
    "shipping_city": "New York",
    "shipping_state": "NY",
    "shipping_postal_code": 10010,
    "shipping_country_id": 840,
    "show_tasks_in_portal": false
};

// This file exports a Client resource. The definition below contains all of the keys available,
// and implements the list and create methods.
module.exports = {
    key: 'client',
    noun: 'Client',
    get: {
        display: {
            label: 'Get Client',
            description: 'Gets a client.',
        },
        operation: {
            inputFields: [
                {key: 'id', required: true},
            ],
            perform: getClient,
            sample: sample
        }
    },
    // The list method on this resource becomes a Trigger on the app. Zapier will use polling to watch for new records
    list: {
        display: {
            label: 'New Client',
            description: 'Trigger when a new client is added.',
        },
        operation: {
            inputFields: [
                //{key: 'style', type: 'string', helpText: 'Explain what style of cuisine this is.'},
            ],
            perform: listClients,
            sample: sample
        },
    },

    // The create method on this resource becomes a Write on this app
    create: {
        display: {
            label: 'Create Client',
            description: 'Creates a new client.',
        },
        operation: {
            inputFields: [
                {key: 'user_id', required: true, type: 'integer', label: 'User', dynamic: 'user.id.email'},
                {key: 'account_key', required: true, type: 'string', label: 'Account Key'},
                {key: 'address1', required: true, type: 'text', label: 'Address 1'},
                {key: 'address2', required: true, type: 'text', label: 'Address 2'},
                {key: 'city', required: true, type: 'string', label: 'City'},
                {key: 'state', required: true, type: 'string', label: 'State'},
                {key: 'postal_code', required: true, type: 'string', label: 'Postal Code'},
                {key: 'country_id', required: true, type: 'integer', label: 'Country', dynamic: 'country.id.name'},
                {key: 'work_phone', required: true, type: 'string', label: 'Work Phone'},
                {key: 'private_notes', required: true, type: 'text', label: 'Private Notes'},
                {key: 'public_notes', required: true, type: 'text', label: 'Public Notes'},
                {key: 'last_login', required: true, type: 'datetime', label: 'Last Login'},
                {key: 'website', required: true, type: 'string', label: 'Website'},
                {key: 'industry_id', required: true, type: 'integer', label: 'Industry', dynamic: 'industry.id.name'},
                {key: 'size_id', required: true, type: 'integer', label: 'Size', dynamic: 'size.id.name'},
                {key: 'is_deleted', required: true, type: 'boolean', label: 'Is Deleted'},
                {key: 'payment_terms', required: true, type: 'text', label: 'Payment Terms'},
                {key: 'custom_value1', required: true, type: 'text', label: 'Custom Value 1'},
                {key: 'custom_value2', required: true, type: 'text', label: 'Custom Value 2'},
                {key: 'vat_number', required: true, type: 'string', label: 'Vat Number'},
                {key: 'id_number', required: true, type: 'string', label: 'ID Number'},
                {key: 'language_id', required: true, type: 'integer', label: 'Language', dynamic: 'language.id.name'},
                {key: 'task_rate', required: true, type: 'number', label: 'Task Rate'},
                {key: 'shipping_address1', required: true, type: 'text', label: 'Shipping Address 1'},
                {key: 'shipping_address2', required: true, type: 'text', label: 'Shipping Address 2'},
                {key: 'shipping_city', required: true, type: 'string', label: 'Shipping City'},
                {key: 'shipping_state', required: true, type: 'string', label: 'Shipping State'},
                {key: 'shipping_postal_code', required: true, type: 'string', label: 'Shipping Postal Code'},
                {key: 'shipping_country_id', required: true, type: 'integer', label: 'Shipping Country', dynamic: 'country.id.name'},
                {key: 'show_tasks_in_portal', required: true, type: 'boolean', label: 'Show tasks in portal'}
            ],
            perform: createClient,
            sample: sample
        },
    },
    // The search method on this resource becomes a Search on this app
    search: {
        display: {
            label: 'Find Client',
            description: 'Finds an existing client by email.',
        },
        operation: {
            inputFields: [
                {key: 'email', required: true, type: 'string'},
            ],
            perform: searchClients,
            sample: sample
        }
    },

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: sample,

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: [
        {key: 'id', label: 'ID'},
        {key: 'createdAt', label: 'Created At'},
        {key: 'name', label: 'Name'},
        {key: 'directions', label: 'Directions'},
        {key: 'authorId', label: 'Author ID'},
        {key: 'style', label: 'Style'},
    ]
};


