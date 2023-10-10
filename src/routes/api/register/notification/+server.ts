import { json } from "@sveltejs/kit";
import db from "$db/mongo";
import { gen_primary_key } from "../../../../utils/IDGenerator.js";
export async function POST({ request, cookies }) {
    const _db = db.collection("Notification");
    const notifications = await _db.find({}).toArray();
    const data = await request.json();
    if (data?.notification_id) {
        // this is an update
        const result = await _db.updateOne(
            { notification_id: data.notification_id },
            { $set: { ...data } }
        );
        console.log("db says:", result);
        return json(result, { status: 201 });
    }
    const notification_id =
        notifications.length > 0 ? gen_primary_key(notifications) : "N6001";
    const result = await _db.insertOne({ notification_id, ...data });
    console.log("db says:", result);
    return json(result, { status: 201 });
}

export async function DELETE({ request, cookies }) {
    const _db = db.collection("Notification");
    const data = await request.json();
    const { notification_id } = data;
    const result = await _db.deleteOne({ notification_id: notification_id });
    console.log("db says:", result);
    return json(result, { status: 201 });
}
