const Credit = require('./../../resources/credit');

module.exports = {
    key: 'creditUpdate',

    // You'll want to provide some helpful display labels and descriptions
    // for users. Zapier will put them into the UX.
    noun: 'Credit',
    display: {
        label: 'Update Credit',
        description: 'Updates a credit.'
    },

    // `operation` is where the business logic goes.
    operation: {
        inputFields: Credit.inputFields,
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/credits/' + bundle.inputData.id,
                method: 'PUT',
                body: JSON.stringify({
                    "amount": bundle.inputData.amount,
                    "private_notes": bundle.inputData.private_notes,
                    "public_notes": bundle.inputData.public_notes
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

        sample: Credit.sample,

        outputFields: Credit.outputFields
    }
};
