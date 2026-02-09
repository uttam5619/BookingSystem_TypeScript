import { DATE, INTEGER, Model, STRING } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional,} from "sequelize";
import sequelizeConfig from "./sequelize.js";


class IdempotencyKey extends Model<InferAttributes<IdempotencyKey>,InferCreationAttributes<IdempotencyKey>>{
    declare id:CreationOptional<number>;
    declare idempotent_key:string;
    declare booking_id:number;
    declare created_at:CreationOptional<Date>;
    declare updated_at:CreationOptional<Date>
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