const Credit = require('./../../resources/credit');

module.exports = {
    key: 'creditDelete',

    // You'll want to provide some helpful display labels and descriptions
    // for users. Zapier will put them into the UX.
    noun: 'Credit',
    display: {
        label: 'Delete Credit',
        description: 'Deletes a credit.'
    },

    // `operation` is where the business logic goes.
    operation: {
        inputFields: [
            {key: 'credit_id', required: true, type: 'integer', label: 'Credit ID'},
        ],
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/credits/' + bundle.inputData.id,
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

        sample: Credit.sample,
        outputFields: Credit.outputFields
    }
};
