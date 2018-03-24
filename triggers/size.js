const listSizes = (z, bundle) => {
    const promise = z.request('{{bundle.authData.apiUrl}}/sizes');
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
    key: 'size',
    noun: 'Size',
    display: {
        label: 'New Size',
        description: 'Trigger when a new size is added.'
    },
    operation: {
        perform: listSizes,
        sample: {
            "id": "2945d9c624f446deb90d7a35e8c0e308",
            "name": "1 - 3"
        }
    }
};
