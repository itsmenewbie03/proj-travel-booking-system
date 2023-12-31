<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    // $: ({ travelers } = data);
    import type { PageData } from "./$types";
    export let data: PageData;
    $: ({ travelers } = data);

    const edit_id = (id: string) => {
        goto(`/register/traveler/${id}`);
    };

    import ConfirmModal, {
        showConfirmModal,
        closeConfirmModal,
    } from "$lib/components/confirm_modal.svelte";

    import { _alert, Toaster } from "$lib/utils/CustomAlert";

    let target_id: string;
    let success: boolean;
    let message: string;

    const confirm_delete = async (id: string) => {
        target_id = id;
        showConfirmModal();
    };

    const delete_id = async () => {
        closeConfirmModal();
        const resp = await fetch("/api/register/traveler", {
            method: "DELETE",
            body: JSON.stringify({
                traveler_id: target_id,
            }),
            headers: {
                accept: "application/json",
                "content-type": "application/json",
            },
        }).then((res) => res.json());
        if (resp.acknowledged && resp.deletedCount) {
            success = true;
            message = "Traveler deleted successfully.";
        } else {
            success = false;
            message = "Failed to delete traveler.";
        }
        _alert(success, message);
        await invalidateAll();
    };
</script>

<ConfirmModal {delete_id} />
<Toaster />

<table class="table table-auto">
    <caption class="text-2xl m-2">TRAVELERS</caption>
    <thead>
        <tr>
            <th>Traveler ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Passport Number</th>
            <th>Expiration Date</th>
            <th>Country of Issue</th>
            <th>Credit Card Number</th>
            <th>Expiration Date</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        {#each travelers as traveler}
            <tr>
                <td>{traveler.traveler_id}</td>
                <td>{traveler.first_name}</td>
                <td>{traveler.last_name}</td>
                <td>{traveler.date_of_birth}</td>
                <td>{traveler.gender}</td>
                <td>{traveler.contact_information.address}</td>
                <td>{traveler.contact_information.email}</td>
                <td>{traveler.contact_information.phone}</td>
                <td>{traveler.passport_information.passport_number}</td>
                <td>{traveler.passport_information.expiration_date}</td>
                <td>{traveler.passport_information.country_of_issue}</td>
                <td>{traveler.payment_information.credit_card_number}</td>
                <td>{traveler.payment_information.expiration_date}</td>
                <td class="w-40"
                    ><button
                        class="btn btn-primary w-full"
                        on:click={(event) => {
                            edit_id(traveler.traveler_id);
                        }}
                    >
                        <svg
                            class="feather feather-edit h-4 w-4"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                            ><path
                                d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                            /><path
                                d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                            /></svg
                        >
                        Edit</button
                    >
                    <button
                        class="btn btn-secondary w-full mt-1"
                        on:click={async (event) => {
                            await confirm_delete(traveler.traveler_id);
                        }}
                        ><svg
                            viewBox="0 0 448 512"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="white"
                            ><path
                                d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z"
                            /></svg
                        >Delete</button
                    ></td
                >
            </tr>
        {/each}
    </tbody>
</table>

<div class="divider">END</div>
<p class="text-lg">
    Traveler not found? Register <a
        href="/register/traveler"
        class="link link-secondary">here</a
    >
</p>

<style>
    tr,
    th,
    td {
        border: 1px solid black;
    }
    caption {
        font-weight: bold;
    }
</style>
