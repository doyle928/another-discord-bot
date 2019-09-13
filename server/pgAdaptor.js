// // require("dotenv").config();
// const pgPromise = require("pg-promise");

// const pgp = pgPromise({}); // Empty object means no additional config required

// // const config = {
// //   url: process.env.POSTGRES_HOST,
// //   port: process.env.POSTGRES_PORT,
// //   database: process.env.POSTGRES_DB,
// //   user: process.env.POSTGRES_USER,
// //   password: process.env.POSTGRES_PASSWORD
// // };

// // const db = pgp(config);
// const db = pgp(process.env.DATABASE_URL);

// if (!db) {
//   console.log("Database setup unsuccessful.");
//   process.exit(1);
// }

// exports.db = db;
