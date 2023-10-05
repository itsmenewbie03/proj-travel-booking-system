import type { PageServerLoad } from "./$types";
import db from "$db/mongo";
import type { Collection } from "mongodb";
import type { Traveler } from "../../models/Traveler";
import { travelers } from "../../stores/Travelers";
export const load = (async () => {
    const col: Collection<Traveler> = db.collection("Traveler");
    const data = await col.find({}, { projection: { _id: 0 } }).toArray();
    travelers.set(data);
    console.log(`Traveler Store from Server: ${JSON.stringify(travelers)}`)
    console.log("data from mongodb:", data);
    return {
        travelers: data,
    };
}) satisfies PageServerLoad;
// i'm annoyed now