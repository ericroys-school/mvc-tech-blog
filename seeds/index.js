import { dbConnect } from "../config/connection.js";
import { User, Blog, Blog_Comment } from "../models/index.js"

await dbConnect.sync({force: true})