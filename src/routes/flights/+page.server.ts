import type { PageServerLoad } from "./$types";
import db from "$db/mongo";
import type { Collection } from "mongodb";
import type { Flight } from "../../models/Flight";
export const load = (async () => {
    const col: Collection<Flight> = db.collection("Flight");
    const data = await col.find({}, { projection: { _id: 0 } }).toArray();
    console.log("data:", data);
    return {
        flights: data,
    };
}) satisfies PageServerLoad;
