<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import type { PageData } from "./$types";

    export let data: PageData;
    $: ({ accommodations } = data);
    const edit_id = (id: string) => {
        goto(`/register/accommodation/${id}`);
    };

    const delete_id = async (id: string) => {
        const resp = await fetch("/api/register/accommodation", {
            method: "DELETE",
            body: JSON.stringify({
                accommodation_id: id,
            }),
            headers: {
                accept: "application/json",
                "content-type": "application/json",
            },
        }).then((res) => res.json());
        await invalidateAll();
        alert(`BYE BYE: ${JSON.stringify(resp)}`);
    };
</script>

<table class="table table-auto">
    <caption class="text-2xl m-2">ACCOMMODATIONS</caption>
    <thead
        ><tr>
            <th>Accommodation ID</th>
            <th>Accommodation Name</th>
            <th>Location</th>
            <th>Room Type</th>
            <th>Description</th>
            <th>Price Per Night</th>
            <th>Availability Status</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        {#each accommodations as accommodation}
            <tr>
                <td>{accommodation.accommodation_id}</td>
                <td>{accommodation.accommodation_name}</td>
                <td>{accommodation.location}</td>
                <td>{accommodation.room_type}</td>
                <td>{accommodation.description}</td>
                <td>{accommodation.price_per_night}</td>
                <td>{accommodation.availability_status}</td>
                <td>{accommodation.check_in_date}</td>
                <td>{accommodation.check_in_date}</td>
                <td class="w-40"
                    ><button
                        class="btn btn-primary w-full"
                        on:click={(event) => {
                            edit_id(accommodation.accommodation_id);
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
                            await delete_id(accommodation.accommodation_id);
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
    Accommodation not found? Add <a
        href="/register/accommodation"
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
