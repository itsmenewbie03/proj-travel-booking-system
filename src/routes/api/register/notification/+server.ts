import { json } from "@sveltejs/kit";
import db from "$db/mongo";
export async function POST({ request, cookies }) {
    const _db = db.collection("Notification");
    const notifications = await _db.find({}).toArray();
    const data = await request.json();
    const notification_id = `N6${(notifications.length + 1)
        .toString()
        .padStart(3, "0")}`;
    const result = await _db.insertOne({ notification_id, ...data });
    console.log("db says:", result);
    return json(result, { status: 201 });
}
