import { dbConnect } from '../config/connection.js';
import { User, Blog, Blog_Comment } from '../models/index.js';
import { readFile } from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

await dbConnect.sync({ force: true });

//import test data
User.bulkCreate(JSON.parse(await readFile(__dirname + '/data/user.json')));
Blog.bulkCreate(JSON.parse(await readFile(__dirname + '/data/blog.json')));
Blog_Comment.bulkCreate(JSON.parse(await readFile(__dirname + '/data/comments.json')));