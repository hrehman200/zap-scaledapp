const Contact = require('./../../resources/contact');

module.exports = {
    key: 'contactDelete',
    noun: 'Contact',
    display: {
        label: 'Delete Contact',
        description: 'Deletes a contact.'
    },
    operation: {
        inputFields: [
            {key: 'contact_id', required: true, type: 'integer', label: 'Contact ID'},
        ],
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/contacts/' + bundle.inputData.id,
                method: 'PUT',
                body: JSON.stringify({
                    first_name:'bla bla',
                    last_name:'bla bla',
                    email: 'bla bla',
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

        sample: Contact.sample,
        outputFields: Contact.outputFields
    }
};
