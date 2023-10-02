<script>
    let car_rental = {
        rental_company: "",
        car_model: "",
        location: "",
        rental_start_date_time: "",
        rental_end_date_time: "",
        rental_price_per_day: 0,
        car_availability_status: "",
    };

    const handleSubmit = async () => {
        const resp = await fetch("/api/register/car_rental", {
            method: "POST",
            body: JSON.stringify(car_rental),
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
        <legend>CAR RENTAL INFO</legend>
        <label>
            Rental Company:
            <input
                type="text"
                bind:value={car_rental.rental_company}
                required
            />
        </label>
        <br />
        <label>
            Car Model:
            <input type="text" bind:value={car_rental.car_model} required />
        </label>
        <br />
        <label>
            Location:
            <input type="text" bind:value={car_rental.location} required />
        </label>
        <br />
        <label>
            Rental Start Date and Time:
            <input
                type="datetime-local"
                bind:value={car_rental.rental_start_date_time}
                required
            />
        </label>
        <br />
        <label>
            Rental End Date and Time:
            <input
                type="datetime-local"
                bind:value={car_rental.rental_end_date_time}
                required
            />
        </label>
        <br />
        <label>
            Rental Price per Day:
            <input
                type="number"
                min="0"
                bind:value={car_rental.rental_price_per_day}
                required
            />
        </label>
        <br />
        <label>
            Car Availability Status:
            <select bind:value={car_rental.car_availability_status} required>
                <option value="Available">Available</option>
                <option value="Rented">Rented</option>
                <option value="Maintenance">Maintenance</option>
            </select>
        </label>
    </fieldset>

    <button type="submit">Submit</button>
    <a href="/car_rentals"><button>Back</button></a>
    
</form>
