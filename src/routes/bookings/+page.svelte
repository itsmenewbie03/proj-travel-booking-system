<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    $: ({ bookings } = data);
</script>

<div>
    <table>
        <caption>BOOKINGS</caption>
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
    </table>
</div>
<h4>NOT FOUND? CREATE <a href="/register/booking">HERE</a></h4>

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
