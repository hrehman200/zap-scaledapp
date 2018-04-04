const Vendor = require('./../../resources/vendor');

module.exports = {
    key: 'vendorUpdate',

    // You'll want to provide some helpful display labels and descriptions
    // for users. Zapier will put them into the UX.
    noun: 'Vendor',
    display: {
        label: 'Update Vendor',
        description: 'Updates a vendor.'
    },

    // `operation` is where the business logic goes.
    operation: {
        inputFields: Vendor.inputFields,
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/vendors/' + bundle.inputData.id,
                method: 'PUT',
                body: JSON.stringify({
                    "user_id": bundle.inputData.user_id,
                    'name': bundle.inputData.name,
                    "account_key": bundle.inputData.account_key,
                    "address1": bundle.inputData.address1,
                    "address2": bundle.inputData.address2,
                    "city": bundle.inputData.city,
                    "state": bundle.inputData.state,
                    "postal_code": bundle.inputData.postal_code,
                    "country_id": bundle.inputData.country_id,
                    "work_phone": bundle.inputData.work_phone,
                    "private_notes": bundle.inputData.private_notes,
                    "last_login": bundle.inputData.last_login,
                    "website": bundle.inputData.website,
                    "is_deleted": bundle.inputData.is_deleted,
                    "vat_number": bundle.inputData.vat_number,
                    "id_number": bundle.inputData.id_number,
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

        sample: Vendor.sample,

        outputFields: Vendor.outputFields
    }
};
