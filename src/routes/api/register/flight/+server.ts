import { json } from "@sveltejs/kit";
import db from "$db/mongo";
import { gen_primary_key } from "../../../../utils/IDGenerator.js";
export async function POST({ request, cookies }) {
    const _db = db.collection("Flight");
    const flights = await _db.find({}).toArray();
    const data = await request.json();
    if (data?.flight_id) {
        // do update
        const result = await _db.updateOne(
            { flight_id: data.flight_id },
            { $set: { ...data } }
        );
        console.log("db says:", result);
        return json(result, { status: 201 });
    }
    const flight_id = flights.length > 0 ? gen_primary_key(flights) : "F3001";
    const result = await _db.insertOne({ flight_id, ...data });
    console.log("db says:", result);
    return json(result, { status: 201 });
}

export async function DELETE({ request, cookies }) {
    const _db = db.collection("Flight");
    const data = await request.json();
    const { flight_id } = data;
    const result = await _db.deleteOne({ flight_id: flight_id });
    console.log("db says:", result);
    return json(result, { status: 201 });
}
