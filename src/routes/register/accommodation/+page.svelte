<script>
    let accommodation = {
        accommodation_name: "",
        location: "",
        room_type: "",
        description: "",
        price_per_night: 0,
        availability_status: "",
        check_in_date: "",
        check_out_date: "",
    };

    const handleSubmit = async () => {
        const resp = await fetch("/api/register/accommodation", {
            method: "POST",
            body: JSON.stringify(accommodation),
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
        <legend>ACCOMMODATION INFO</legend>
        <label>
            Accommodation Name:
            <input
                type="text"
                bind:value={accommodation.accommodation_name}
                required
            />
        </label>
        <br />
        <label>
            Location:
            <input type="text" bind:value={accommodation.location} required />
        </label>
        <br />
        <label>
            Room Type:
            <select bind:value={accommodation.room_type} required>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
            </select>
        </label>
        <br />
        <label>
            Description:
            <textarea bind:value={accommodation.description} required />
        </label>
        <br />
        <label>
            Price per Night:
            <input
                type="number"
                bind:value={accommodation.price_per_night}
                required
            />
        </label>
        <br />
        <label>
            Availability Status:
            <select bind:value={accommodation.availability_status} required>
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
                <option value="Maintenance">Maintenance</option>
            </select>
        </label>
        <br />
        <label>
            Check-In Date:
            <input
                type="date"
                bind:value={accommodation.check_in_date}
                required
            />
        </label>
        <br />
        <label>
            Check-Out Date:
            <input
                type="date"
                bind:value={accommodation.check_out_date}
                required
            />
        </label>
    </fieldset>

    <button type="submit">Submit</button>
    <a href="/accommodations"><button>Back</button></a>
</form>
