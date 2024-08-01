import { User } from './user.js';
import { Blog } from './blog.js';
import { Blog_Comment } from './blog_comment.js';

//Define each of the bi-directional relationships between User and Blog,
//User and Comments, and Blog and Comments
const userblog = User.hasMany(Blog, { foreignKey: 'user_id' });
const bloguser = Blog.belongsTo(User, { foreignKey: 'user_id' });
const usercom = User.hasMany(Blog_Comment, { foreignKey: 'user_id' });
const comuser = Blog_Comment.belongsTo(User, { foreignKey: 'user_id' });
const blogcom = Blog.hasMany(Blog_Comment, { foreignKey: 'blog_id' });
const comblog = Blog_Comment.belongsTo(Blog, { foreignKey: 'blog_id' });

/**
 * There was/is an issue with sequelize not sync of the relationships unless forcing
 * recognition of this via import on server.js. I don't know why and don't care since
 * this is last to ever use sequelize ;-)
 */
const sequelize_sux = true;


// export the models so sync model will work
export {
  User,
  Blog,
  Blog_Comment,
  userblog,
  bloguser,
  usercom,
  comuser,
  blogcom,
  comblog,
};
