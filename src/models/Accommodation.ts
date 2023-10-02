interface Accommodation {
    accommodation_id: string;
    accommodation_name: string;
    location: string;
    room_type: string;
    description: string;
    price_per_night: number;
    availability_status: string;
    check_in_date: string;
    check_out_date: string;
}

export type { Accommodation };
