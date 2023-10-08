import type { PageServerLoad } from "./$types";
import db from "$db/mongo";
import type { Collection } from "mongodb";
import type { CarRental } from "../../../../models/CarRental";
export const load = (async ({ params }) => {
    console.log(`DEBUG: pulling CarRental with ID: ${params.car_rental_id}`);
    const col: Collection<CarRental> = db.collection("CarRental");
    const data = await col
        .find(
            { car_rental_id: params.car_rental_id },
            { projection: { _id: 0 } }
        )
        .toArray();
    console.log("data✨: ", data);
    return {
        car_rental_data: data,
    };
}) satisfies PageServerLoad;
