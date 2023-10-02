<script>
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

    const handleSubmit = async () => {
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
    <fieldset>
        <legend>FLIGHT INFO</legend>
        <br />
        <label>
            Airline:
            <input type="text" bind:value={flight.airline} required />
        </label>
        <br />
        <label>
            Flight Number:
            <input type="text" bind:value={flight.flight_number} required />
        </label>
        <br />
        <label>
            Departure Airport:
            <input type="text" bind:value={flight.departure_airport} required />
        </label>
        <br />
        <label>
            Arrival Airport:
            <input type="text" bind:value={flight.arrival_airport} required />
        </label>
        <br />
        <label>
            Departure Date and Time:
            <input
                type="datetime-local"
                bind:value={flight.departure_date_time}
                required
            />
        </label>
        <br />
        <label>
            Arrival Date and Time:
            <input
                type="datetime-local"
                bind:value={flight.arrival_date_time}
                required
            />
        </label>
        <br />
        <label>
            Seat Availability:
            <input
                type="number"
                min="0"
                bind:value={flight.seat_availability}
                required
            />
        </label>
        <br />
        <label>
            Ticket Price:
            <input
                type="number"
                min="0"
                bind:value={flight.ticket_price}
                required
            />
        </label>
        <br />
        <label>
            Class:
            <select bind:value={flight.class} required>
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
            </select>
        </label>
    </fieldset>

    <button type="submit">Submit</button>
    <a href="/flights"><button>Back</button></a>
</form>
