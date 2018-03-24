const listCountries = (z, bundle) => {
    const promise = z.request('{{bundle.authData.apiUrl}}/countries');
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
    key: 'country',
    noun: 'Country',
    display: {
        label: 'New Country',
        description: 'Trigger when a new country is added.'
    },
    operation: {
        perform: listCountries,
        sample: {
            "id": 1,
            "name": "United States"
        }
    }
};
