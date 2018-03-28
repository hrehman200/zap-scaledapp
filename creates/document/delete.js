const Document = require('./../../resources/document');

module.exports = {
    key: 'documentDelete',
    noun: 'Document',
    display: {
        label: 'Delete Document',
        description: 'Deletes a document.'
    },

    // `operation` is where the business logic goes.
    operation: {
        inputFields: [
            {key: 'document_id', required: true, type: 'integer', label: 'Document ID'},
        ],
        perform: (z, bundle) => {
            const promise = z.request({
                url: bundle.authData.apiUrl + '/documents/' + bundle.inputData.id,
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

        sample: Document.sample,
        outputFields: Document.outputFields
    }
};
