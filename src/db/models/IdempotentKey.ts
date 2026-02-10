import { DataTypes, DATE, INTEGER, Model, STRING } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional,} from "sequelize";
import sequelizeConfig from "./sequelize.js";


export enum IdempotencyStatus {
  PENDING = 'pending',
  COMPLETE = 'complete',
  CANCELLED = 'cancelled'
}

export enum HttpRequestType {
    POST='POST',
    GET='GET',
    PUT='PUT',
    PATCH='PATCH',
    DELETE='DELETE'
}

class IdempotencyKey extends Model<InferAttributes<IdempotencyKey>,InferCreationAttributes<IdempotencyKey>>{
    declare id:CreationOptional<number>;
    declare idempotent_key:string;
    declare booking_id:number;
    declare created_at:CreationOptional<Date>;
    declare updated_at:CreationOptional<Date>;
    declare status:CreationOptional<IdempotencyStatus>| string;
    declare service: string | null;
    declare http_method:CreationOptional<HttpRequestType>|null
}

IdempotencyKey.init(
    {
        id:{
            type:INTEGER,
        },
        idempotent_key:{
            type:STRING
        },
        booking_id:{
            type:INTEGER
        },
        created_at:{
            type:DATE
        },
        updated_at:{
            type:DATE
        },
        status:{
            type:DataTypes.ENUM('PENDING','COMPLETED','CANCLLED')
        },
        service:{
            type:STRING
        },
        http_method:{
            type:DataTypes.ENUM('POST','GET','PUT','PATCH','DELETE')
        }
    },
    {
        tableName:'idempotency_key',
        sequelize:sequelizeConfig,
        underscored:true,
        timestamps:true,
    }
)

export default IdempotencyKey