
export class GenericError extends Error{
    statusCode:number
    name:string
    constructor(message:string,statusCode:number,name:string){
        super(message)
        this.statusCode=statusCode
        this.name= name || this.constructor.name
        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export class ServerError extends GenericError{
    constructor(message:string,statusCode:number){
        super(message,statusCode,'Server Error')
    }
}

export class ResourceNotFoundError extends GenericError{
    constructor(message:string,statusCode:number){
        super(message,statusCode,'Resource Not Found')
    }
}

export class BadRequestError extends GenericError{
    constructor(message:string,statusCode:number, name:string){
        super(message,statusCode,'Bad Request')
    }
}