const request = require('request');
const FormData = require('form-data');

const listDocuments = (z, bundle) => {
    return z.request({
        url: '{{bundle.authData.apiUrl}}/documents',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const searchDocuments = (z, bundle) => {
    return z.request({
        url: bundle.authData.apiUrl + '/documents',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const getDocument = (z, bundle) => {
    return z.request({
        url: `${bundle.authData.apiUrl}/documents/${bundle.inputData.id}`,
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        return res.data;
    });
};

const createDocument = (z, bundle) => {

    let formData = new FormData();
    formData.append('name', bundle.inputData.name);
    formData.append('type', bundle.inputData.type);
    formData.append('path', bundle.inputData.path);
    formData.append('invoice_id', bundle.inputData.invoice_id);

    // file will in fact be an url where the file data can be downloaded from
    // which we do via a stream created by NPM's request package
    // (form-data doesn't play nicely with z.request)
    formData.append('file', request(bundle.inputData.file));

    /*let jsonObject = {};
    for (var i in formData) {
        z.console.log(i);
        z.console.log(formData);
        jsonObject[i] = formData[i];
    }*/

    const requestOptions = {
        url: bundle.authData.apiUrl + '/documents',
        method: 'POST',
        body: formData,
        headers: formData.getHeaders()
    };

    return z.request(requestOptions)
        .then((response) => {
            let res = z.JSON.parse(response.content);
            if(res.message) {
                throw new Error(res.message);
            }
            return res.data;
        });
};


const sample = {
    "id": 1,
    "name": "sample.png",
    "type": "png",
    "path": "abc/sample.png",
    "invoice_id": 1,
    "file": "SOME FILE",
    "updated_at": 1451160233,
    "archived_at": 1451160233
};

const inputFields = [
    {key: 'name', required: true, type: 'string', label: 'Name'},
    {key: 'type', required: true, type: 'string', label: 'Type'},
    {key: 'path', required: true, type: 'string', label: 'Path'},
    {key: 'invoice_id', required: true, type: 'integer', label: 'Invoice ID', dynamic:'invoice.id.invoice_number'},
    {key: 'file', required: true, type: 'file', label: 'File'},
];

module.exports = {
    key: 'document',
    noun: 'Document',

    get: {
        display: {
            label: 'Get Document',
            description: 'Gets a document.',
        },
        operation: {
            inputFields: [
                {key: 'id', required: true},
            ],
            perform: getDocument,
            sample: sample
        }
    },

    list: {
        display: {
            label: 'New Document',
            description: 'Trigger when a new document is added.',
        },
        operation: {
            inputFields: [
            ],
            perform: listDocuments,
            sample: sample
        },
    },

    create: {
        display: {
            label: 'Create Document',
            description: 'Creates a new document.',
        },
        operation: {
            inputFields: inputFields,
            perform: createDocument,
            sample: sample
        },
    },

    search: {
        display: {
            label: 'Find Document',
            description: 'Finds an existing document.',
        },
        operation: {
            inputFields: [

            ],
            perform: searchDocuments,
            sample: sample
        }
    },

    sample: sample,

    outputFields: [
        {key: 'id', label: 'ID'},
        {key: 'name', label: 'Name'},
        {key: 'type', label: 'Type'},
        {key: 'path', label: 'Path'},
        {key: 'invoice_id', label: 'Invoice ID'},
        {key: 'updated_at', label: 'Updated at'},
        {key: 'archived_at', label: 'Archived at'},
    ]
};


