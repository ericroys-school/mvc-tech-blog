import { dbConnect } from "../config/connection.js";
import { User, Climb, Climb_Comment } from "../models/index.js"

await dbConnect.sync({force: true})