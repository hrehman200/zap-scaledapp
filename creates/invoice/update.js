const Invoice = require('./../../resources/invoice');

module.exports = {
    key: 'invoiceUpdate',
    noun: 'invoiceUpdate',
    display: {
        label: 'Update invoice',
        description: 'Updates a invoice.'
    },
    operation: {
        inputFields: [
            {key: 'client_id', required: true, type: 'integer', label: 'Client ID', dynamic:'client.id.name'},
            {key: 'invoice_number', required: true, type: 'string', label: 'Invoice Number'},
            {key: 'private_notes', required: true, type: 'text', label: 'Private Notes'},
            {key: 'public_notes', required: true, type: 'text', label: 'Public Notes'}
        ],
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/invoices/' + bundle.inputData.id,
                method: 'PUT',
                body: JSON.stringify({
                    "client_id": bundle.inputData.client_id,
                    "invoice_number": bundle.inputData.invoice_number,
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
        sample: Invoice.sample,
        outputFields: Invoice.outputFields
    }
};
