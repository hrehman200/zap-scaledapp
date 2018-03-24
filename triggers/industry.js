const listIndustries = (z, bundle) => {
    const promise = z.request('{{bundle.authData.apiUrl}}/industries');
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
    key: 'industry',
    noun: 'Industry',
    display: {
        label: 'New Industry',
        description: 'Trigger when a new industry is added.'
    },
    operation: {
        perform: listIndustries,
        sample: {
            "id": "2945d9c624f446deb90d7a35e8c0e308",
            "name": "Aerospace"
        }
    }
};
