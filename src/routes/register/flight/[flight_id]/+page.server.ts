import type { PageServerLoad } from "./$types";
import db from "$db/mongo";
import type { Collection } from "mongodb";
import type { Flight } from "../../../../models/Flight";
export const load = (async ({ params }) => {
    console.log(`DEBUG: pulling Flight with ID: ${params.flight_id}`);
    const col: Collection<Flight> = db.collection("Flight");
    const data = await col
        .find({ flight_id: params.flight_id }, { projection: { _id: 0 } })
        .toArray();
    console.log("data✨: ", data);
    return {
        flight_data: data,
    };
}) satisfies PageServerLoad;
