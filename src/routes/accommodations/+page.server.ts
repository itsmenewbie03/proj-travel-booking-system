import type { PageServerLoad } from "./$types";
import db from "$db/mongo";
import type { Collection } from "mongodb";
import type { Accommodation } from "../../models/Accommodation";
export const load = (async () => {
    const col: Collection<Accommodation> = db.collection("Accommodation");
    const data = await col.find({}, { projection: { _id: 0 } }).toArray();
    console.log("data:", data);
    return {
        accommodations: data,
    };
}) satisfies PageServerLoad;
