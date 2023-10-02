import { json } from "@sveltejs/kit";
import db from "$db/mongo";
export async function POST({ request, cookies }) {
    const _db = db.collection("Traveler");
    const travelers = await _db.find({}).toArray();
    const data = await request.json();
    const traveler_id = `T1${(travelers.length + 1)
        .toString()
        .padStart(3, "0")}`;
    const result = await _db.insertOne({ traveler_id, ...data });
    console.log("db says:", result);
    return json(result, { status: 201 });
}
