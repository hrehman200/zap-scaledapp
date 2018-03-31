const Payment = require('./../../resources/payment');

module.exports = {
    key: 'paymentUpdate',

    // You'll want to provide some helpful display labels and descriptions
    // for users. Zapier will put them into the UX.
    noun: 'Payment',
    display: {
        label: 'Update Payment',
        description: 'Updates a payment.'
    },

    // `operation` is where the business logic goes.
    operation: {
        inputFields: Payment.inputFields,
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/payments/' + bundle.inputData.id,
                method: 'PUT',
                body: JSON.stringify({
                    "invoice_id": bundle.inputData.invoice_id,
                    "private_notes": bundle.inputData.private_notes,
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

        sample: Payment.sample,

        outputFields: Payment.outputFields
    }
};
