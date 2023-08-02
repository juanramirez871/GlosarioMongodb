import express from "express";
import { MongoClient } from "mongodb";
const app = express();
const connection = new MongoClient('mongodb+srv://myAtlasDBUser:123@myatlasclusteredu.mhc53io.mongodb.net/?retryWrites=true&w=majority')
const dbName = "campus";

const main = async() => {

    await connection.connect();
    const db = connection.db(dbName);

    return true;
}

main()
    .then(() => console.log("connecting to database success"))
    .catch((err) => console.error(`Error connecting to database: ${err}`))
    .finally(() => connection.close());
    
//app.get()




app.listen(3000, console.log("server run..."))