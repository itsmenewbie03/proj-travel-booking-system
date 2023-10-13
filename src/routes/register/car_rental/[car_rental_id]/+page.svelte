<script lang="ts">
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
    export let data: PageData;

    import { _alert, Toaster } from "$lib/utils/CustomAlert";
    let success: boolean;
    let message: string;

    let car_rental = {
        rental_company: "",
        car_model: "",
        location: "",
        rental_start_date_time: "",
        rental_end_date_time: "",
        rental_price_per_day: 0,
        car_availability_status: "",
    };

    car_rental = data.car_rental_data[0];

    const back = () => {
        goto("/car_rentals");
    };
    const handleSubmit = async (event: Event) => {
        event.preventDefault();
        const resp = await fetch("/api/register/car_rental", {
            method: "POST",
            body: JSON.stringify(car_rental),
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
        }).then((res) => res.json());
        if (resp.acknowledged && resp.modifiedCount) {
            success = true;
            message = "CarRental updated successfully.";
        } else {
            success = false;
            message =
                resp?.matchedCount > 0 && !resp?.modifiedCount
                    ? "No changes detected."
                    : "Failed to update CarRental.";
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
        <label class="label" for="rental_company">Rental Company</label>
        <input
            class="input input-bordered w-full"
            type="text"
            name="rental_company"
            bind:value={car_rental.rental_company}
            required
        />

        <label class="label" for="car_model">Car Model</label>
        <input
            class="input input-bordered w-full"
            type="text"
            name="car_model"
            bind:value={car_rental.car_model}
            required
        />

        <label class="label" for="location">Location</label>
        <input
            class="input input-bordered w-full"
            type="text"
            name="location"
            bind:value={car_rental.location}
            required
        />

        <label class="label" for="rental_start_date_time"
            >Rental Start Date and Time</label
        >
        <input
            class="input input-bordered w-full"
            type="datetime-local"
            name="rental_start_date_time"
            bind:value={car_rental.rental_start_date_time}
            required
        />

        <label class="label" for="rental_end_date_time"
            >Rental End Date and Time</label
        >
        <input
            class="input input-bordered w-full"
            type="datetime-local"
            name="rental_end_date_time"
            bind:value={car_rental.rental_end_date_time}
            required
        />

        <label class="label" for="rental_price_per_day"
            >Rental Price per Day</label
        >
        <input
            class="input input-bordered w-full"
            type="number"
            min="0"
            name="rental_price_per_day"
            bind:value={car_rental.rental_price_per_day}
            required
        />

        <label class="label" for="car_availability_status"
            >Car Availability Status</label
        >
        <select
            class="select select-bordered w-full"
            name="car_availability_status"
            bind:value={car_rental.car_availability_status}
            required
        >
            <option value="">Select Car Availability Status</option>
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
            <option value="Maintenance">Maintenance</option>
        </select>

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
