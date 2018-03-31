const Product = require('./../../resources/product');

module.exports = {
    key: 'productDelete',
    noun: 'Product',
    display: {
        label: 'Delete Product',
        description: 'Deletes a product.'
    },
    operation: {
        inputFields: [
            {key: 'product_id', required: true, type: 'integer', label: 'Product ID'},
        ],
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/products/' + bundle.inputData.id,
                method: 'DELETE',
                body: JSON.stringify({
                    "product_key": 'bla bla',
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
