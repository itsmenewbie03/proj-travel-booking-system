import type { PageServerLoad } from "./$types";
import db from "$db/mongo";
import type { Collection } from "mongodb";
import type { Booking } from "../../models/Booking";
export const load = (async () => {
    const col: Collection<Booking> = db.collection("Booking");
    const data = await col.find({}, { projection: { _id: 0 } }).toArray();
    console.log("data:", data);
    return {
        bookings: data,
    };
}) satisfies PageServerLoad;
