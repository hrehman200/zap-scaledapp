const listQuotes = (z, bundle) => {
    const promise = z.request('{{bundle.authData.apiUrl}}/quotes');
    return promise.then((response) => {

        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

module.exports = {
    key: 'quote',
    noun: 'Quote',
    display: {
        label: 'New Quote',
        description: 'Trigger when a new quote is added.'
    },
    operation: {
        perform: listQuotes,
        sample: {
            "id": 1,
            "amount": 10,
            "balance": 10,
            "client_id": 1,
            "invoice_number": "0001",
            "private_notes": "Notes...",
            "public_notes": "Notes..."
        }
    }
};
