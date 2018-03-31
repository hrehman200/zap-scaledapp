const ExpenseCategory = require('./../../resources/expense_category');

module.exports = {
    key: 'expenseCategoryUpdate',
    noun: 'Expense Category',
    display: {
        label: 'Update Expense',
        description: 'Updates a expense category.'
    },

    // `operation` is where the business logic goes.
    operation: {
        inputFields: ExpenseCategory.inputFields,
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/expense_categories/' + bundle.inputData.id,
                method: 'PUT',
                body: JSON.stringify({
                    "name": bundle.inputData.name,
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

        sample: ExpenseCategory.sample,

        outputFields: ExpenseCategory.outputFields
    }
};
