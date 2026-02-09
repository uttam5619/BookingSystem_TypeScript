import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelizeConfig=new Sequelize({
    dialect:'mysql',
    database:process.env.DB_NAME!,
    username:process.env.DB_USER!,
    password:process.env.DB_PASSWORD!,
    logging:true,
})

export default sequelizeConfig