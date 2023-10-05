import type { PageServerLoad } from "./$types";
import db from "$db/mongo";
import type { Collection } from "mongodb";
import type { Traveler } from "../../../../models/Traveler";
export const load = (async ({ params }) => {
    console.log(`DEBUG: pulling Traveler with ID: ${params.traveler_id}`);
    const col: Collection<Traveler> = db.collection("Traveler");
    const data = await col
        .find({ traveler_id: params.traveler_id }, { projection: { _id: 0 } })
        .toArray();
    console.log("data✨: ", data);
    return {
        traveler_data: data,
    };
}) satisfies PageServerLoad;
