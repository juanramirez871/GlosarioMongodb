use("campus");

//? insertar un documento 
//db.M3.insertOne({ name: "juan" })

//? insertar muchos documentos
//db.M3.insertMany([ { name: "Luna" }, { name: "Daniela" } ])

//? eliminar un documento
//db.M3.deleteOne({ _id: ObjectId('64c96dc4f1cff184b705bcb7') })

//? actualizar muchos documentos solo los campos especificados, con updateOne esta la opcion en el tercer argumento de { upsert: true } si no existe creame ese registro y si existe actualizalo, el pop elimina el ultimo elemento del array si es un y si es -1 elimina el primero, el pull elimina el valor especificado

//db.updateOne({ name: "Daniela" }, { $pull: { ratings: 13 } })
//db.updateOne({ name: "Leslie" }, { $pop: { ratings: -1 } })
//db.M3.updateMany({ }, { $set: { ratings: [10, 11, 13, 14] } })

//? actualizar una matrix
//db.M3.updateOne({ name: "Daniela" }, { $push: { ratings: 100 } })

//? remplaza documentos, absolutamente todo el documento por la data que se le paso
//db.M3.replaceOne({ name: "Luna" }, { name: "Diego", age: 11 })

//? Modifica todo el documento y lo devuelve y segun el campo new devolvera el documento con las actualizaciones o no, tambien esta el findAndUpdate
// db.M3.findAndModify(
//     { 
//         query: { name: "Emily" },
//         update: { name: "Emily", age: 20, ratings: [99, 99] },
//         new: true 
//     })

//? buscar todos los documentos
//db.M3.find()

//? encontrar un documento por su campo
//db.M3.find({ name: "Daniela" })

//? encontrar un campo que como valor este al menos una vez en la matriz dada
//db.M3.find({ age: { $in: [18, 17] } })

//? $gt significa que sea mayor al numero especificado
//db.M3.find({ age: { $gt: 17 } })

//? $gte significa que sea mayor o igual al numero especificado
//db.M3.find({ age: { $gte: 18 } })

//? $lt significa que sea menor al numero especificado
//db.M3.find({ age: { $lt: 18 } })

//? $lte significa que sea menor o igual al numero especificado
//db.M3.find({ age: { $lte: 18 } })

//? $elemMatch trae el valor que coincide que este dentro de una matriz y en una matriz con objetos, el $eq lo puedes cambiar por el que necesites
//db.M3.find({ ratings: { $elemMatch: { $eq: 10 } } })

//? $and es un operador logico que todas las coincidencias se debe cumplir para traer el documento
//db.M3.find({ $and: [ { age: 18 }, { name: "Daniela" } ] })

//? $or es un operador logico que al menos una coincidencia se debe cumplir para traer el documento
//db.M3.find({ $or: [ { name: "juan" }, { name: "Daniela" } ] })

//? $or y $and se debe cumplir almenos una vez cada or, se puede jugar con lo operadores
// db.routes.find({
//     $and: [
//       { $or: [{ dst_airport: "SEA" }, { src_airport: "SEA" }] },
//       { $or: [{ "airline.name": "American Airlines" }, { airplane: 320 }] },
//     ]
//   })

//? ordena el campo especificado, el 1 lo ordena de menor a mayor y el -1 lo rodena de mayor a menor
//db.M3.find().sort({ age: -1 })

//? me trae solo la cantidad que yo le especifico
//db.M3.find().limit(1)

//? para mostrar ciertos campos debes dar un segundo objeto con el nombre del campo con 1 si quieres que se muestre y 0 si no quieres que se muestre
//db.M3.find({}, { name: 1, _id: 0 })

//? cuenta todos los valores traido con la consulta
//db.M3.countDocuments({ age: { $in: [18, 20, 1] } })

//? traer una referencia match solo trae las coincidencias
// db.getCollection("M3").aggregate([
        // {
        //     $match: { _id: 1 }
        // },
//     {
//         $lookup: {
//           from: collection,
//           localField: field,
//           foreignField: field,
//           as: result
//         }
//     }
// ])


// Auto moviles

// use("db_campus_alquiler");

//? Agrupa la relacion por el campo tipo
// db.Contrato.aggregate([

//     //{ $match: { _id: 2 } },
//     {
//         $lookup: {
//           from: "Cliente",
//           localField: "ID_Cliente",
//           foreignField: "_id",
//           as: "clientes",
//         }
//     },
//     { $project: { Fecha_Inicio: 0, Fecha_Final: 0 } },
//     { 
//         $group: {
//             _id: "$Tipo",
//             clientes: { $push: "$clientes" },
//         }
//     }

// ])

//? metodos de agregacion

// db.M3.aggregate([
//     {
//         $group: {
//             _id: "$age",
//             totalAge: { $sum: "$age" },
//             names: { $push: "$name" }
//         }
//     },
//     { $sort: { age: 1 } },
//     { $limit: 4 }
// ])

//? proyecciones en una agregacion

// db.M3.aggregate([
//     {
//         $project: { 
//             _id: 0, 
//             birthDay: { $subtract: [2023, "$age"] },
//             name: 1,
//             age: 1
//         }
//     }
// ])

//? crea una indexacion a los campos especificados, el 1 significa que va traer los datos ordenados ascendentemente y el -1 que los va a traer en orden descendentemente, tambien puede recibir si el valo va ser unico
//db.M3.createIndex({ name: 1 }, { unique: true })

//? le muestra los detalles de la consulta y si tiene una indexacion
//db.M3.explain().find({ name: "juan" })

//? elimina una indexacion que no se esta utilizando porque entre mas indexacion es mas el costo de la inserccion y actualizacio para ver los cambios en el rendimiento primero debes ejecutar el hiddenIndex para ocultarlo primero
//db.M3.dropIndex("nombre de la indexacion")


//? Esquemas con mongodb purito

// db.createCollection("week", {

//         capped: true,
//         size: 690,
//         max: 5,
//         validator: {

//                 $jsonSchema: {

//                         bsonType: "object",
//                         additionalProperties: false,
//                         required: [ "name", "numberDay" ],
//                         properties: {
//                                 _id: { bsonType: "objectId" },
//                                 name: { bsonType: "string", description: "name is required of type string" },
//                                 numberDay: { bsonType: "int", description: "numberDay is required of type integer" },
//                         }
//                 }
//         }
// })