const Expense = require('./../../resources/expense');

module.exports = {
    key: 'expenseDelete',
    noun: 'Expense',
    display: {
        label: 'Delete Expense',
        description: 'Deletes a expense.'
    },

    operation: {
        inputFields: [
            {key: 'expense_id', required: true, type: 'integer', label: 'Expense ID'},
        ],
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/expenses/' + bundle.inputData.id,
                method: 'PUT',
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

        sample: Expense.sample,
        outputFields: Expense.outputFields
    }
};
