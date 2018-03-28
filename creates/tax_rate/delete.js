const TaxRate = require('./../../resources/tax_rate');

module.exports = {
    key: 'taxRateDelete',
    noun: 'TaxRate',
    display: {
        label: 'Delete TaxRate',
        description: 'Deletes a taxRate.'
    },

    operation: {
        inputFields: [
            {key: 'tax_rate_id', required: true, type: 'integer', label: 'TaxRate ID'},
        ],
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/tax_rates/' + bundle.inputData.id,
                method: 'DELETE',
                body: JSON.stringify({
                    "name": bundle.inputData.name,
                    "rate": bundle.inputData.rate
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

        sample: TaxRate.sample,
        outputFields: TaxRate.outputFields
    }
};
