import { json } from "@sveltejs/kit";
import db from "$db/mongo";
export async function POST({ request, cookies }) {
    const _db = db.collection("CarRental");
    const car_rentals = await _db.find({}).toArray();
    const data = await request.json();
    const car_rental_id = `C4${(car_rentals.length + 1).toString().padStart(3, "0")}`;
    const result = await _db.insertOne({ car_rental_id, ...data });
    console.log("db says:", result);
    return json(result, { status: 201 });
}
