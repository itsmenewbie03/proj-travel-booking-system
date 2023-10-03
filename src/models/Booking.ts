interface Booking {
    booking_id: string;
    traveler_id: string;
    accommodation_id: string;
    flight_id: string;
    car_rental_id: string;
    total_price: number;
    booking_date_time: string;
    payment_status: string;
    booking_status: string;
}

export type { Booking };
