<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    $: ({ accommodations } = data);
</script>

<table class="table table-auto">
    <caption class="text-2xl m-2">ACCOMMODATIONS</caption>
    <thead
        ><tr>
            <th>Accommodation ID</th>
            <th>Accommodation Name</th>
            <th>Location</th>
            <th>Room Type</th>
            <th>Description</th>
            <th>Price Per Night</th>
            <th>Availability Status</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
        </tr>
    </thead>
    <tbody>
        {#each accommodations as accommodation}
            <tr>
                <td>{accommodation.accommodation_id}</td>
                <td>{accommodation.accommodation_name}</td>
                <td>{accommodation.location}</td>
                <td>{accommodation.room_type}</td>
                <td>{accommodation.description}</td>
                <td>{accommodation.price_per_night}</td>
                <td>{accommodation.availability_status}</td>
                <td>{accommodation.check_in_date}</td>
                <td>{accommodation.check_in_date}</td>
            </tr>
        {/each}
    </tbody>
</table>
<div class="divider">END</div>
<p class="text-lg">Accommodation not found? Add <a href="/register/accommodation" class="link link-secondary">here</a></p>

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
