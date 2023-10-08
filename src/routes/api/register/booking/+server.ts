import { json } from "@sveltejs/kit";
import db from "$db/mongo";
import { gen_primary_key } from "../../../../utils/IDGenerator.js";
export async function POST({ request, cookies }) {
    const _db = db.collection("Booking");
    const bookings = await _db.find({}).toArray();
    const data = await request.json();
    if (data?.booking_id) {
        // do update
        const result = await _db.updateOne(
            { booking_id: data.booking_id },
            { $set: { ...data } }
        );
        console.log("db says:", result);
        return json(result, { status: 201 });
    }
    const booking_id =
        bookings.length > 0 ? gen_primary_key(bookings) : "B5001";
    const result = await _db.insertOne({ booking_id, ...data });
    console.log("db says:", result);
    return json(result, { status: 201 });
}
export async function DELETE({ request, cookies }) {
    const _db = db.collection("Booking");
    const data = await request.json();
    const { booking_id } = data;
    const result = await _db.deleteOne({ booking_id: booking_id });
    console.log("db says:", result);
    return json(result, { status: 201 });
}
