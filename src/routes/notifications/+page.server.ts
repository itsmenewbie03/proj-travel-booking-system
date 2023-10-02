import type { PageServerLoad } from "./$types";
import db from "$db/mongo";
import type { Collection } from "mongodb";
import type { Notification } from "../../models/Notification";
export const load = (async () => {
    const col: Collection<Notification> = db.collection("Notification");
    const data = await col.find({}, { projection: { _id: 0 } }).toArray();
    console.log("data:", data);
    return {
        notifications: data,
    };
}) satisfies PageServerLoad;
