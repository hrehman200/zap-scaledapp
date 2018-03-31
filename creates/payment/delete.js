const Payment = require('./../../resources/payment');

module.exports = {
    key: 'paymentDelete',

    // You'll want to provide some helpful display labels and descriptions
    // for users. Zapier will put them into the UX.
    noun: 'Payment',
    display: {
        label: 'Delete Payment',
        description: 'Deletes a payment.'
    },

    // `operation` is where the business logic goes.
    operation: {
        inputFields: [
            {key: 'payment_id', required: true, type: 'integer', label: 'Payment ID'},
        ],
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/payments/' + bundle.inputData.id,
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

        sample: Payment.sample,
        outputFields: Payment.outputFields
    }
};
