<script lang="ts">
    import { goto } from "$app/navigation";

    import type { PageData } from "./$types";
    export let data: PageData;
    import { _alert, Toaster } from "$lib/utils/CustomAlert";

    let success: boolean;
    let message: string;

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

    accommodation = data.traveler_data[0];

    const handleSubmit = async (event: Event) => {
        event.preventDefault();
        const resp = await fetch("/api/register/accommodation", {
            method: "POST",
            body: JSON.stringify(accommodation),
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
        }).then((res) => res.json());
        if (resp.acknowledged && resp.modifiedCount) {
            success = true;
            message = "Accommodation updated successfully.";
        } else {
            success = false;
            message =
                resp?.matchedCount > 0 && !resp?.modifiedCount
                    ? "No changes detected."
                    : "Failed to update accommodation.";
            // print a log coz why not?
            console.log(
                `[${Date.now()}] Hey Developer You Got a Problem: ${JSON.stringify(
                    resp
                )}`
            );
        }
        _alert(success, message);
    };
    const back = () => {
        goto("/accommodations");
    };
</script>

<!-- <AlertModal {success} {message} /> -->
<Toaster />

<form on:submit={handleSubmit}>
    <div class="form-control">
        <label class="label" for="accommodation_name">Accommodation Name</label>
        <input
            class="input input-bordered w-full"
            type="text"
            name="accommodation_name"
            bind:value={accommodation.accommodation_name}
            required
        />

        <label class="label" for="location">Location</label>
        <input
            class="input input-bordered w-full"
            type="text"
            name="location"
            bind:value={accommodation.location}
            required
        />

        <label class="label" for="room_type">Room Type</label>
        <select
            class="select select-bordered w-full"
            name="room_type"
            bind:value={accommodation.room_type}
            required
        >
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
        </select>

        <label class="label" for="description">Description</label>
        <textarea
            class="textarea textarea-bordered w-full"
            name="description"
            bind:value={accommodation.description}
            required
        />

        <label class="label" for="price_per_night">Price per Night</label>
        <input
            class="input input-bordered w-full"
            type="number"
            min="0"
            name="price_per_night"
            bind:value={accommodation.price_per_night}
            required
        />

        <label class="label" for="availability_status"
            >Availability Status</label
        >
        <select
            class="select select-bordered w-full"
            name="availability_status"
            bind:value={accommodation.availability_status}
            required
        >
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Maintenance">Maintenance</option>
        </select>

        <label class="label" for="check_in_date">Check-In Date</label>
        <input
            class="input input-bordered w-full"
            type="date"
            name="check_in_date"
            bind:value={accommodation.check_in_date}
            required
        />

        <label class="label" for="check_out_date">Check-Out Date</label>
        <input
            class="input input-bordered w-full"
            type="date"
            name="check_out_date"
            bind:value={accommodation.check_out_date}
            required
        />

        <button class="btn btn-primary mt-1" type="submit">Submit</button>
        <button
            class="btn btn-secondary w-full mt-1"
            on:click={(event) => {
                event.preventDefault();
                back();
            }}>Back</button
        >
    </div>
</form>
