import type { PageServerLoad } from "./$types";
import db from "$db/mongo";
import type { Collection } from "mongodb";
import type { Notification } from "../../../../models/Notification";
export const load = (async ({ params }) => {
    console.log(
        `DEBUG: pulling Notification with ID: ${params.notification_id}`
    );
    const col: Collection<Notification> = db.collection("Notification");
    const data = await col
        .find(
            { notification_id: params.notification_id },
            { projection: { _id: 0 } }
        )
        .toArray();
    console.log("data✨: ", data);
    return {
        notification_data: data,
    };
}) satisfies PageServerLoad;
