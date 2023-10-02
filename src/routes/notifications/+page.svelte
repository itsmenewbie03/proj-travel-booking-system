<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
    $: ({ notifications } = data);
</script>

<div>
    <table>
        <caption>NOTIFICATIONS</caption>
        <tr>
            <th>Notification ID</th>
            <th>Traveler ID</th>
            <th>Notification Type</th>
            <th>Content</th>
            <th>Timestamp</th>
            <th>Status</th>
        </tr>
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
    </table>
</div>
<h4>NOT FOUND? ADD <a href="/register/notification">HERE</a></h4>

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
