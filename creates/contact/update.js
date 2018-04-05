const contact = require('./../../resources/contact');

module.exports = {
    key: 'contactUpdate',
    noun: 'contact',
    display: {
        label: 'Update contact',
        description: 'Updates a contact.'
    },
    operation: {
        inputFields: contact.inputFields,
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/contacts/' + bundle.inputData.id,
                method: 'PUT',
                body: JSON.stringify({
                    "first_name": bundle.inputData.first_name,
                    "last_name": bundle.inputData.last_name,
                    "email": bundle.inputData.email,
                    'client_id': bundle.inputData.client_id,
                    "is_primary": bundle.inputData.is_primary,
                    "phone": bundle.inputData.phone,
                    "last_login": bundle.inputData.last_login,
                    "send_invoice": bundle.inputData.send_invoice,
                    "custom_value1": bundle.inputData.custom_value1,
                    "custom_value2": bundle.inputData.custom_value2
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

        sample: contact.sample,

        outputFields: contact.outputFields
    }
};
