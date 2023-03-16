const fs = require('fs')


function logger(req, res, next) {
    
    let data =(`-- ${new Date().toLocaleString()} ${req.method} - ${req.url}\n` )
    console.log(data);
    

    // --------------- change later ----------------
    // fs.appendFile('./logs/logs.txt', data, (err) => {
          
    //     // In case of a error throw err.
    //     if (err) throw err;
    // }
    //)
    
    next()
}

module.exports = logger;