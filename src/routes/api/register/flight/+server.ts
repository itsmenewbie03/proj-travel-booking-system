import { json } from "@sveltejs/kit";
import db from "$db/mongo";
export async function POST({ request, cookies }) {
    const _db = db.collection("Flight");
    const flights = await _db.find({}).toArray();
    const data = await request.json();
    const flight_id = `F3${(flights.length + 1).toString().padStart(3, "0")}`;
    const result = await _db.insertOne({ flight_id, ...data });
    console.log("db says:", result);
    return json(result, { status: 201 });
}
