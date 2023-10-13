<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;

    import { goto, invalidateAll } from "$app/navigation";

    $: ({ notifications } = data);
    const edit_id = (id: string) => {
        goto(`/register/notification/${id}`);
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
        const resp = await fetch("/api/register/notification", {
            method: "DELETE",
            body: JSON.stringify({
                notification_id: target_id,
            }),
            headers: {
                accept: "application/json",
                "content-type": "application/json",
            },
        }).then((res) => res.json());
        if (resp.acknowledged && resp.deletedCount) {
            success = true;
            message = "Notification deleted successfully.";
        } else {
            success = false;
            message = "Failed to delete notification.";
        }
        _alert(success, message);
        await invalidateAll();
    };
</script>

<ConfirmModal {delete_id} />
<Toaster />

<table class="table table-auto">
    <caption class="text-2xl m-2">NOTIFICATIONS</caption>
    <thead>
        <tr>
            <th>Notification ID</th>
            <th>Traveler ID</th>
            <th>Notification Type</th>
            <th>Content</th>
            <th>Timestamp</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        {#each notifications as notification}
            <tr>
                <td>{notification.notification_id}</td>
                <td>{notification.traveler_id}</td>
                <td>{notification.notification_type}</td>
                <td>{notification.content}</td>
                <td>{notification.timestamp}</td>
                <td>{notification.status}</td>
                <td class="w-40"
                    ><button
                        class="btn btn-primary w-full"
                        on:click={(event) => {
                            edit_id(notification.notification_id);
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
                            await confirm_delete(notification.notification_id);
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
    Notification not found? Add <a
        href="/register/notification"
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
