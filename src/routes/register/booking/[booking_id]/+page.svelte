<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;

    import { _alert, Toaster } from "$lib/utils/CustomAlert";
    let success: boolean;
    let message: string;

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
    booking = data.booking_data[0];
    // const compute_cost = (event?: Event) => {
    //     event?.preventDefault();
    //     if (
    //         !booking.accommodation_id ||
    //         !booking.flight_id ||
    //         !booking.car_rental_id
    //     ) {
    //         alert(
    //             "Please finish selecting accommodation, flight, and car rental first!"
    //         );
    //         return 0;
    //     }
    //     // accommodation total_price:  price per night * days spent (check out - check in)
    //     const accommodation = accommodation_ids.find(
    //         (e) => e.accommodation_id == booking.accommodation_id
    //     );
    //     const accommodation_cost =
    //         compute_duration(
    //             accommodation?.check_in_date,
    //             accommodation?.check_out_date
    //         ) * accommodation?.price_per_night;

    //     // flight cost
    //     const flight = flight_ids.find((e) => e.flight_id == booking.flight_id);
    //     const flight_cost = flight?.ticket_price;

    //     // car rental cost
    //     // car rental total price: car_rental_price_per_day * days used
    //     const car_rental = car_rental_ids.find(
    //         (e) => e.car_rental_id == booking.car_rental_id
    //     );
    //     const car_rental_cost =
    //         compute_duration(
    //             car_rental?.rental_start_date_time,
    //             car_rental?.rental_end_date_time
    //         ) * car_rental?.rental_price_per_day;

    //     const total_cost = accommodation_cost + flight_cost + car_rental_cost;
    //     booking.total_price = total_cost;
    //     return total_cost;
    // };
    const handleSubmit = async (event: Event) => {
        event.preventDefault();
        const resp = await fetch("/api/register/booking", {
            method: "POST",
            body: JSON.stringify(booking),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
        if (resp.acknowledged && resp.modifiedCount) {
            success = true;
            message = "Booking updated successfully.";
        } else {
            success = false;
            message =
                resp?.matchedCount > 0 && !resp?.modifiedCount
                    ? "No changes detected."
                    : "Failed to update booking.";
            // print a log coz why not?
            console.log(
                `[${Date.now()}] Hey Developer You Got a Problem: ${JSON.stringify(
                    resp
                )}`
            );
        }
        _alert(success, message);
    };
</script>

<Toaster />

<form on:submit={handleSubmit}>
    <div class="form-control">
        <label class="label" for="traveler_id">Traveler ID</label>
        <input
            class="select select-bordered select-disabled w-full"
            name="traveler_id"
            bind:value={booking.traveler_id}
            required
            readonly
        />

        <label class="label" for="accommodation_id">Accommodation ID</label>
        <input
            class="select select-bordered select-disabled w-full"
            name="accommodation_id"
            bind:value={booking.accommodation_id}
            required
            readonly
        />

        <label class="label" for="flight_id">Flight ID</label>
        <input
            class="select select-bordered select-disabled w-full"
            name="flight_id"
            bind:value={booking.flight_id}
            required
            readonly
        />

        <label class="label" for="car_rental_id">Car Rental ID</label>
        <input
            class="select select-bordered select-disabled w-full"
            name="car_rental_id"
            bind:value={booking.car_rental_id}
            required
            readonly
        />

        <label class="label" for="total_price">Total Price</label>
        <input
            class="input input-bordered w-full input-disabled"
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
            <button class="flex-1 btn btn-disabled w-1/2 join-item" disabled
                >Compute Cost</button
            >
        </div>
        <a href="/bookings"
            ><button class="btn btn-secondary mt-1 w-full">Back</button></a
        >
    </div>
</form>
