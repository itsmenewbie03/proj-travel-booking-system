import { json } from "@sveltejs/kit";
import db from "$db/mongo";
import { gen_primary_key } from "../../../../utils/IDGenerator.js";
export async function POST({ request, cookies }) {
    const _db = db.collection("Accommodation");
    const accommodations = await _db.find({}).toArray();
    const data = await request.json();
    if (data?.accommodation_id) {
        // call updateOne coz this is an update
        const result = await _db.updateOne(
            { accommodation_id: data.accommodation_id },
            { $set: { ...data } }
        );
        console.log("db says:", result);
        return json(result, { status: 201 });
    }
    const accommodation_id =
        accommodations.length > 0 ? gen_primary_key(accommodations) : "A2001";
    const result = await _db.insertOne({ accommodation_id, ...data });
    console.log("db says:", result);
    return json(result, { status: 201 });
}
export async function DELETE({ request, cookies }) {
    const _db = db.collection("Accommodation");
    const data = await request.json();
    const { accommodation_id } = data;
    const result = await _db.deleteOne({ accommodation_id: accommodation_id });
    console.log("db says:", result);
    return json(result, { status: 201 });
}
