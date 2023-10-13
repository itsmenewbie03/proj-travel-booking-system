<script lang="ts" context="module">
    let modal: HTMLDialogElement;

    export function showConfirmModal() {
        modal.showModal();
    }

    export function closeConfirmModal() {
        modal.close();
    }
</script>

<script lang="ts">
    export let delete_id: () => Promise<void>;
    import { onDestroy, onMount } from "svelte";

    onDestroy(() => {
        console.log(
            Date.now(),
            new Date().toLocaleString(),
            "Confirm Modal Got Destroyed!"
        );
    });
    onMount(() => {
        console.log(
            Date.now(),
            new Date().toLocaleString(),
            "Confirm Modal is Mounted!"
        );
    });
</script>

<dialog class="modal" bind:this={modal}>
    <div class="modal-box">
        <form method="dialog">
            <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >✕</button
            >
        </form>
        <h3 class="font-bold text-lg">Confirm</h3>
        <p class="py-4">
            Are you sure you want to delete this data?<br />This action is
            irreversible.
        </p>
        <div class="flex justify-end gap-1">
            <button
                class="btn btn-primary"
                on:click={async (event) => {
                    await delete_id();
                }}>Yes</button
            >
            <button
                class="btn btn-secondary"
                on:click={(event) => {
                    modal.close();
                }}>No</button
            >
        </div>
    </div>
</dialog>
