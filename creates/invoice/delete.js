const Invoice = require('./../../resources/invoice');

module.exports = {
    key: 'invoiceDelete',

    // You'll want to provide some helpful display labels and descriptions
    // for users. Zapier will put them into the UX.
    noun: 'InvoiceDelete',
    display: {
        label: 'Delete Invoice',
        description: 'Deletes a invoice.'
    },

    // `operation` is where the business logic goes.
    operation: {
        inputFields: [
            {key: 'invoice_id', required: true, type: 'integer', label: 'Invoice ID'},
        ],
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/invoices/' + bundle.inputData.id,
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

        sample: Invoice.sample,
        outputFields: Invoice.outputFields
    }
};
