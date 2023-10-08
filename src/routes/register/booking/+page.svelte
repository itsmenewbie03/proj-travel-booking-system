<script lang="ts">
    //@ts-nocheck
    import { compute_duration } from "./../../../utils/DateMagic";
    import type { PageData } from "./$types";

    export let data: PageData;
    $: ({ accommodation_ids, car_rental_ids, flight_ids, traveler_ids } = data);
    let booking = {
        traveler_id: "",
        accommodation_id: "",
        flight_id: "",
        car_rental_id: "",
        total_price: 0,
        booking_date_time: "",
        payment_status: "",
        booking_status: "",
    };
    const compute_cost = (event?: Event) => {
        event?.preventDefault();
        if (
            !booking.accommodation_id ||
            !booking.flight_id ||
            !booking.car_rental_id
        ) {
            alert(
                "Please finish selecting accommodation, flight, and car rental first!"
            );
            return 0;
        }
        // accommodation total_price:  price per night * days spent (check out - check in)
        const accommodation = accommodation_ids.find(
            (e) => e.accommodation_id == booking.accommodation_id
        );
        const accommodation_cost =
            compute_duration(
                accommodation?.check_in_date,
                accommodation?.check_out_date
            ) * accommodation?.price_per_night;

        // flight cost
        const flight = flight_ids.find((e) => e.flight_id == booking.flight_id);
        const flight_cost = flight?.ticket_price;

        // car rental cost
        // car rental total price: car_rental_price_per_day * days used
        const car_rental = car_rental_ids.find(
            (e) => e.car_rental_id == booking.car_rental_id
        );
        const car_rental_cost =
            compute_duration(
                car_rental?.rental_start_date_time,
                car_rental?.rental_end_date_time
            ) * car_rental?.rental_price_per_day;

        const total_cost = accommodation_cost + flight_cost + car_rental_cost;
        booking.total_price = total_cost;
        return total_cost;
    };
    const handleSubmit = async () => {
        booking.total_price = compute_cost();
        const response = await fetch("/api/register/booking", {
            method: "POST",
            body: JSON.stringify(booking),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
        alert(JSON.stringify(response));
    };
</script>

<form on:submit={handleSubmit}>
    <div class="form-control">
        <label class="label" for="traveler_id">Traveler ID</label>
        <select
            class="select select-bordered w-full"
            name="traveler_id"
            bind:value={booking.traveler_id}
            required
        >
            <option value="">Select Traveler ID</option>
            {#each traveler_ids as traveler_id}
                <option value={traveler_id.traveler_id}
                    >{traveler_id.traveler_id}</option
                >
            {/each}
        </select>

        <label class="label" for="accommodation_id">Accommodation ID</label>
        <select
            class="select select-bordered w-full"
            name="accommodation_id"
            bind:value={booking.accommodation_id}
            required
        >
            <option value="">Select Accommodation ID</option>
            {#each accommodation_ids as accommodation_id}
                <option value={accommodation_id.accommodation_id}
                    >{accommodation_id.accommodation_id}</option
                >
            {/each}
        </select>

        <label class="label" for="flight_id">Flight ID</label>
        <select
            class="select select-bordered w-full"
            name="flight_id"
            bind:value={booking.flight_id}
            required
        >
            <option value="">Select Flight ID</option>
            {#each flight_ids as flight_id}
                <option value={flight_id.flight_id}
                    >{flight_id.flight_id}</option
                >
            {/each}
        </select>

        <label class="label" for="car_rental_id">Car Rental ID</label>
        <select
            class="select select-bordered w-full"
            name="car_rental_id"
            bind:value={booking.car_rental_id}
            required
        >
            <option value="">Select Car Rental ID</option>
            {#each car_rental_ids as car_rental_id}
                <option value={car_rental_id.car_rental_id}
                    >{car_rental_id.car_rental_id}</option
                >
            {/each}
        </select>

        <label class="label" for="total_price">Total Price</label>
        <input
            class="input input-bordered input-disabled w-full"
            type="number"
            bind:value={booking.total_price}
            required
            readonly
        />

        <label class="label" for="booking_date_time"
            >Booking Date and Time</label
        >
        <input
            class="input input-bordered w-full"
            type="datetime-local"
            name="booking_date_time"
            bind:value={booking.booking_date_time}
            required
        />

        <label class="label" for="payment_status">Payment Status</label>
        <select
            class="input input-bordered w-full"
            name="payment_status"
            bind:value={booking.payment_status}
            required
        >
            <option value="">Select Payment Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
        </select>

        <label class="label" for="booking_status">Booking Status</label>
        <select
            class="input input-bordered w-full"
            name="booking_status"
            bind:value={booking.booking_status}
            required
        >
            <option value="">Select Booking Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Canceled">Canceled</option>
        </select>
        <div class="join join-horizontal mt-1 w-full space-x-1">
            <button class="flex-1 btn btn-primary w-1/2 join-item" type="submit"
                >Submit</button
            >
            <button
                class="flex-1 btn btn-primary w-1/2 join-item"
                on:click={compute_cost}>Compute Cost</button
            >
        </div>
        <a href="/bookings"
            ><button class="btn btn-secondary mt-1 w-full">Back</button></a
        >
    </div>
</form>
