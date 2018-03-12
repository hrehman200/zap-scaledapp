const Client = require('./../../resources/client');

module.exports = {
    key: 'clientUpdate',

    // You'll want to provide some helpful display labels and descriptions
    // for users. Zapier will put them into the UX.
    noun: 'Client',
    display: {
        label: 'Update Client',
        description: 'Updates a client.'
    },

    // `operation` is where the business logic goes.
    operation: {
        inputFields: [
            {key: 'user_id', required: true, type: 'integer', label: 'User'},
            {key: 'account_key', required: true, type: 'string', label: 'Account Key'},
            {key: 'address1', required: true, type: 'string', label: 'Address 1'},
            {key: 'address2', required: true, type: 'string', label: 'Address 2'},
            {key: 'city', required: true, type: 'string', label: 'City'},
            {key: 'state', required: true, type: 'string', label: 'State'},
            {key: 'postal_code', required: true, type: 'string', label: 'Postal Code'},
            {key: 'country_id', required: true, type: 'integer', label: 'Country'},
            {key: 'work_phone', required: true, type: 'integer', label: 'Work Phone'},
            {key: 'private_notes', required: true, type: 'integer', label: 'Private Notes'},
            {key: 'public_notes', required: true, type: 'integer', label: 'Public Notes'},
            {key: 'last_login', required: true, type: 'integer', label: 'Last Login'},
            {key: 'website', required: true, type: 'integer', label: 'Website'},
            {key: 'industry_id', required: true, type: 'integer', label: 'Industry'},
            {key: 'size_id', required: true, type: 'integer', label: 'Size'},
            {key: 'is_deleted', required: true, type: 'integer', label: 'Is Deleted'},
            {key: 'payment_terms', required: true, type: 'integer', label: 'Payment Terms'},
            {key: 'custom_value1', required: true, type: 'integer', label: 'Custom Value 1'},
            {key: 'custom_value2', required: true, type: 'integer', label: 'Custom Value 2'},
            {key: 'vat_number', required: true, type: 'integer', label: 'Vat Number'},
            {key: 'id_number', required: true, type: 'integer', label: 'ID Number'},
            {key: 'language_id', required: true, type: 'integer', label: 'Language'},
            {key: 'task_rate', required: true, type: 'integer', label: 'Task Rate'},
            {key: 'shipping_address1', required: true, type: 'integer', label: 'Shipping Address 1'},
            {key: 'shipping_address2', required: true, type: 'integer', label: 'Shipping Address 2'},
            {key: 'shipping_city', required: true, type: 'integer', label: 'Shipping City'},
            {key: 'shipping_state', required: true, type: 'integer', label: 'Shipping State'},
            {key: 'shipping_postal_code', required: true, type: 'integer', label: 'Shipping Postal Code'},
            {key: 'shipping_country_id', required: true, type: 'integer', label: 'Shipping Country'},
            {key: 'show_tasks_in_portal', required: true, type: 'integer', label: 'Show tasks in portal'}
        ],
        perform: (z, bundle) => {
            const promise = z.request({
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
            });

            return promise.then((response) => {
                let res = z.JSON.parse(response.content);
                if(res.message) {
                    throw new Error(res.message);
                }
                res = res.data;
                return res;
            });
        },

        // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
        // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
        // returned records, and have obviously dummy values that we can show to any user.
        sample: Client.sample,

        // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
        // field definitions. The result will be used to augment the sample.
        // outputFields: () => { return []; }
        // Alternatively, a static field definition should be provided, to specify labels for the fields
        outputFields: Client.outputFields
    }
};
