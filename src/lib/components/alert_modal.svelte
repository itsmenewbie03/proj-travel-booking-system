<script lang="ts" context="module">
    let alert_modal: HTMLDialogElement;
    
    export function showAlertModal() {
        console.log(`fuck alert_modal is ${alert_modal}`);
        alert_modal.showModal();
    }

    export function closeAlertModal() {
        if (!alert_modal) {
            console.log(`fuck alert_modal is ${alert_modal} we can't close it now!`);
            return;
        }
        alert_modal.close();
    }
</script>

<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    export let success: boolean;
    export let message: string;
    onDestroy(() => {
        console.log(
            Date.now(),
            new Date().toLocaleString(),
            "Alert Modal Got Destroyed!"
        );
    });
    onMount(() => {
        console.log(
            Date.now(),
            new Date().toLocaleString(),
            "Alert Modal is Mounted!"
        );
    });
</script>

<dialog class="modal" bind:this={alert_modal}>
    <div class="modal-box">
        <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            on:click={(event) => {
                closeAlertModal();
            }}>✕</button
        >
        {#if success}
            <h3 class="font-bold text-lg">Success</h3>
        {:else}
            <h3 class="font-bold text-lg">Error</h3>
        {/if}
        <p class="py-4">{message}</p>
    </div>
</dialog>
