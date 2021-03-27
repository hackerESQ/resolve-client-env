const path = require('path');  
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand')

module.exports = function resolveClientEnv (options) {

    // set default options
    const defaults = {
        env_path: '../.env', 
        prefixRE: /^VUE_APP_/,
        expand: true,
        base_url:'/',
        loadAdditionalKeys:[]
    };
    options = { ...defaults, ...options };

    // get laravel env file
    const clientEnv = new dotenv.config({
        path: path.join(process.cwd(), options.env_path)
    });

    // should we expand?
    if (options.expand) {
        dotenvExpand(clientEnv);
    }

    // populates ENV array 
    const env = {}
    Object.keys(clientEnv.parsed).forEach(key => {
        // only fetches ENVs that meet prefix requirement OR specifically requested
        if (options.prefixRE.test(key) || key === 'NODE_ENV' || options.loadAdditionalKeys.includes(key)) {
            env[key] = clientEnv.parsed[key]
        }
    })

    // sets the required vue variables
    env.BASE_URL = options.base_url;
    env.NODE_ENV = process.env.NODE_ENV;

    // stringify keys so they're safe
    for (const key in env) {
        env['process.env.' + key] = JSON.stringify(env[key])
    }
    
    // return env
    return env;
}
