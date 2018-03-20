'use strict'

const App = require('./core/App');
const Database = require('./core/Database');
const routes = require('./routes');

( async () => {

    try {

        await Database.createConnection({
            drive : 'mongodb',
            user  : 'root',
            pwd   : 'btime',
            dbName: 'btime',
            port  : 17539,
            host  : 'ds117539.mlab.com'
        })
        await Promise.all(routes())
        await App.init(8080);

        console.log(`API server is listening on port ${App.port} !`)
    } catch (err) {
        console.error('Can not start api - ' + err)
        console.error(err)
    }

})();
