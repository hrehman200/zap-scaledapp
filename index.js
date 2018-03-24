const authentication = require('./authentication');
const client = require('./resources/client');
const clientUpdate = require('./creates/client/update');
const clientDelete = require('./creates/client/delete');

const contact = require('./resources/contact');

const user = require('./resources/user');

const quote = require('./triggers/quote');
const country = require('./triggers/country');
const language = require('./triggers/language');
const size = require('./triggers/size');
const industry = require('./triggers/industry');


const addApiKeyToHeader = (request, z, bundle) => {
    if (bundle.authData.apiKey) {
        request.params = request.params || {};
        request.headers['X-MarketingBot-Token'] = bundle.authData.apiKey;
    }
    request.headers['content-type'] = 'application/json';
    return request;
};

// HTTP after middleware that checks for errors in the response.
const checkForErrors = (response, z) => {
    // If we get a bad status code, throw an error. This will halt the zap.
    if (response.status != 200) {
        throw new z.errors.HaltedError(`Unexpected status code ${response.status} from ${response.request.url}`);
    }

    // If no errors just return original response
    return response;
};

// We can roll up all our behaviors in an App.
const App = {
    // This is just shorthand to reference the installed dependencies you have. Zapier will
    // need to know these before we can upload
    version: require('./package.json').version,
    platformVersion: require('zapier-platform-core').version,
    authentication: authentication,

    // beforeRequest & afterResponse are optional hooks into the provided HTTP client
    beforeRequest: [
        addApiKeyToHeader
    ],

    afterResponse: [
        checkForErrors
    ],

    // If you want to define optional resources to simplify creation of resources, searches, creates - do that here!
    resources: {
        [client.key]: client,
        [contact.key]: contact,
        [user.key]: user,
    },

    // If you want your trigger to show up, you better include it here!
    triggers: {
        [quote.key]: quote,
        [country.key]: country,
        [language.key]: language,
        [size.key]: size,
        [industry.key]: industry
    },

    // If you want your searches to show up, you better include it here!
    searches: {},

    // If you want your creates to show up, you better include it here!
    creates: {
        [clientUpdate.key]: clientUpdate,
        [clientDelete.key]: clientDelete
    }
};

// Finally, export the app.
module.exports = App;
