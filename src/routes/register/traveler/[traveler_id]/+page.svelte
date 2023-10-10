<script lang="ts">
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
    export let data: PageData;
    let traveler = {
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        contact_information: {
            email: "",
            phone: "",
            address: "",
        },
        passport_information: {
            passport_number: "",
            expiration_date: "",
            country_of_issue: "",
        },
        payment_information: {
            credit_card_number: "",
            expiration_date: "",
        },
    };
    traveler = data.traveler_data[0];
    let modal: HTMLDialogElement;
    let status: string;
    let msg: string;

    const handleSubmit = async (event: Event) => {
        event.preventDefault();
        const resp = await fetch("/api/register/traveler", {
            method: "POST",
            body: JSON.stringify(traveler),
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
        }).then((res) => res.json());
        if (resp.acknowledged && resp.modifiedCount) {
            status = "Success";
            msg = "Traveler updated successfully.";
            modal.showModal();
        } else {
            status = "Error";
            msg =
                resp?.matchedCount > 0 && !resp?.modifiedCount
                    ? "No changes detected."
                    : "Failed to update the traveler.";
            modal.showModal();
            console.log(
                `[${Date.now()}] Hey Developer You Got a Problem: ${JSON.stringify(
                    resp
                )}`
            );
        }
    };
    const back = () => {
        goto("/travelers");
    };
</script>

<dialog id="success_modal" class="modal" bind:this={modal}>
    <div class="modal-box">
        <form method="dialog">
            <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >✕</button
            >
        </form>
        <h3 class="font-bold text-lg">{status}</h3>
        <p class="py-4">{msg}</p>
    </div>
</dialog>
<form on:submit={handleSubmit}>
    <div class="form-control grid grid-cols-2 gap-4">
        <div>
            <label class="label" for="first_name">First Name</label>
            <input
                class="input input-bordered w-full"
                type="text"
                name="first_name"
                bind:value={traveler.first_name}
                required
            />

            <label class="label" for="last_name">Last Name</label>
            <input
                class="input input-bordered w-full"
                type="text"
                name="last_name"
                bind:value={traveler.last_name}
                required
            />

            <label class="label" for="dob">Date of Birth</label>
            <input
                class="input input-bordered w-full"
                type="date"
                name="dob"
                bind:value={traveler.date_of_birth}
                required
            />

            <label class="label" for="gender">Gender</label>
            <select
                bind:value={traveler.gender}
                class="select select-bordered w-full"
                name="gender"
                required
            >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <label class="label" for="email">Email</label>
            <input
                class="input input-bordered w-full"
                type="email"
                name="email"
                bind:value={traveler.contact_information.email}
            />

            <label class="label" for="tel">Phone</label>
            <input
                class="input input-bordered w-full"
                type="tel"
                name="tel"
                bind:value={traveler.contact_information.phone}
            />
        </div>
        <div>
            <label class="label" for="address">Address</label>
            <input
                class="input input-bordered w-full"
                type="text"
                name="address"
                bind:value={traveler.contact_information.address}
            />
            <label class="label" for="pass_num">Passport Number</label>
            <input
                class="input input-bordered w-full"
                type="text"
                name="pass_num"
                bind:value={traveler.passport_information.passport_number}
            />

            <label class="label" for="pass_exp">
                Passport Expiration Date</label
            >
            <input
                class="input input-bordered w-full"
                type="date"
                name="pass_exp"
                bind:value={traveler.passport_information.expiration_date}
            />

            <label class="label" for="country_of_issue">
                Country of Issue</label
            >
            <input
                class="input input-bordered w-full"
                type="text"
                name="country_of_issue"
                bind:value={traveler.passport_information.country_of_issue}
            />

            <label class="label" for="ccn"> Credit Card Number</label>
            <input
                class="input input-bordered w-full"
                type="text"
                name="ccn"
                maxlength="16"
                bind:value={traveler.payment_information.credit_card_number}
            />

            <label class="label" for="exp_date"> Expiration Date</label>
            <input
                class="input input-bordered w-full"
                type="date"
                name="exp_date"
                bind:value={traveler.payment_information.expiration_date}
            />
        </div>
        <div class="col-span-2">
            <button class="btn btn-primary w-full mt-2" type="submit"
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
