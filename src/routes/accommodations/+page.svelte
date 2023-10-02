<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
    $: ({ accommodations } = data);

</script>
<div>
    <table>
        <caption>ACCOMMODATIONS</caption>
        <tr>
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
    </table>
</div>
<h4>NOT FOUND? ADD <a href="/register/accommodation">HERE</a></h4>

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
