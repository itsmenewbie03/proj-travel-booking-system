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
    <fieldset>
        <legend>NOTIFICATION INFO</legend>
        <label>
            Traveler ID:
            <select bind:value={notification.traveler_id} required>
                {#each ids as id}
                    <option value={id.traveler_id}>{id.traveler_id}</option>
                {/each}
            </select>
        </label>
        <br />
        <label>
            Notification Type:
            <input
                type="text"
                bind:value={notification.notification_type}
                required
            />
        </label>
        <br />
        <label>
            Content:
            <textarea bind:value={notification.content} required />
        </label>
        <br />
        <label>
            Timestamp:
            <input
                type="datetime-local"
                bind:value={notification.timestamp}
                required
            />
        </label>
        <br />
        <label>
            Status:
            <select bind:value={notification.status} required>
                <option value="Unread">Unread</option>
                <option value="Read">Read</option>
            </select>
        </label>
    </fieldset>

    <button type="submit">Submit</button>
    <a href="/notifications"><button>Back</button></a>
</form>
