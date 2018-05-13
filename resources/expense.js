const listExpenses = (z, bundle) => {
    return z.request({
        url: '{{bundle.authData.apiUrl}}/expenses',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const searchExpenses = (z, bundle) => {
    return z.request({
        url: bundle.authData.apiUrl + '/expenses',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const getExpense = (z, bundle) => {
    return z.request({
        url: `${bundle.authData.apiUrl}/expenses/${bundle.inputData.id}`,
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        return res.data;
    });
};

const createExpense = (z, bundle) => {
    const requestOptions = {
        url: bundle.authData.apiUrl + '/expenses',
        method: 'POST',
        body: JSON.stringify({
            "client_id": bundle.inputData.client_id,
            'amount': bundle.inputData.amount,
            "private_notes": bundle.inputData.private_notes,
            "public_notes": bundle.inputData.public_notes
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
    "private_notes": "Notes...",
    "public_notes": "Notes...",
    "should_be_invoiced": false,
    "updated_at": 1451160233,
    "archived_at": 1451160233,
    "transaction_id": 1,
    "transaction_reference": "",
    "bank_id": 1,
    "expense_currency_id": 1,
    "expense_category_id": 1,
    "amount": "17.5",
    "expense_date": "2016-01-01",
    "exchange_rate": "",
    "invoice_currency_id": 1,
    "is_deleted": false,
    "tax_name1": "VAT",
    "tax_name2": "Upkeep",
    "tax_rate1": "17.5",
    "tax_rate2": "30.0",
    "client_id": 1,
    "invoice_id": 1,
    "vendor_id": 1
};

const inputFields = [
    {key: 'private_notes', required: true, type: 'text', label: 'Private Notes'},
    {key: 'public_notes', required: true, type: 'text', label: 'Public Notes'},
    {key: 'should_be_invoiced', required: true, type: 'boolean', label: 'Should be Invoiced'},
    {key: 'updated_at', required: true, type: 'datetime', label: 'Updated At'},
    {key: 'archived_at', required: true, type: 'datetime', label: 'Archived At'},
    {key: 'transaction_id', required: true, type: 'integer', label: 'Transaction ID'},
    {key: 'transaction_reference', required: true, type: 'string', label: 'Transaction Reference'},
    {key: 'bank_id', required: true, type: 'integer', label: 'Bank ID'},
    {key: 'expense_currency_id', required: true, type: 'integer', label: 'Expense Currency ID'},
    {key: 'expense_category_id', required: true, type: 'integer', label: 'Expense Category ID'},
    {key: 'amount', required: true, type: 'number', label: 'Amount'},
    {key: 'expense_date', required: true, type: 'datetime', label: 'Expense Date'},
    {key: 'exchange_rate', required: true, type: 'number', label: 'Exchange Rate'},
    {key: 'invoice_currency_id', required: true, type: 'integer', label: 'Invoice Currency ID'},
    {key: 'is_deleted', required: true, type: 'boolean', label: 'Is Deleted'},
    {key: 'tax_name1', required: true, type: 'number', label: 'Tax Name 1'},
    {key: 'tax_name2', required: true, type: 'number', label: 'Tax Name 2'},
    {key: 'tax_rate1', required: true, type: 'number', label: 'Tax Rate 1'},
    {key: 'tax_rate2', required: true, type: 'number', label: 'Tax Rate 2'},
    {key: 'client_id', required: true, type: 'integer', label: 'Client ID', dynamic:'client.id.first_name'},
    {key: 'invoice_id', required: true, type: 'integer', label: 'Invoice ID'},
    {key: 'vendor_id', required: true, type: 'integer', label: 'Vendor ID'},
];

module.exports = {
    key: 'expense',
    noun: 'Expense',

    get: {
        display: {
            label: 'Get Expense',
            description: 'Gets a expense.',
        },
        operation: {
            inputFields: [
                {key: 'id', required: true},
            ],
            perform: getExpense,
            sample: sample
        }
    },

    list: {
        display: {
            label: 'New Expense',
            description: 'Trigger when a new expense is added.',
        },
        operation: {
            inputFields: [
            ],
            perform: listExpenses,
            sample: sample
        },
    },

    create: {
        display: {
            label: 'Create Expense',
            description: 'Creates a new expense.',
        },
        operation: {
            inputFields: inputFields,
            perform: createExpense,
            sample: sample
        },
    },

    sample: sample,

    outputFields: [
        {key: 'private_notes', label: 'Private Notes'},
        {key: 'public_notes', label: 'Public Notes'},
        {key: 'should_be_invoiced', label: 'Should be Invoiced'},
        {key: 'updated_at', label: 'Updated At'},
        {key: 'archived_at', label: 'Archived At'},
        {key: 'transaction_id', label: 'Transaction ID'},
        {key: 'transaction_reference', label: 'Transaction Reference'},
        {key: 'bank_id', label: 'Bank ID'},
        {key: 'expense_currency_id', label: 'Expense Currency ID'},
        {key: 'expense_category_id', label: 'Expense Category ID'},
        {key: 'amount', label: 'Amount'},
        {key: 'expense_date', required: true, type: 'datetime', label: 'Expense Date'},
        {key: 'exchange_rate', label: 'Exchange Rate'},
        {key: 'invoice_currency_id', label: 'Invoice Currency ID'},
        {key: 'is_deleted', label: 'Is Deleted'},
        {key: 'tax_name1', label: 'Tax Name 1'},
        {key: 'tax_name2', label: 'Tax Name 2'},
        {key: 'tax_rate1', label: 'Tax Rate 1'},
        {key: 'tax_rate2', label: 'Tax Rate 2'},
        {key: 'client_id', label: 'Client ID', dynamic:'client.id.first_name'},
        {key: 'invoice_id', label: 'Invoice ID'},
        {key: 'vendor_id', label: 'Vendor ID'},
    ]
};


