import { Model, DataTypes, UUIDV4 } from 'sequelize';
import { dbConnect } from '../config/connection.js';
import { Blog } from './blog.js';
import { User } from './user.js';

export class Blog_Comment extends Model {}

Blog_Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    comment: {
        type: DataTypes.STRING(4000),
        allowNull: false
    },

    user_id: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: "id"
        }
    },
    blog_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Blog,
            key: "id"
        }
    },
    
    created_on: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    updated_on: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeValidate: (blogdata) => {
        blogdata.dataValues.created_on = new Date().getTime();
        blogdata.dataValues.updated_on = blogdata.dataValues.created_on;
        return blogdata;
      },

      beforeUpdate: (data) => {
        data.dataValues.updated_on = new Date().getTime();
        return data;
      },
    },

    sequelize: dbConnect,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: 'blog_comment',
  }
);
