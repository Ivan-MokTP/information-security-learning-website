var mysql = require('promise-mysql');
 
pool = mysql.createPool({
    host: 'mysql.comp.polyu.edu.hk',
    user: '15044551d',
    password: 'ivan1995cs',
    database: '15044551d',
    connectionLimit : 5,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000
});

pool.getConnection().then(function(connection){   
    console.log("MySQL Connected");   
    pool.releaseConnection(connection);
})

module.exports = pool;