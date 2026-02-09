import type Bookings from "../db/models/Bookings.js";
import IdempotencyKey from "../db/models/IdempotentKey.js"
import { generateIdempotencyKey } from "../utils/helpers/generateIdempotencyKey.js";



export async function createIdempotencyKey(booking:Bookings){
    const key = generateIdempotencyKey()
    const booking_id= booking.booking_id
    const data={
        idempotent_key:key,
        booking_id:booking_id
    }
    const idempotentKeyRecord= await IdempotencyKey.create(data)
    return idempotentKeyRecord

}


export async function deleteIdempotencyKey(id:number){

}