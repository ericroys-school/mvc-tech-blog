import "dotenv/config";
import { Sequelize } from "sequelize";

//connect to the database using either the db url (i.e. for deployment) or
//read out of the env file (for local working copy)
export const dbConnect = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "postgres",
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );