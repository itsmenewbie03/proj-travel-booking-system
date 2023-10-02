interface ContactInformation {
    email: string;
    phone: string;
    address: string;
}

interface PassportInformation {
    passport_number: string;
    expiration_date: string;
    country_of_issue: string;
}

interface PaymentInformation {
    credit_card_number: string;
    expiration_date: string;
}

interface Traveler {
    traveler_id: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    contact_information: ContactInformation;
    passport_information: PassportInformation;
    payment_information: PaymentInformation;
}

export type { Traveler };
