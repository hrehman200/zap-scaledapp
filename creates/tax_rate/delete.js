const TaxRate = require('./../../resources/tax_rate');

module.exports = {
    key: 'taxRateDelete',

    // You'll want to provide some helpful display labels and descriptions
    // for users. Zapier will put them into the UX.
    noun: 'TaxRate',
    display: {
        label: 'Delete TaxRate',
        description: 'Deletes a taxRate.'
    },

    // `operation` is where the business logic goes.
    operation: {
        inputFields: [
            {key: 'tax_rate_id', required: true, type: 'integer', label: 'TaxRate ID'},
        ],
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/tax_rates/' + bundle.inputData.id,
                method: 'DELETE',
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

        sample: TaxRate.sample,
        outputFields: TaxRate.outputFields
    }
};
