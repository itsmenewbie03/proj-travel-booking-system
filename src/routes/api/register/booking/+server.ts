import { json } from "@sveltejs/kit";
import db from "$db/mongo";
export async function POST({ request, cookies }) {
    const _db = db.collection("Booking");
    const bookings = await _db.find({}).toArray();
    const data = await request.json();
    const booking_id = `B5${(bookings.length + 1).toString().padStart(3, "0")}`;
    const result = await _db.insertOne({ booking_id, ...data });
    console.log("db says:", result);
    return json(result, { status: 201 });
}
