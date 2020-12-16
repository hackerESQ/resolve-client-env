# resolveClientEnv
pull in .env files from anywhere in a Vue CLI app

## Use case
I use this small module to load the .env file from my Laravel project into a Vue CLI 3 project, where both are in the same repo. This enables the ability to use a single .env file (as opposed to having 2 separate files).

## Install

1. **Install package**

run `npm install git+https://github.com/hackerESQ/resolve-client-env.git --save` to install this package

or you can add:

`"resolve-client-env": "github:hackerESQ/resolve-client-env",`

to your package.json dependencies.

2. **Update vue.config.js**

Add the following line to the top of your vue.config.js file:

`const resolveClientEnv = require('resolve-client-env')`

and add the following to the end of your module.export array:

```
chainWebpack: config => {
     config
      .plugin('define')       // Overwrites the existing Vue CLI 'define' plugin
        .use(
          webpack.DefinePlugin, [
            resolveClientEnv()
          ]
        )
  }
```

## Use

Add variables to your .env file in your Laravel project root. Be sure to prefix the new variables with "VUE_APP_" in order for the variables to be included in your Vue CLI project. Example: `VUE_APP_NAME="Fancy App"`

You can also use the .env expansion feature and reference existing variables, like so: `VUE_APP_NAME="${APP_NAME}"`. That way you won't have to duplicate existing variables.

This variable is now accessible in Vue through the `process.env.VUE_APP_NAME` variable. 

## Configure

You can pass options to the resolveClientEnv() function. Here are the available options with their defaults:

```
{
  env_path: '../.env',           // location of the .env file to include
  prefixRE: /^VUE_APP_/,         // prefix of .env variables to include
  expand: true,                  // expand variables
  base_url: '/'                  // set base url variable for Vue router
}
```

## Future steps

* package this into an installable NPM or YARN package.




