import type { PageServerLoad } from "./$types";
import db from "$db/mongo";
import type { Collection } from "mongodb";
import type { Booking } from "../../../../models/Booking";
export const load = (async ({ params }) => {
    console.log(`DEBUG: pulling Booking with ID: ${params.booking_id}`);
    const col: Collection<Booking> = db.collection("Booking");
    const data = await col
        .find({ booking_id: params.booking_id }, { projection: { _id: 0 } })
        .toArray();
    console.log("data✨: ", data);
    return {
        booking_data: data,
    };
}) satisfies PageServerLoad;
