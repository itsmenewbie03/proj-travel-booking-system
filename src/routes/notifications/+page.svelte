<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
    $: ({ notifications } = data);
</script>

<table class="table table-auto">
    <caption class="text-2xl m-2">NOTIFICATIONS</caption>
    <thead>
        <tr>
            <th>Notification ID</th>
            <th>Traveler ID</th>
            <th>Notification Type</th>
            <th>Content</th>
            <th>Timestamp</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        {#each notifications as notification}
            <tr>
                <td>{notification.notification_id}</td>
                <td>{notification.traveler_id}</td>
                <td>{notification.notification_type}</td>
                <td>{notification.content}</td>
                <td>{notification.timestamp}</td>
                <td>{notification.status}</td>
            </tr>
        {/each}
    </tbody>
</table>
<div class="divider">END</div>

<p class="text-lg">Notification not found? Add <a href="/register/notification" class="link link-secondary">here</a></p>
<style>
    tr,
    th,
    td {
        border: 1px solid black;
    }
    caption {
        font-weight: bold;
    }
</style>
