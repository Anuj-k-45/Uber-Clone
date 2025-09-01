import mongoose from "mongoose";

await mongoose.connect("mongodb://localhost:27017/uber-clone");
const collections = await mongoose.connection.db.listCollections().toArray();
console.log(collections.map((c) => c.name));
