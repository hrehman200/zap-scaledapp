const Config = require('./config');
const Client = require('./resources/client');

const addApiKeyToHeader = (request, z, bundle) => {
    request.headers['X-MarketingBot-Token'] = Config.api.token;
    request.headers['content-type'] = 'application/json';
    return request;
};

// We can roll up all our behaviors in an App.
const App = {
    // This is just shorthand to reference the installed dependencies you have. Zapier will
    // need to know these before we can upload
    version: require('./package.json').version,
    platformVersion: require('zapier-platform-core').version,

    // beforeRequest & afterResponse are optional hooks into the provided HTTP client
    beforeRequest: [
        addApiKeyToHeader
    ],

    afterResponse: [],

    // If you want to define optional resources to simplify creation of resources, searches, creates - do that here!
    resources: {
        [Client.key]: Client
    },

    // If you want your trigger to show up, you better include it here!
    triggers: {

    },

    // If you want your searches to show up, you better include it here!
    searches: {},

    // If you want your creates to show up, you better include it here!
    creates: {}
};

// Finally, export the app.
module.exports = App;
