const Expense = require('./../../resources/expense');

module.exports = {
    key: 'expenseUpdate',
    noun: 'Expense',
    display: {
        label: 'Update Expense',
        description: 'Updates a expense.'
    },

    // `operation` is where the business logic goes.
    operation: {
        inputFields: Expense.inputFields,
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/expenses/' + bundle.inputData.id,
                method: 'PUT',
                body: JSON.stringify({
                    "private_notes": bundle.inputData.private_notes,
                    "public_notes": bundle.inputData.public_notes,
                    "should_be_invoiced": bundle.inputData.should_be_invoiced,
                    "transaction_id": bundle.inputData.transaction_id,
                    "transaction_reference": bundle.inputData.transaction_reference,
                    "bank_id": bundle.inputData.bank_id,
                    "expense_currency_id": bundle.inputData.expense_currency_id,
                    "expense_category_id": bundle.inputData.expense_category_id,
                    "amount": bundle.inputData.amount,
                    "expense_date": bundle.inputData.expense_date,
                    "exchange_rate": bundle.inputData.exchange_rate,
                    "invoice_currency_id": bundle.inputData.invoice_currency_id,
                    "is_deleted": bundle.inputData.is_deleted,
                    "tax_name1": bundle.inputData.tax_name1,
                    "tax_name2": bundle.inputData.tax_name2,
                    "tax_rate1": bundle.inputData.tax_rate1,
                    "tax_rate2": bundle.inputData.tax_rate2,
                    "client_id": bundle.inputData.client_id,
                    "invoice_id": bundle.inputData.invoice_id,
                    "vendor_id": bundle.inputData.vendor_id
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

        sample: Expense.sample,

        outputFields: Expense.outputFields
    }
};
