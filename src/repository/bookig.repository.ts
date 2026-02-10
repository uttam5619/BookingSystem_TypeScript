import Bookings from "../db/models/Bookings.js";
import IdempotencyKey from "../db/models/IdempotentKey.js";
import { ResourceNotFoundError, ServerError } from "../utils/error/error.js";
import { changeStatus, createIdempotencyKey } from "./IdempotencyKey.repository.js";
import { HttpRequestType,IdempotencyStatus } from "../db/models/IdempotentKey.js";




export async function createBooking(data:any,key:string){
    
    const bookingWithIdemKey= await IdempotencyKey.findOne({
        where:{
            idempotent_key:key
        }
    })
    if(bookingWithIdemKey){
        const bookingRecord = await Bookings.findOne({
            where:{
                booking_id:bookingWithIdemKey.booking_id
            },
            attributes: { exclude: ['deleted_at'] }
        })
        if(!bookingRecord){
            throw new ServerError('failed to create booking',500)
        }
        const bookingData = bookingRecord.get({ plain: true });

        return {
            ...bookingData,
            idempotency_key: key
        };
    }

    const booking = await Bookings.create(data)
    if(!booking){
        throw new ServerError('failed to create booking',500)
    }
    const idempotentKey=await createIdempotencyKey(booking, IdempotencyStatus.PENDING,'create',HttpRequestType.POST)
    const { deleted_at, ...bookingData } = booking.get({ plain: true });
    const abstractedBookingData ={
        ...bookingData,
        idempotent_key: idempotentKey.idempotent_key
    }
    return abstractedBookingData
}



export async function cancelBooking(bookingId:number, key:string){

    const booking= await Bookings.findOne({
            where:{booking_id:bookingId},
            attributes:{
                exclude:['deleted_at']
            }
    })
    if(!booking){
        throw new ResourceNotFoundError(`No booking Record is found with booking id:${bookingId} for cancle the booking`,404)
    }

    /*  if the idempotency_key with status "cancelled" is already 
        existing then it will just return the booking record.
    */
    const doesKeyExist = await IdempotencyKey.findOne({
        where:{
            idempotent_key:key,
            status:IdempotencyStatus.CANCELLED
        }
    })
    if(doesKeyExist){
        return booking
    }

    /*  if the idempotency_key with status cancelled is not existing
        then it will chage the status and return the booking record. 
    */
    const idempotentRecord = await IdempotencyKey.findOne({
        where:{booking_id:booking.booking_id}
    })
    if(!idempotentRecord){
        throw new ResourceNotFoundError(`No idempotent_key record found with booking id:${bookingId} for cancel the booking`,404)
    }
    const idempotent_key= idempotentRecord.idempotent_key
    changeStatus(idempotent_key,IdempotencyStatus.CANCELLED)
    return booking
}



export async function finalizeBooking(bookingId:number,key:string){

    const booking= await Bookings.findOne(
        {
            where:{
                booking_id:bookingId
            },
            attributes:{
                exclude:['deleted_at']
            }
        }
    )
    if(!booking){
        throw new ResourceNotFoundError(`No booking Record is found with booking id:${bookingId} for finalizing the booking`,404)
    }

    /*
        If the idempotent key with status "complete" exist
        in the table then it will return the booking record. 
    */

    const doesKeyExist = await IdempotencyKey.findOne({
        where:{
            idempotent_key:key,
            status:IdempotencyStatus.COMPLETE
        }
    })
    if(doesKeyExist){
        return booking
    }

    /*
        If the idempotent key with status "complete" does not exist
        in the table then it will change the status in the idempotency_key
        table and return the booking record.
    */
    const idempotentRecord = await IdempotencyKey.findOne({
        where:{booking_id:booking.booking_id}
    })
    if(!idempotentRecord){
        throw new ResourceNotFoundError(`No idempotent_key record found with booking id:${bookingId} for finalizing the booking`,404)
    }
    const idempotent_key= idempotentRecord.idempotent_key
    changeStatus(idempotent_key,IdempotencyStatus.CANCELLED)
    return booking
}



export async function getAllBookings(){
    const booking =await Bookings.findAll(
        {
            where:{deleted_at:null},
            attributes:{
                exclude:['deleted_at']
            }
        }
    )
    if(!booking){
        throw new ServerError('Failed to fetch booking records from database',500)
    }
    //paginate this.
    return booking
}



export async function getBooking(id:number){
    const booking =await Bookings.findOne({
        where:{
            booking_id:id
        },
        attributes:{
            exclude:['deleted_at']
        }
    })
    if(!booking){
        throw new ServerError('Failed to fetch the record with given booking_id:${id}',500)
    }
    return booking
}



export async function updateBooking(id:number,data:any){
    const [updatedBookingRecordCount]=await Bookings.update(
        data,
        {
            where:{
                booking_id:id
            }
        }
    )
    if(updatedBookingRecordCount===0){
        throw new ServerError(`Failed to update the booking with booking_id:${id}`,500)
    }
    const booking = await Bookings.findOne({
        where:{
            booking_id:id
        },
        attributes:{
            exclude:['deleted_at']
        }
    })
    if(!booking){
        throw new ServerError('Something went wrong while calling the updateBooking function at repository layer',500)
    }
    return booking
}


/*
Note:- When we want to implement the logic to update the booking by changing it's state to CANCEL.
such thing can not be done , because in update booking we can update the entities which is carried by the Bookings table.
*/



export async function deleteBooking(id:number){
    const booking = await Bookings.findOne(
        {
            where:{
                booking_id:id
            },
            
        }
    )
    if(!booking){
        throw new ServerError(`No booking record exist with booking_id:${id}`,500)
    }
    const deletedBookingCount = await Bookings.destroy(
        {
            where:{
                booking_id:id
            }
        }
    )
    if(deletedBookingCount===0){
        throw new ServerError(`Failed to delete the booking record with booking_id:${id}`,500)
    }
    return booking
}



export async function softDeleteBooking(id:number){
    const booking= await Bookings.findByPk(id,{
        attributes: {
            exclude: ["deleted_at"]
        }
    })
    if(!booking){
        throw new ResourceNotFoundError(`No Booking Record found with booking_id:${id}`,404)
    }
    const softDeletedBookingRecord= await booking.update({
        deleted_at: new Date()
    });
    if(!softDeletedBookingRecord){
        throw new ServerError(`Failed to delete the record with booking_id:${id}`,500)
    }
    return booking
}