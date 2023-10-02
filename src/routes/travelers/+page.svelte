<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
    $: ({ travelers } = data);
</script>

<div>
    <table>
        <caption>TRAVELERS</caption>
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
        </tr>
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
            </tr>
        {/each}
    </table>
</div>
<h4>NOT FOUND? REGISTER <a href="/register/traveler">HERE</a></h4>

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
