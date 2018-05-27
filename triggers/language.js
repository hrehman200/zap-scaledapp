const listLanguages = (z, bundle) => {
    const promise = z.request('{{bundle.authData.apiUrl}}/static');
    return promise.then((response) => {

        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data.languages;
        return res;
    });
};

module.exports = {
    key: 'language',
    noun: 'Language',
    display: {
        label: 'New Language',
        description: 'Trigger when a new language is added.'
    },
    operation: {
        perform: listLanguages,
        sample: {
            "id": 1,
            "name": "English"
        }
    }
};
