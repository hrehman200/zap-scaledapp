const config = require('./../config');

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
        if (response.status != 200) {
            throw new Error(`Unexpected status code ${response.status}`);
        }

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
            if (response.status != 200) {
                throw new Error(`Unexpected status code ${response.status}`);
            }

            let res = z.JSON.parse(response.content);
            if(res.message) {
                throw new Error(res.message);
            }
            return res.data;
        });
};

const updateClient = (z, bundle) => {
    const requestOptions = {
        url: bundle.authData.apiUrl + '/clients/' + bundle.inputData.id,
        method: 'PUT',
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
            if (response.status != 200) {
                throw new Error(`Unexpected status code ${response.status}`);
            }

            let res = z.JSON.parse(response.content);
            if(res.message) {
                throw new Error(res.message);
            }
            return res.data;
        });
};

const deleteClient = (z, bundle) => {
    return z.request({
        url: `${bundle.authData.apiUrl}/clients/${bundle.inputData.id}`,
        method: 'DELETE'
    }).then((response) => {
        if (response.status != 200) {
            throw new Error(`Unexpected status code ${response.status}`);
        }
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
    // The get method is used by Zapier to fetch a complete representation of a record. This is helpful when the HTTP
    // response from a create call only return an ID, or a search that only returns a minimuml representation of the
    // record. Zapier will follow these up with the get() to retrieve the entire object.
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
                {key: 'name', required: true, type: 'string'},
                {
                    key: 'directions',
                    required: true,
                    type: 'text',
                    helpText: 'Explain how should one make the client, step by step.'
                },
                {key: 'authorId', required: true, type: 'integer', label: 'Author ID'},
                {key: 'style', required: false, type: 'string', helpText: 'Explain what style of cuisine this is.'},
            ],
            perform: createClient,
            sample: sample
        },
    },
    /*update: {
        display: {
            label: 'Update Client',
            description: 'Update a client.',
        },
        operation: {
            inputFields: [
                {key: 'name', required: true, type: 'string'},
            ],
            perform: updateClient,
            sample: sample
        },
    },
    delete: {
        display: {
            label: 'Delete Client',
            description: 'Deletes a client.',
        },
        operation: {
            inputFields: [
                {key: 'id', required: true},
            ],
            perform: deleteClient,
            sample: sample
        },
    },*/
    // The search method on this resource becomes a Search on this app
    search: {
        display: {
            label: 'Find Recipe',
            description: 'Finds an existing recipe by name.',
        },
        operation: {
            inputFields: [
                {key: 'name', required: true, type: 'string'},
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


