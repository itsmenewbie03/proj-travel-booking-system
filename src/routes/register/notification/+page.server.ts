import type { PageServerLoad } from "./$types";
import db from "$db/mongo";
import type { Collection } from "mongodb";
import type { Traveler } from "../../../models/Traveler";
export const load = (async () => {
    const col: Collection<Traveler> = db.collection("Traveler");
    const data = await col
        .find({}, { projection: { traveler_id: 1, _id: 0 } })
        .toArray();
    console.log("data:", data);
    return {
        ids: data,
    };
}) satisfies PageServerLoad;
