import type { PageServerLoad } from "./$types";
import db from "$db/mongo";
import type { Collection } from "mongodb";
import type { CarRental } from "../../models/CarRental";
export const load = (async () => {
    const col: Collection<CarRental> = db.collection("CarRental");
    const data = await col.find({}, { projection: { _id: 0 } }).toArray();
    console.log("data:", data);
    return {
        car_rentals: data,
    };
}) satisfies PageServerLoad;
