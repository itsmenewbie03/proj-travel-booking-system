import type { PageServerLoad } from "./$types";
import db from "$db/mongo";
import type { Collection } from "mongodb";
import type { Accommodation } from "../../../../models/Accommodation";
export const load = (async ({ params }) => {
    console.log(
        `DEBUG: pulling Accommodation with ID: ${params.accommodation_id}`
    );
    const col: Collection<Accommodation> = db.collection("Accommodation");
    const data = await col
        .find(
            { accommodation_id: params.accommodation_id },
            { projection: { _id: 0 } }
        )
        .toArray();
    console.log("data✨: ", data);
    return {
        traveler_data: data,
    };
}) satisfies PageServerLoad;
