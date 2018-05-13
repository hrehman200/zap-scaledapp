const TaxRate = require('./../../resources/tax_rate');

module.exports = {
    key: 'taxRateUpdate',
    noun: 'Update Tax Rate',
    display: {
        label: 'Update Tax Rate',
        description: 'Updates a tax rate.'
    },
    operation: {
        inputFields: [
            {key: 'name', required: true, type: 'string', label: 'Name'},
            {key: 'rate', required: true, type: 'number', label: 'Rate'},
            {key: 'is_inclusive', required: true, type: 'boolean', label: 'Is Inclusive?'}
        ],
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/tax_rates/' + bundle.inputData.id,
                method: 'PUT',
                body: JSON.stringify({
                    "name": bundle.inputData.name,
                    "rate": bundle.inputData.rate,
                    "is_inclusive": bundle.inputData.is_inclusive
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
