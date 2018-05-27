const listCountries = (z, bundle) => {
    const promise = z.request('{{bundle.authData.apiUrl}}/static');
    return promise.then((response) => {

        console.log(response.content);
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data.countries;
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
