interface Flight {
    flight_id: string;
    airline: string;
    flight_number: string;
    departure_airport: string;
    arrival_airport: string;
    departure_date_time: string;
    arrival_date_time: string;
    seat_availability: number;
    ticket_price: number;
    class: string;
}
export type { Flight };
