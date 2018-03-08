const testAuth = (z, bundle) => {

    return z.request({
        url: '{{bundle.authData.apiUrl}}/clients',
        rejectUnauthorized: false
    }).then((response) => {
        if (response.status != 200) {
            throw new Error('The API Key you supplied is invalid');
        }
        return response;
    });
};

module.exports = {
    type: 'custom',
    // Define any auth fields your app requires here. The user will be prompted to enter this info when
    // they connect their account.
    fields: [
        {key: 'apiUrl', label: 'API Base URL', required: true, type: 'string'},
        {key: 'apiKey', label: 'API Key', required: true, type: 'string'}
    ],
    // The test method allows Zapier to verify that the credentials a user provides are valid. We'll execute this
    // method whenver a user connects their account for the first time.
    test: testAuth
};
