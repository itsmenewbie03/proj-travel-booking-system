import { json } from "@sveltejs/kit";
import db from "$db/mongo";
export async function POST({ request, cookies }) {
    const _db = db.collection("Accommodation");
    const accommodations = await _db.find({}).toArray();
    const data = await request.json();
    const accommodation_id = `A2${(accommodations.length + 1)
        .toString()
        .padStart(3, "0")}`;
    const result = await _db.insertOne({ accommodation_id, ...data });
    console.log("db says:", result);
    return json(result, { status: 201 });
}
