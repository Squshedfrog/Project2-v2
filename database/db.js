const pg = require('pg')
const Pool = pg.Pool

const config = {
    dev: {
        database: "project2",
    },
    prod: {
        connectionString: process.env.DATABASE_URL,
    }

}




const client = new Pool(process.env.DATABASE_URL ? config.prod : config.dev)

module.exports = client;