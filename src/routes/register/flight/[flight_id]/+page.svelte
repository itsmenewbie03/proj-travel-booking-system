<script lang="ts">
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
    export let data: PageData;
    let flight = {
        airline: "",
        flight_number: "",
        departure_airport: "",
        arrival_airport: "",
        departure_date_time: "",
        arrival_date_time: "",
        seat_availability: 0,
        ticket_price: 0,
        class: "",
    };
    flight = data.flight_data[0];

    const back = () => {
        goto("/flights");
    };

    const handleSubmit = async (event: Event) => {
        event.preventDefault();
        const resp = await fetch("/api/register/flight", {
            method: "POST",
            body: JSON.stringify(flight),
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
        }).then((res) => res.json());
        alert(JSON.stringify(resp));
    };
</script>

<form on:submit={handleSubmit}>
    <div class="form-control grid grid-cols-2 gap-1">
        <div class="col-span-2">
            <label class="label" for="airline">Airline</label>
            <input
                class="input input-bordered w-full"
                type="text"
                name="airline"
                bind:value={flight.airline}
                required
            />

            <label class="label" for="flight_number">Flight Number</label>
            <input
                class="input input-bordered w-full"
                type="text"
                name="flight_number"
                bind:value={flight.flight_number}
                required
            />

            <label class="label" for="departure_airport"
                >Departure Airport</label
            >
            <input
                class="input input-bordered w-full"
                type="text"
                name="departure_airport"
                bind:value={flight.departure_airport}
                required
            />

            <label class="label" for="arrival_airport">Arrival Airport</label>
            <input
                class="input input-bordered w-full"
                type="text"
                name="arrival_airport"
                bind:value={flight.arrival_airport}
                required
            />
        </div>

        <div class="col-span-1">
            <label class="label" for="departure_date_time"
                >Departure Date and Time</label
            >
            <input
                class="input input-bordered w-full"
                type="datetime-local"
                name="departure_date_time"
                bind:value={flight.departure_date_time}
                required
            />
        </div>
        <div class="col-span-1">
            <label class="label" for="arrival_date_time"
                >Arrival Date and Time</label
            >
            <input
                class="input input-bordered w-full"
                type="datetime-local"
                name="arrival_date_time"
                bind:value={flight.arrival_date_time}
                required
            />
        </div>
        <div class="col-span-2">
            <label class="label" for="seat_availability"
                >Seat Availability</label
            >
            <input
                class="input input-bordered w-full"
                type="number"
                min="0"
                name="seat_availability"
                bind:value={flight.seat_availability}
                required
            />

            <label class="label" for="ticket_price">Ticket Price</label>
            <input
                class="input input-bordered w-full"
                type="number"
                min="0"
                name="ticket_price"
                bind:value={flight.ticket_price}
                required
            />

            <label class="label" for="class">Class</label>
            <select
                class="select select-bordered w-full"
                name="class"
                bind:value={flight.class}
                required
            >
                <option value="">Select Flight Class</option>
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
            </select>
        </div>
        <div class="col-span-2">
            <button class="btn btn-primary w-full mt-1" type="submit"
                >Submit</button
            >
            <button
                class="btn btn-secondary w-full mt-2"
                on:click={(event) => {
                    event.preventDefault();
                    back();
                }}>Back</button
            >
        </div>
    </div>
</form>
