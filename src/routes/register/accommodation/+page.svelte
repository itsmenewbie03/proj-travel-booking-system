<script>
    let accommodation = {
        accommodation_id: "",
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
        const resp = await fetch("/api/register/traveler", {
            method: "POST",
            body: JSON.stringify(accommodation),
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
        });
        alert(resp);
    };
</script>

<form on:submit={handleSubmit}>
    <fieldset>
        <legend>ACCOMMODATION INFO</legend>
        <label>
            Accommodation ID:
            <input
                type="text"
                bind:value={accommodation.accommodation_id}
                required
            />
        </label>

        <label>
            Accommodation Name:
            <input
                type="text"
                bind:value={accommodation.accommodation_name}
                required
            />
        </label>

        <label>
            Location:
            <input type="text" bind:value={accommodation.location} required />
        </label>

        <label>
            Room Type:
            <select bind:value={accommodation.room_type} required>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
            </select>
        </label>

        <label>
            Description:
            <textarea bind:value={accommodation.description} required />
        </label>

        <label>
            Price per Night:
            <input
                type="number"
                bind:value={accommodation.price_per_night}
                required
            />
        </label>

        <label>
            Availability Status:
            <select bind:value={accommodation.availability_status} required>
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
                <option value="Maintenance">Maintenance</option>
            </select>
        </label>

        <label>
            Check-In Date:
            <input
                type="date"
                bind:value={accommodation.check_in_date}
                required
            />
        </label>

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
