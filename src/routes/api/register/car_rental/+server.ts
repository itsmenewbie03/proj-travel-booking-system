import { json } from "@sveltejs/kit";
import db from "$db/mongo";
import { gen_primary_key } from "../../../../utils/IDGenerator.js";
export async function POST({ request, cookies }) {
    const _db = db.collection("CarRental");
    const car_rentals = await _db.find({}).toArray();
    const data = await request.json();
    if (data?.car_rental_id) {
        // this is an update
        const result = await _db.updateOne(
            { car_rental_id: data.car_rental_id },
            { $set: { ...data } }
        );
        console.log("db says:", result);
        return json(result, { status: 201 });
    }
    const car_rental_id =
        car_rentals.length > 0 ? gen_primary_key(car_rentals) : "C4001";
    const result = await _db.insertOne({ car_rental_id, ...data });
    console.log("db says:", result);
    return json(result, { status: 201 });
}
export async function DELETE({ request, cookies }) {
    const _db = db.collection("CarRental");
    const data = await request.json();
    const { car_rental_id } = data;
    const result = await _db.deleteOne({ car_rental_id: car_rental_id });
    console.log("db says:", result);
    return json(result, { status: 201 });
}
