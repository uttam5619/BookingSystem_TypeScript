import { Model } from "sequelize";
import sequelizeConfig from "./sequelize.js";
import {type InferAttributes, type InferCreationAttributes, type CreationOptional, INTEGER, FLOAT, STRING, DATE,} from "sequelize";


class Bookings extends Model<InferAttributes<Bookings>, InferCreationAttributes<Bookings>>{
    declare booking_id:CreationOptional<number>;
    declare user_id:number;
    declare hotel_id: number;
    declare created_at: CreationOptional<Date>;
    declare updated_at:CreationOptional<Date>;
    declare deleted_at:Date|null
}

Bookings.init(
    {
        booking_id:{
            type:INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        user_id:{
            type:INTEGER,
            allowNull:false
        },
        hotel_id:{
            type:INTEGER,
            allowNull:false
        },
        created_at:{
            type:DATE
        },
        updated_at:{
            type:DATE
        },
        deleted_at:{
            type:DATE,
            allowNull:true
        }
    },
    {
        tableName:'bookings',
        sequelize:sequelizeConfig,
        underscored:true,
        timestamps:true,
    }
)

export default Bookings 