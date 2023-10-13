<script lang="ts">
    import { goto } from "$app/navigation";
    import type { PageData } from "./$types";

    export let data: PageData;

    import { _alert, Toaster } from "$lib/utils/CustomAlert";
    let success: boolean;
    let message: string;

    let notification = {
        traveler_id: "",
        notification_type: "",
        content: "",
        timestamp: "",
        status: "",
    };

    const back = () => {
        goto("/notifications");
    };

    notification = data.notification_data[0];

    const handleSubmit = async (event: Event) => {
        event.preventDefault();
        const resp = await fetch("/api/register/notification", {
            method: "POST",
            body: JSON.stringify(notification),
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
        }).then((res) => res.json());
        if (resp.acknowledged && resp.modifiedCount) {
            success = true;
            message = "Notification updated successfully.";
        } else {
            success = false;
            message =
                resp?.matchedCount > 0 && !resp?.modifiedCount
                    ? "No changes detected."
                    : "Failed to update notification.";
            // print a log coz why not?
            console.log(
                `[${Date.now()}] Hey Developer You Got a Problem: ${JSON.stringify(
                    resp
                )}`
            );
        }
        _alert(success, message);
    };
</script>

<Toaster />

<form on:submit={handleSubmit}>
    <div class="form-control">
        <label class="label" for="traveler_id">Traveler ID</label>
        <input
            class="select select-bordered select-disabled w-full"
            name="traveler_id"
            bind:value={notification.traveler_id}
            required
            readonly
        />

        <label class="label" for="notification_type">Notification Type</label>
        <input
            class="input input-bordered w-full"
            type="text"
            name="notification_type"
            bind:value={notification.notification_type}
            required
        />

        <label class="label" for="content">Content</label>
        <textarea
            class="textarea textarea-bordered w-full"
            name="content"
            bind:value={notification.content}
            required
        />

        <label class="label" for="timestamp">Timestamp</label>
        <input
            class="input input-bordered w-full"
            type="datetime-local"
            name="timestamp"
            bind:value={notification.timestamp}
            required
        />

        <label class="label" for="status">Status</label>
        <select
            class="select select-bordered w-full"
            name="status"
            bind:value={notification.status}
            required
        >
            <option value="">Select Notification Status</option>
            <option value="Unread">Unread</option>
            <option value="Read">Read</option>
        </select>

        <button class="btn btn-primary mt-1" type="submit">Submit</button>
        <button
            class="btn btn-secondary w-full mt-1"
            on:click={(event) => {
                event.preventDefault();
                back();
            }}>Back</button
        >
    </div>
</form>
