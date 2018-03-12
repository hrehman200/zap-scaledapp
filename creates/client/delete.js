const Client = require('./../../resources/client');

module.exports = {
    key: 'clientDelete',

    // You'll want to provide some helpful display labels and descriptions
    // for users. Zapier will put them into the UX.
    noun: 'Client',
    display: {
        label: 'Delete Client',
        description: 'Deletes a client.'
    },

    // `operation` is where the business logic goes.
    operation: {
        inputFields: [
            {key: 'client_id', required: true, type: 'integer', label: 'Client ID'},
        ],
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/clients/' + bundle.inputData.id,
                method: 'PUT',
                body: JSON.stringify({})
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

        sample: Client.sample,
        outputFields: Client.outputFields
    }
};
