const listVendors = (z, bundle) => {
    return z.request({
        url: '{{bundle.authData.apiUrl}}/vendors',
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

const searchVendors = (z, bundle) => {
    return z.request({
        url: bundle.authData.apiUrl + '/vendors',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const getVendor = (z, bundle) => {
    return z.request({
        url: `${bundle.authData.apiUrl}/vendors/${bundle.inputData.id}`,
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        return res.data;
    });
};

const createVendor = (z, bundle) => {
    const requestOptions = {
        url: bundle.authData.apiUrl + '/vendors',
        method: 'POST',
        body: JSON.stringify({
            "user_id": bundle.inputData.user_id,
            "account_key": bundle.inputData.account_key,
            "address1": bundle.inputData.address1,
            "address2": bundle.inputData.address2,
            "city": bundle.inputData.city,
            "state": bundle.inputData.state,
            "postal_code": bundle.inputData.postal_code,
            "country_id": bundle.inputData.country_id,
            "work_phone": bundle.inputData.work_phone,
            "private_notes": bundle.inputData.private_notes,
            "last_login": bundle.inputData.last_login,
            "website": bundle.inputData.website,
            "is_deleted": bundle.inputData.is_deleted,
            "vat_number": bundle.inputData.vat_number,
            "id_number": bundle.inputData.id_number,
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
    "balance": 10,
    "paid_to_date": 10,
    "user_id": 1,
    "account_key": "123456",
    "updated_at": 1451160233,
    "archived_at": 1451160233,
    "address1": "10 Main St.",
    "address2": "1st Floor",
    "city": "New York",
    "state": "NY",
    "postal_code": 10010,
    "country_id": 840,
    "work_phone": "(212) 555-1212",
    "private_notes": "Notes...",
    "last_login": "2016-01-01 12:10:00",
    "website": "http://www.example.com",
    "is_deleted": false,
    "vat_number": "123456",
    "id_number": "123456"
};

module.exports = {
    key: 'vendor',
    noun: 'Vendor',
    get: {
        display: {
            label: 'Get Vendor',
            description: 'Gets a vendor.',
        },
        operation: {
            inputFields: [
                {key: 'id', required: true},
            ],
            perform: getVendor,
            sample: sample
        }
    },
    // The list method on this resource becomes a Trigger on the app. Zapier will use polling to watch for new records
    list: {
        display: {
            label: 'New Vendor',
            description: 'Trigger when a new vendor is added.',
        },
        operation: {
            inputFields: [
                //{key: 'style', type: 'string', helpText: 'Explain what style of cuisine this is.'},
            ],
            perform: listVendors,
            sample: sample
        },
    },

    // The create method on this resource becomes a Write on this app
    create: {
        display: {
            label: 'Create Vendor',
            description: 'Creates a new vendor.',
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
                {key: 'last_login', required: false, type: 'datetime', label: 'Last Login'},
                {key: 'website', required: true, type: 'string', label: 'Website'},
                {key: 'is_deleted', required: false, type: 'boolean', label: 'Is Deleted'},
                {key: 'vat_number', required: true, type: 'string', label: 'Vat Number'},
                {key: 'id_number', required: true, type: 'string', label: 'ID Number'},
            ],
            perform: createVendor,
            sample: sample
        },
    },
    search: {
        display: {
            label: 'Find Vendor',
            description: 'Finds an existing vendor by email.',
        },
        operation: {
            inputFields: [
                {key: 'email', required: true, type: 'string'},
            ],
            perform: searchVendors,
            sample: sample
        }
    },
    sample: sample,
    outputFields: [
        {key: 'user_id', label: 'User'},
        {key: 'account_key', label: 'Account Key'},
        {key: 'address1', label: 'Address 1'},
        {key: 'address2', label: 'Address 2'},
        {key: 'city', label: 'City'},
        {key: 'state', label: 'State'},
        {key: 'postal_code', label: 'Postal Code'},
        {key: 'country_id', label: 'Country'},
        {key: 'work_phone', label: 'Work Phone'},
        {key: 'private_notes', label: 'Private Notes'},
        {key: 'last_login', label: 'Last Login'},
        {key: 'website', label: 'Website'},
        {key: 'is_deleted', label: 'Is Deleted'},
        {key: 'vat_number', label: 'Vat Number'},
        {key: 'id_number', label: 'ID Number'},
    ]
};


