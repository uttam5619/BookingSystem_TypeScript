import { v4 as uuidv4 } from "uuid"

export function generateIdempotencyKey():string{
    const idempotency_key= uuidv4()
    return idempotency_key
}