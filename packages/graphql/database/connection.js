const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = process.env.DATABASE_NAME;

// Use connect method to connect to the Server

module.exports = async () => {
  // Create a new MongoClient
  const client = new MongoClient(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  await client.connect();
  const db = client.db(dbName);
  return { db, client };
  /*return new Promise((resolve, reject) => {
    client.connect(function (err) {
      //assert.equal(null, err);
      if (err) {
        return reject(err);
      }
      console.log("Connected successfully to server");

      const db = client.db(dbName);

      //client.close();
      return resolve(db);
    });
  });*/
};
