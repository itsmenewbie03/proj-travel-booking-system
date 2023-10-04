<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    $: ({ flights } = data);
</script>

<table class="table table-auto">
    <caption class="text-2xl m-2">FLIGHTS</caption>
    <thead>
        <tr>
            <th>Flight ID</th>
            <th>Airline</th>
            <th>Flight Number</th>
            <th>Departure Airport</th>
            <th>Arrival Airport</th>
            <th>Departure Date Time</th>
            <th>Arrival Date Time</th>
            <th>Seat Availability</th>
            <th>Ticker Price</th>
            <th>Class</th>
        </tr>
    </thead>
    <tbody>
        {#each flights as flight}
            <tr>
                <td>{flight.flight_id}</td>
                <td>{flight.airline}</td>
                <td>{flight.flight_number}</td>
                <td>{flight.departure_airport}</td>
                <td>{flight.arrival_airport}</td>
                <td>{flight.departure_date_time}</td>
                <td>{flight.arrival_date_time}</td>
                <td>{flight.seat_availability}</td>
                <td>{flight.ticket_price}</td>
                <td>{flight.class}</td>
            </tr>
        {/each}
    </tbody>
</table>
<div class="divider">END</div>
<p class="text-lg">Flight not found? Add <a href="/register/flight" class="link link-secondary">here</a></p>

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
