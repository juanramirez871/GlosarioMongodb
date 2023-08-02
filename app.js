import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import "dotenv/config";

const app = express();
const connection = new MongoClient(process.env.URI_MONGODB)
const dbName = "campus";
const db = connection.db(dbName).collection("M3");

const main = async() => {
    
    await connection.connect();

    //! Cruda basico
    //const insertUser = { name: "Leslie", age: 18, ratings: [34, 43, 54] };
    //let newUser = await db.insertOne(insertUser);
    //let countUsers = await db.countDocuments();
    //const updateUser = await db.updateOne({ name: "Daniela" }, { $pull: { ratings: 13 } })
    //const deleteUser = await db.deleteOne({ _id: new ObjectId("64ca8acab505b1ffe13500bc") })
    //let users = await db.find().toArray();

    //! transacciones

    const session = connection.startSession()

    await session.withTransaction(async() => {

        const updateUser = await db.updateOne(
            { name: "Daniela" },
            { $pull: { ratings: 13 }},
            { session }
            )
        const deleteUser = await db.deleteOne(
            { _id: new ObjectId("64ca8acab505b1ffe13500bc") },
            { session }
            )
    })

    await session.endSession()
    return true;
}

main()
    .then(() => console.log("connecting to database success"))
    .catch((err) => console.error(`Error connecting to database: ${err}`))
    .finally(() => connection.close());
    


//app.get()




app.listen(3000, console.log("server run..."))