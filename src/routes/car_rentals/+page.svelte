<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    $: ({ car_rentals } = data);
</script>

<div>
    <table>
        <caption>CAR RENTALS</caption>
        <tr>
            <th>Car Rental ID</th>
            <th>Rental Company</th>
            <th>Car Model</th>
            <th>Location</th>
            <th>Rental Start Date Time</th>
            <th>Rental End Data Time</th>
            <th>Rental Price per Day</th>
            <th>Car Availability Status</th>
        </tr>
        {#each car_rentals as car_rental}
            <tr>
                <td>{car_rental.car_rental_id}</td>
                <td>{car_rental.rental_company}</td>
                <td>{car_rental.car_model}</td>
                <td>{car_rental.location}</td>
                <td>{car_rental.rental_start_date_time}</td>
                <td>{car_rental.rental_end_date_time}</td>
                <td>{car_rental.rental_price_per_day}</td>
                <td>{car_rental.car_availability_status}</td>
            </tr>
        {/each}
    </table>
</div>
<h4>NOT FOUND? ADD <a href="/register/car_rental">HERE</a></h4>

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
