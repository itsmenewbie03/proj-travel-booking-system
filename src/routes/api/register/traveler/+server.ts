import { json } from "@sveltejs/kit";
import db from "$db/mongo";
import { gen_primary_key } from "../../../../utils/IDGenerator";
export async function POST({ request, cookies }) {
    const _db = db.collection("Traveler");
    const _travelers = await _db.find({}).toArray();
    const data = await request.json();
    if (data?.traveler_id) {
        // this is an update operation so we don't insert
        const result = await _db.updateOne(
            { traveler_id: data.traveler_id },
            { $set: { ...data } }
        );
        console.log("db says:", result);
        return json(result, { status: 201 });
    }
    const traveler_id =
        _travelers.length > 0 ? gen_primary_key(_travelers) : "T1001";
    const result = await _db.insertOne({ traveler_id, ...data });
    return json(result, { status: 201 });
}

export async function DELETE({ request, cookies }) {
    const _db = db.collection("Traveler");
    const data = await request.json();
    const { traveler_id } = data;
    const result = await _db.deleteOne({ traveler_id: traveler_id });
    console.log("db says:", result);
    return json(result, { status: 201 });
}
