import type { PageServerLoad } from "./$types";
import db from "$db/mongo";
import type { Collection } from "mongodb";
import type { Traveler } from "../../../models/Traveler";
import type { Accommodation } from "../../../models/Accommodation";
import type { Flight } from "../../../models/Flight";
import type { CarRental } from "../../../models/CarRental";

export const load = (async () => {
    const traveler_col: Collection<Traveler> = db.collection("Traveler");
    const traveler_data = await traveler_col
        .find({}, { projection: { traveler_id: 1, _id: 0 } })
        .toArray();

    const accommodation_col: Collection<Accommodation> =
        db.collection("Accommodation");
    const accommodation_data = await accommodation_col
        .find(
            {},
            { projection: { accommodation_id: 1, _id: 0, price_per_night: 1, check_in_date: 1, check_out_date: 1 } }
        )
        .toArray();

    const flight_col: Collection<Flight> = db.collection("Flight");
    const flight_data = await flight_col
        .find({}, { projection: { _id: 0, flight_id: 1, ticket_price: 1 } })
        .toArray();

    const car_rental_col: Collection<CarRental> = db.collection("CarRental");
    const car_rental_data = await car_rental_col
        .find(
            {},
            {
                projection: {
                    _id: 0,
                    car_rental_id: 1,
                    rental_price_per_day: 1,
                    rental_start_date_time: 1,
                    rental_end_date_time: 1
                },
            }
        )
        .toArray();
    const result = {
        traveler_ids: traveler_data,
        accommodation_ids: accommodation_data,
        flight_ids: flight_data,
        car_rental_ids: car_rental_data,
    };
    console.log("data:", result);
    return result;
}) satisfies PageServerLoad;
