mb-conf
=====

Super-lightweight config library for JavaScript

Install
-----

Node

    npm install --save mb-conf

    var conf = require('mb-conf')

Browsers

    bower install --save mb-conf

    <script src='bower_components/mb-conf/dist/conf.js'></script>

    // conf
    // window.conf

Usage
-----

`conf()` is always invoked as a standalone function.

### conf()

Will return *all* of the configuration options.

### conf('foo')

Will return the requested configuration option.

### conf({ foo: 'bar' })

Will extend the configuration options with the passed object.

### conf('key', 'value')

Will set the configuration option with the specified key to the specified value. Value can be any type.

Recommended Setup
-----

For Node projects, I recommend you create a `config.js` in a shared directory. (Typically for me, this means creating a `lib` directory, then starting the Node project with `NODE_PATH=lib`. So I would have  a `lib/config.js`)

Then set up your `config.js` project to look like:

    var conf = require('mb-conf'),
        env = process.env.NODE_ENV || 'development';  // I use 'development' as a default environment value. Very optional

    // === config for all environments
    conf({
        name: 'my-awesome-project',
        api_key: 'abc123',
        env: env
    });

    // === config for the current environment
    conf({
        development: {
            port: 3000,
            mongo_uri: 'mongodb://localhost/my-awesome-project'
        },
        alpha: {
            port: process.env.PORT,
            mongo_uri: process.env.MONGO_URI
        },
        production: {
            port: 80,
            mongo_uri: process.env.MONGO_URI
        }
    }[env]);

    module.exports = conf;

Then, from any file inside of your project, you can include your predefined config options.

    var expresss = require('express'),
        mongoose = require('mongoose'),
        config = require('config'),
        server = express();

    mongoose.connect(config.mongo_uri);

    server.use(function(req, res) {
        res.send('TODO: Make the server do stuff')
    });

    server.listen(config.port, function() {
        console.log('Server listening on port %s in %s mode', config.port, config.env);
    });

This setup abstracts away your configuration management, and let's you `require('config')` in any file you need access to your config options.

Contact & License Info
-----

Author: Matthew Balmer  
Twitter: [@mattbalmer](http://twitter.com/mattbalmer)  
Website: [http://mattbalmer.com](http://mattbalmer.com)  
License: MIT
