interface CarRental {
    car_rental_id: string;
    rental_company: string;
    car_model: string;
    location: string;
    rental_start_date_time: string;
    rental_end_date_time: string;
    rental_price_per_day: number;
    car_availability_status: string;
}

export type { CarRental };
