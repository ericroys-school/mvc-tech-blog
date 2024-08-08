import { dbConnect } from '../config/connection.js';
import { User, Blog, Blog_Comment } from '../models/index.js';
import { readFile } from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

await dbConnect.sync({ force: true });

//import test data if you want to uncomment
// let users = JSON.parse(await readFile(__dirname + '/data/user.json'));
// const promises = users.map(async u => {
//     const user = await User.create(u);
//     return user.get({plain:true});
// })
// await Promise.all(promises);
// Blog.bulkCreate(JSON.parse(await readFile(__dirname + '/data/blog.json')));
// Blog_Comment.bulkCreate(JSON.parse(await readFile(__dirname + '/data/comments.json')));