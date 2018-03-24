const listContacts = (z, bundle) => {
    return z.request({
        url: '{{bundle.authData.apiUrl}}/contacts',
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

const searchContacts = (z, bundle) => {
    return z.request({
        url: bundle.authData.apiUrl + '/contacts',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const getContact = (z, bundle) => {
    return z.request({
        url: `${bundle.authData.apiUrl}/contacts/${bundle.inputData.id}`,
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        return res.data;
    });
};

const createContact = (z, bundle) => {
    const requestOptions = {
        url: bundle.authData.apiUrl + '/contacts',
        method: 'POST',
        body: JSON.stringify({
            "first_name": bundle.inputData.first_name,
            "last_name": bundle.inputData.last_name,
            "email": bundle.inputData.email,
            "is_primary": bundle.inputData.is_primary,
            "phone": bundle.inputData.phone,
            "last_login": bundle.inputData.last_login,
            "send_invoice": bundle.inputData.send_invoice,
            "custom_value1": bundle.inputData.custom_value1,
            "custom_value2": bundle.inputData.custom_value2
        })
    };

    return z.request(requestOptions)
        .then((response) => {
            console.log(response);
            let res = z.JSON.parse(response.content);
            if(res.message) {
                throw new Error(res.message);
            }
            return res.data;
        });
};


const sample = {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@company.com",
    "updated_at": 1451160233,
    "archived_at": 1451160233,
    "is_primary": false,
    "phone": "(212) 555-1212",
    "last_login": "2016-01-01 12:10:00",
    "send_invoice": false,
    "custom_value1": "Value",
    "custom_value2": "Value"
};

module.exports = {
    key: 'contact',
    noun: 'Contact',

    get: {
        display: {
            label: 'Get Contact',
            description: 'Gets a contact.',
        },
        operation: {
            inputFields: [
                {key: 'id', required: true},
            ],
            perform: getContact,
            sample: sample
        }
    },

    list: {
        display: {
            label: 'New Contact',
            description: 'Trigger when a new contact is added.',
        },
        operation: {
            inputFields: [
            ],
            perform: listContacts,
            sample: sample
        },
    },

    create: {
        display: {
            label: 'Create Contact',
            description: 'Creates a new contact.',
        },
        operation: {
            inputFields: [
                {key: 'first_name', required: true, type: 'string', label: 'First Name'},
                {key: 'last_name', required: true, type: 'string', label: 'Last Name'},
                {key: 'email', required: true, type: 'string', label: 'Email'},
                {key: 'is_primary', required: true, type: 'boolean', label: 'Is Primary'},
                {key: 'phone', required: true, type: 'string', label: 'Phone'},
                {key: 'last_login', required: false, type: 'string', label: 'Last Login'},
                {key: 'send_invoice', required: true, type: 'boolean', label: 'Send Invoice'},
                {key: 'custom_value1', required: true, type: 'string', label: 'Custom Value 1'},
                {key: 'custom_value2', required: true, type: 'string', label: 'Custom Value 2'}
            ],
            perform: createContact,
            sample: sample
        },
    },

    search: {
        display: {
            label: 'Find Contact',
            description: 'Finds an existing contact.',
        },
        operation: {
            inputFields: [
                {key: 'email', required: true, type: 'string'},
            ],
            perform: searchContacts,
            sample: sample
        }
    },

    sample: sample,

    outputFields: [
        {key: 'first_name', label: 'First Name'},
        {key: 'last_name', label: 'Last Name'},
        {key: 'email', label: 'Email'},
        {key: 'is_primary', label: 'Is Primary'},
        {key: 'phone', label: 'Phone'},
        {key: 'last_login', label: 'Last Login'},
        {key: 'send_invoice', label: 'Send Invoice'},
        {key: 'custom_value1', label: 'Custom Value 1'},
        {key: 'custom_value2', label: 'Custom Value 2'}
    ]
};


