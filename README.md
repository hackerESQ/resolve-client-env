# resolveClientEnv
pull in .env files from anywhere in a Vue CLI app

## Use case
I use this small module to load the .env file from my Laravel project into a Vue CLI 3 project, where both are in the same repo. This enables the ability to use a single .env file (as opposed to having 2 separate files).

## Install

1. **Create /utils/resolveClientEnv.js**

Copy the resolveClientEnv.js file into your Vue CLI project somwhere. These instructions assume you put this file in ./utils/resolveClientEnv.js

2. **Update vue.config.js**

Add the following line to the top of your vue.config.js file:

`const resolveClientEnv = require('./utils/resolveClientEnv')`

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

3. Install dotenv-webpack

run the following to install dotenv-webpack:

`npm i dotenv-webpack --save-dev`

## Use

Add variables to your .env file in your Laravel project root. Be sure to prefix the new variables with "VUE_APP_" in order for the variables to be included in your Vue CLI project. Example: `VUE_APP_NAME="Fancy App"`

You can also use the .env expansion feature and reference existing variables, like so: `VUE_APP_NAME="${APP_NAME}"`. That way you won't have to duplicate existing variables.

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




