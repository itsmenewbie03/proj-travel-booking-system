<script>
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

    const handleSubmit = async () => {
        const resp = await fetch("/api/register/traveler", {
            method: "POST",
            body: JSON.stringify(traveler),
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
        });
        alert(resp)
    };
</script>

<form on:submit={handleSubmit}>
    <fieldset>
        <legend>PERSONAL INFO</legend>
        <label>
            First Name:
            <input type="text" bind:value={traveler.first_name} required />
        </label>

        <label>
            Last Name:
            <input type="text" bind:value={traveler.last_name} required />
        </label>

        <label>
            Date of Birth:
            <input type="date" bind:value={traveler.date_of_birth} required />
        </label>

        <label>
            Gender:
            <select bind:value={traveler.gender} required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
        </label>
    </fieldset>
    <fieldset>
        <legend>CONTACT INFO</legend>
        <label>
            Email:
            <input
                type="email"
                bind:value={traveler.contact_information.email}
            />
        </label>
        <label>
            Phone:
            <input type="tel" bind:value={traveler.contact_information.phone} />
        </label>
        <label>
            Address:
            <input
                type="text"
                bind:value={traveler.contact_information.address}
            />
        </label>
    </fieldset>
    <fieldset>
        <legend>PASSPORT INFO</legend>
        <label>
            Passport Number:
            <input
                type="text"
                bind:value={traveler.passport_information.passport_number}
            />
        </label>
        <label>
            Passport Expiration Date:
            <input
                type="date"
                bind:value={traveler.passport_information.expiration_date}
            />
        </label>
        <label>
            Country of Issue:
            <input
                type="text"
                bind:value={traveler.passport_information.country_of_issue}
            />
        </label>
    </fieldset>
    <fieldset>
        <legend>PAYMENT INFO</legend>
        <label>
            Credit Card Number:
            <input
                type="text"
                maxlength="16"
                bind:value={traveler.payment_information.credit_card_number}
            />
        </label>
        <label>
            Expiration Date:
            <input
                type="date"
                bind:value={traveler.payment_information.expiration_date}
            />
        </label>
    </fieldset>
    <button type="submit">Submit</button>
    <a href="/travelers"><button>Back</button></a>
</form>
