var mysql = require('promise-mysql');
 
pool = mysql.createPool({
    host: 'mysql.comp.polyu.edu.hk',
    user: '15044551d',
    password: 'ivan1995cs',
    database: '15044551d'
});

pool.getConnection().then(function(connection){   
    console.log("MySQL Connected");   
})

module.exports = pool;