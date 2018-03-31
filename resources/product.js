const listProducts = (z, bundle) => {
    return z.request({
        url: '{{bundle.authData.apiUrl}}/products',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const getProduct = (z, bundle) => {
    return z.request({
        url: `${bundle.authData.apiUrl}/products/${bundle.inputData.id}`,
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        return res.data;
    });
};

const createProduct = (z, bundle) => {
    const requestOptions = {
        url: bundle.authData.apiUrl + '/products',
        method: 'POST',
        body: JSON.stringify({
            "product_key": bundle.inputData.product_key,
            'notes': bundle.inputData.notes,
            "cost": bundle.inputData.cost,
            "quantity": bundle.inputData.quantity
        })
    };

    return z.request(requestOptions)
        .then((response) => {
            let res = z.JSON.parse(response.content);
            if(res.message) {
                throw new Error(res.message);
            }
            return res.data;
        });
};


const sample = {
    "id": 1,
    "product_key": "Item",
    "notes": "Notes...",
    "cost": 10,
    "qty": 1,
    "updated_at": 1451160233,
    "archived_at": 1451160233
};

const inputFields = [
    {key: 'product_key', required: true, type: 'string', label: 'Product Key'},
    {key: 'notes', required: true, type: 'text', label: 'Notes'},
    {key: 'cost', required: true, type: 'number', label: 'Cost'},
    {key: 'quantity', required: true, type: 'integer', label: 'Quantity'},
];

module.exports = {
    key: 'product',
    noun: 'Product',

    get: {
        display: {
            label: 'Get Product',
            description: 'Gets a product.',
        },
        operation: {
            inputFields: [
                {key: 'id', required: true},
            ],
            perform: getProduct,
            sample: sample
        }
    },

    list: {
        display: {
            label: 'New Product',
            description: 'Trigger when a new product is added.',
        },
        operation: {
            inputFields: [
            ],
            perform: listProducts,
            sample: sample
        },
    },

    create: {
        display: {
            label: 'Create Product',
            description: 'Creates a new product.',
        },
        operation: {
            inputFields: inputFields,
            perform: createProduct,
            sample: sample
        },
    },

    sample: sample,

    outputFields: [
        {key: 'product_key', label: 'Product Key'},
        {key: 'notes', label: 'Notes'},
        {key: 'cost', label: 'Cost'},
        {key: 'qty', label: 'Quantity'},

    ]
};


