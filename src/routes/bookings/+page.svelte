<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    $: ({ bookings } = data);
</script>

<table class="table table-auto">
    <caption class="text-2xl m-2">BOOKINGS</caption>
    <thead>
        <tr>
            <th>Booking ID</th>
            <th>Traveler ID</th>
            <th>Accommodation ID</th>
            <th>Flight ID</th>
            <th>Car Rental ID</th>
            <th>Total Price</th>
            <th>Booking Date and Time</th>
            <th>Payment Status</th>
            <th>Booking Status</th>
        </tr>
    </thead>
    <tbody>
        {#each bookings as booking}
            <tr>
                <td>{booking.booking_id}</td>
                <td>{booking.traveler_id}</td>
                <td>{booking.accommodation_id}</td>
                <td>{booking.flight_id}</td>
                <td>{booking.car_rental_id}</td>
                <td>{booking.total_price}</td>
                <td>{booking.booking_date_time}</td>
                <td>{booking.payment_status}</td>
                <td>{booking.booking_status}</td>
            </tr>
        {/each}
    </tbody>
</table>
<div class="divider">END</div>
<p class="text-lg">Booking not found? Create <a href="/register/booking" class="link link-secondary">here</a></p>

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
