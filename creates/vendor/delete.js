const Vendor = require('./../../resources/vendor');

module.exports = {
    key: 'vendorDelete',

    // You'll want to provide some helpful display labels and descriptions
    // for users. Zapier will put them into the UX.
    noun: 'Vendor',
    display: {
        label: 'Delete Vendor',
        description: 'Deletes a vendor.'
    },

    // `operation` is where the business logic goes.
    operation: {
        inputFields: [
            {key: 'vendor_id', required: true, type: 'integer', label: 'Vendor ID'},
        ],
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/vendors/' + bundle.inputData.id,
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

        sample: Vendor.sample,
        outputFields: Vendor.outputFields
    }
};
