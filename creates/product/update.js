const Product = require('./../../resources/product');

module.exports = {
    key: 'productUpdate',
    noun: 'Product',
    display: {
        label: 'Update Product',
        description: 'Updates a product.'
    },
    operation: {
        inputFields: Product.inputFields,
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/products/' + bundle.inputData.id,
                method: 'PUT',
                body: JSON.stringify({
                    "product_key": bundle.inputData.product_key,
                    'notes': bundle.inputData.notes,
                    "cost": bundle.inputData.cost,
                    "quantity": bundle.inputData.quantity
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

        sample: Product.sample,
        outputFields: Product.outputFields
    }
};
