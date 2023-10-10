<script lang="ts">
    import { goto } from "$app/navigation";
    import { json } from "@sveltejs/kit";
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
    let success_modal: HTMLDialogElement;
    let fail_modal: HTMLDialogElement;
    let fail_message: string;
    const back = () => {
        goto("/travelers");
    };
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
        // {"acknowledged":true,"insertedId":"6524bbb64412d20653e0a539"} success insert
        // console.log("bool check: ",resp?.insertedId,resp?.insertedId && resp.acknowledged)
        if (resp.acknowledged && resp?.insertedId) {
            success_modal.showModal();
        } else {
            fail_message = JSON.stringify(resp);
            fail_modal.showModal();
        }
    };
</script>

<dialog id="success_modal" class="modal" bind:this={success_modal}>
    <div class="modal-box">
        <form method="dialog">
            <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >✕</button
            >
        </form>
        <h3 class="font-bold text-lg">Success</h3>
        <p class="py-4">Traveler added successfully.</p>
    </div>
</dialog>

<dialog id="fail_modal" class="modal" bind:this={fail_modal}>
    <div class="modal-box">
        <form method="dialog">
            <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >✕</button
            >
        </form>
        <h3 class="font-bold text-lg">Error</h3>
        <p class="py-4">
            Something went wrong while trying to add the traveler.<br />
            API Response: {fail_message}
        </p>
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
                required
            />

            <label class="label" for="tel">Phone</label>
            <input
                class="input input-bordered w-full"
                type="tel"
                name="tel"
                bind:value={traveler.contact_information.phone}
                required
            />
        </div>
        <div>
            <label class="label" for="address">Address</label>
            <input
                class="input input-bordered w-full"
                type="text"
                name="address"
                bind:value={traveler.contact_information.address}
                required
            />
            <label class="label" for="pass_num">Passport Number</label>
            <input
                class="input input-bordered w-full"
                type="text"
                name="pass_num"
                bind:value={traveler.passport_information.passport_number}
                required
            />

            <label class="label" for="pass_exp">
                Passport Expiration Date</label
            >
            <input
                class="input input-bordered w-full"
                type="date"
                name="pass_exp"
                bind:value={traveler.passport_information.expiration_date}
                required
            />

            <label class="label" for="country_of_issue">
                Country of Issue</label
            >
            <input
                class="input input-bordered w-full"
                type="text"
                name="country_of_issue"
                bind:value={traveler.passport_information.country_of_issue}
                required
            />

            <label class="label" for="ccn"> Credit Card Number</label>
            <input
                class="input input-bordered w-full"
                type="text"
                name="ccn"
                maxlength="16"
                bind:value={traveler.payment_information.credit_card_number}
                required
            />

            <label class="label" for="exp_date"> Expiration Date</label>
            <input
                class="input input-bordered w-full"
                type="date"
                name="exp_date"
                bind:value={traveler.payment_information.expiration_date}
                required
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
