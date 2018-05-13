const listUsers = (z, bundle) => {
    return z.request({
        url: '{{bundle.authData.apiUrl}}/users',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const searchUsers = (z, bundle) => {
    return z.request({
        url: bundle.authData.apiUrl + '/users',
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        res = res.data;
        return res;
    });
};

const getUser = (z, bundle) => {
    return z.request({
        url: `${bundle.authData.apiUrl}/users/${bundle.inputData.id}`,
    }).then((response) => {
        let res = z.JSON.parse(response.content);
        if(res.message) {
            throw new Error(res.message);
        }
        return res.data;
    });
};

const createUser = (z, bundle) => {
    const requestOptions = {
        url: bundle.authData.apiUrl + '/users',
        method: 'POST',
        body: JSON.stringify({
            "first_name": bundle.inputData.first_name,
            "last_name": bundle.inputData.last_name,
            "email": bundle.inputData.email,
            "account_key": bundle.inputData.account_key,
            "phone": bundle.inputData.phone,
            "registered": bundle.inputData.confirmed,
            "confirmed": bundle.inputData.confirmed,
            "oauth_user_id": bundle.inputData.oauth_user_id,
            "oauth_provider_id": bundle.inputData.oauth_provider_id,
            "notify_sent": bundle.inputData.notify_sent,
            "notify_viewed": bundle.inputData.notify_viewed,
            "notify_paid": bundle.inputData.notify_paid,
            "notify_approved": bundle.inputData.notify_approved,
            "is_admin": bundle.inputData.is_admin,
            "permissions": bundle.inputData.permissions
        })
    };

    return z.request(requestOptions)
        .then((response) => {
            console.log(response);
            let res = z.JSON.parse(response.content);
            if(res.message) {
                throw new Error(res.message);
            }
            return res.data;
        });
};


const sample = {
    "id": "1",
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@isp.com",
    "account_key": "123456",
    "phone": "(212) 555-1212",
    "registered": false,
    "confirmed": false,
    "oauth_user_id": 1,
    "oauth_provider_id": 1,
    "notify_sent": false,
    "notify_viewed": false,
    "notify_paid": false,
    "notify_approved": false,
    "is_admin": false,
    "permissions": 1
};

module.exports = {
    key: 'user',
    noun: 'User',

    get: {
        display: {
            label: 'Get User',
            description: 'Gets a user.',
        },
        operation: {
            inputFields: [
                {key: 'id', required: true},
            ],
            perform: getUser,
            sample: sample
        }
    },

    list: {
        display: {
            label: 'New User',
            description: 'Trigger when a new user is added.',
        },
        operation: {
            inputFields: [
            ],
            perform: listUsers,
            sample: sample
        },
    },

    create: {
        display: {
            label: 'Create User',
            description: 'Creates a new user.',
        },
        operation: {
            inputFields: [
                {key: 'first_name', required: true, type: 'string', label: 'First Name'},
                {key: 'last_name', required: true, type: 'string', label: 'Last Name'},
                {key: 'email', required: true, type: 'string', label: 'Email'},
                {key: 'account_key', required: true, type: 'string', label: 'Account Key'},
                {key: 'phone', required: true, type: 'string', label: 'Phone'},
                {key: 'registered', required: true, type: 'boolean', label: 'Registered'},
                {key: 'confirmed', required: true, type: 'boolean', label: 'Confirmed'},
                {key: 'oauth_user_id', required: true, type: 'boolean', label: 'OAuth User ID'},
                {key: 'oauth_provider_id', required: true, type: 'boolean', label: 'OAuth Provider ID'},
                {key: 'notify_sent', required: true, type: 'boolean', label: 'Notify Sent'},
                {key: 'notify_viewed', required: true, type: 'boolean', label: 'Notify Viewed'},
                {key: 'notify_paid', required: true, type: 'boolean', label: 'Notify Paid'},
                {key: 'notify_approved', required: true, type: 'boolean', label: 'Notify Approved'},
                {key: 'is_admin', required: true, type: 'boolean', label: 'Is Admin'},
                {key: 'notify_sent', required: true, type: 'boolean', label: 'Notify Sent'},
                {key: 'permissions', required: true, type: 'integer', label: 'Permissions'},
            ],
            perform: createUser,
            sample: sample
        },
    },

    sample: sample,

    outputFields: [
        {key: 'first_name', label: 'First Name'},
        {key: 'last_name', label: 'Last Name'},
        {key: 'email', label: 'Email'},
        {key: 'account_key', label: 'Account Key'},
        {key: 'phone', label: 'Phone'},
        {key: 'registered', label: 'Registered'},
        {key: 'confirmed', label: 'Confirmed'},
        {key: 'oauth_user_id', label: 'OAuth User ID'},
        {key: 'oauth_provider_id', label: 'OAuth Provider ID'},
        {key: 'notify_sent', label: 'Notify Sent'},
        {key: 'notify_viewed', label: 'Notify Viewed'},
        {key: 'notify_paid', label: 'Notify Paid'},
        {key: 'notify_approved', label: 'Notify Approved'},
        {key: 'is_admin', label: 'Is Admin'},
        {key: 'notify_sent', label: 'Notify Sent'},
        {key: 'permissions', label: 'Permissions'},
    ]
};


