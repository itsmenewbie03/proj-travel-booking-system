<script lang="ts">
    import {compute_duration} from "./../../../utils/DateMagic";
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
    const compute_cost = (event?:Event) => {
        event?.preventDefault();
        if(!booking.accommodation_id || !booking.flight_id || !booking.car_rental_id){
            alert('Please finish selecting accommodation, flight, and car rental first!')
            return 0
        }
        // accommodation total_price:  price per night * days spent (check out - check in)
        const accommodation = accommodation_ids.find(e => e.accommodation_id == booking.accommodation_id);
        //@ts-ignore
        const accommodation_cost = compute_duration(accommodation?.check_in_date,accommodation?.check_out_date) * accommodation?.price_per_night;

        // flight cost
        const flight = flight_ids.find(e => e.flight_id == booking.flight_id);
        const flight_cost = flight?.ticket_price;
        
        // car rental cost
        // car rental total price: car_rental_price_per_day * days used
        const car_rental = car_rental_ids.find(e => e.car_rental_id == booking.car_rental_id);
        //@ts-ignore
        const car_rental_cost = compute_duration(car_rental?.rental_start_date_time,car_rental?.rental_end_date_time) * car_rental?.rental_price_per_day;

        // @ts-ignore
        const total_cost = accommodation_cost + flight_cost + car_rental_cost;
        booking.total_price = total_cost;
        return total_cost;
    }
    const handleSubmit = async () => {
        booking.total_price = compute_cost()
        const response = await fetch("/api/register/booking", {
            method: "POST",
            body: JSON.stringify(booking),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json());
        alert(JSON.stringify(response));
    };
</script>

<form on:submit={handleSubmit}>
    <fieldset>
        <legend>Booking Information</legend>
        <label>
            Traveler ID:
            <select bind:value={booking.traveler_id} required>
                <option value="">Select Traveler ID</option>
                {#each traveler_ids as traveler_id}
                    <option value={traveler_id.traveler_id}
                        >{traveler_id.traveler_id}</option
                    >
                {/each}
            </select>
        </label><br />

        <!-- Accommodation ID as a select -->
        <label>
            Accommodation ID:
            <select bind:value={booking.accommodation_id} required>
                <option value="">Select Accommodation ID</option>
                {#each accommodation_ids as accommodation_id}
                    <option value={accommodation_id.accommodation_id}
                        >{accommodation_id.accommodation_id}</option
                    >
                {/each}
                <!-- Add more options as needed -->
            </select>
        </label><br />

        <!-- Flight ID as a select -->
        <label>
            Flight ID:
            <select bind:value={booking.flight_id} required>
                <option value="">Select Flight ID</option>
                {#each flight_ids as flight_id}
                    <option value={flight_id.flight_id}
                        >{flight_id.flight_id}</option
                    >
                {/each}
                <!-- Add more options as needed -->
            </select>
        </label><br />

        <!-- Car Rental ID as a select -->
        <label>
            Car Rental ID:
            <select bind:value={booking.car_rental_id} required>
                <option value="">Select Car Rental ID</option>
                {#each car_rental_ids as car_rental_id}
                    <option value={car_rental_id.car_rental_id}
                        >{car_rental_id.car_rental_id}</option
                    >
                {/each}
                <!-- Add more options as needed -->
            </select>
        </label><br />
        <label>
            Total Price:
            <input
                type="number"
                bind:value={booking.total_price}
                required
                readonly
            />
        </label><br />
        <label>
            Booking Date and Time:
            <input
                type="datetime-local"
                bind:value={booking.booking_date_time}
                required
            />
        </label><br />
        <label>
            Payment Status:
            <select bind:value={booking.payment_status} required>
                <option value="">Select Payment Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <!-- Add more options as needed -->
            </select>
        </label><br />

        <!-- Booking Status as a select -->
        <label>
            Booking Status:
            <select bind:value={booking.booking_status} required>
                <option value="">Select Booking Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Canceled">Canceled</option>
                <!-- Add more options as needed -->
            </select>
        </label><br />
    </fieldset>

    <button type="submit">Submit</button>
    <button on:click={compute_cost}>Compute Cost</button>

    <a href="/bookings"><button>Back</button></a>
</form>
