var cookieParser = require('cookie-parser');
var session = require('express-session');

var MSSQLStore = require('connect-mssql')(session);
var mssql = require('mssql');

module.exports = {
    createStore: function () {
        var config = {
            user: 'test',
            password: '1111',

            server: 'localhost',
            databse: 'testdb',
            port: 1433,
            pool: {
                max: 10, min: 0,
                idleTiomeoutMillis: 30000

            }
        }
        return new MSSQLStore(config)
    }
}
