<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    $: ({ ids } = data);

    let notification = {
        traveler_id: "",
        notification_type: "",
        content: "",
        timestamp: "",
        status: "",
    };

    const handleSubmit = async () => {
        const resp = await fetch("/api/register/notification", {
            method: "POST",
            body: JSON.stringify(notification),
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
        }).then((res) => res.json());
        alert(JSON.stringify(resp));
    };
    // Sample traveler IDs for the dropdown// You can provide the actual traveler IDs here
</script>

<form on:submit={handleSubmit}>
    <div class="form-control">
        <label class="label" for="traveler_id">Traveler ID</label>
        <select
            class="select select-bordered w-full"
            name="traveler_id"
            bind:value={notification.traveler_id}
            required
        >
            <option value="">Select Traveler ID</option>

            {#each ids as id}
                <option value={id.traveler_id}>{id.traveler_id}</option>
            {/each}
        </select>

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
        <a href="/notifications"
            ><button class="btn btn-secondary w-full mt-1">Back</button></a
        >
    </div>
</form>
