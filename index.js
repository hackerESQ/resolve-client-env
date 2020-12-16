const path = require('path');  
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand')

module.exports = function resolveClientEnv (options) {

    // set default options
    const defaults = {
        env_path: '../.env', 
        prefixRE: /^VUE_APP_/,
        expand: true,
        base_url:'/'
    };
    options = { ...defaults, ...options };

    // get laravel env file
    const LaravelENVs = new dotenv.config({
        path: path.join(process.cwd(), options.env_path)
    });

    if (options.expand) {
        dotenvExpand(LaravelENVs);
    }

    // populates ENV array 
    const env = {}
    Object.keys(LaravelENVs.parsed).forEach(key => {
        // only fetches ENVs that meet prefix requirement
        if (options.prefixRE.test(key) || key === 'NODE_ENV') {
            env[key] = LaravelENVs.parsed[key]
        }
    })

    env.BASE_URL = JSON.stringify(options.base_url);
    env.NODE_ENV = JSON.stringify(process.env.NODE_ENV);

    // if we need to stringify
    // for (const key in env) {
    //   env[key] = JSON.stringify(env[key])
    // }
    return {
        'process.env': env
    }
}
