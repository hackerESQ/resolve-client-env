const path = require('path');  
const dotenv = require('dotenv-webpack')

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
    const LaravelENVs = new dotenv({
        path: path.join(process.cwd(), options.env_path) ,
        expand: options.expand,
    })

    // clean up LaravelENVs (removes 'process.env' from key)
    Object.keys(LaravelENVs.definitions).forEach(key => {
        var newkey = key.replace(/^process.env.\b/,"");
        
        LaravelENVs.definitions[newkey] = LaravelENVs.definitions[key];

        delete LaravelENVs.definitions[key];
    })

    // populates ENV array 
    const env = {}
    Object.keys(LaravelENVs.definitions).forEach(key => {
        // only fetches ENVs that meet prefix requirement
        if (options.prefixRE.test(key) || key === 'NODE_ENV') {
            env[key] = LaravelENVs.definitions[key]
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
