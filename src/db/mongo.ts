import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/TravelBookingSystem");

export const start_mongo = () => {
    console.log("Starting mongodb...");
    return client.connect();
};
export default client.db();
