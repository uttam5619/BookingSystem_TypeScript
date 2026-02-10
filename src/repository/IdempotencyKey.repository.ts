import type Bookings from "../db/models/Bookings.js";
import IdempotencyKey from "../db/models/IdempotentKey.js"
import { generateIdempotencyKey } from "../utils/helpers/generateIdempotencyKey.js";
import { IdempotencyStatus, HttpRequestType } from "../db/models/IdempotentKey.js";
import { ResourceNotFoundError } from "../utils/error/error.js";



export async function createIdempotencyKey(booking:Bookings,status:IdempotencyStatus,service:string,httpMethod:HttpRequestType){

    const key = generateIdempotencyKey()
    const booking_id= booking.booking_id
    const data={
        idempotent_key:key,
        booking_id:booking_id,
        status:status,
        service:service,
        http_method:httpMethod
    }
    const idempotentKeyRecord= await IdempotencyKey.create(data)
    return idempotentKeyRecord

}

export async function changeStatus(key:string,status:IdempotencyStatus){

    const idempotentRecord = await IdempotencyKey.findOne({
        where:{idempotent_key:key}
    })
    if(!idempotentRecord){
        throw new ResourceNotFoundError('Failed to find the idempotency key',404)
    }

    // If already cancelled or completed, do nothing (idempotent behavior)
    if(idempotentRecord.status==IdempotencyStatus.CANCELLED || idempotentRecord.status==IdempotencyStatus.COMPLETE){
        return idempotentRecord
    }

    // Only allow transition from PENDING
    if(idempotentRecord.status!=IdempotencyStatus.CANCELLED && idempotentRecord.status==IdempotencyStatus.PENDING){
        idempotentRecord.status=status
        await idempotentRecord.save()
        return idempotentRecord
    }
    
    // Any other state → just return existing record
    return idempotentRecord;
}

export async function deleteIdempotencyKey(id:number){

}