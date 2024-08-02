import { Model, DataTypes, UUIDV4 } from 'sequelize';
import { dbConnect } from '../config/connection.js';
import { User } from './user.js';

export class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    //255 len
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    text: {
      type: DataTypes.STRING(4000),
      allowNull: false,
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
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
      beforeCreate: (blogdata) => {
        blogdata.x = new Date().getTime();
        blogdata.updated_on = blogdata.x;
      },

      beforeUpdate: (data) => {
        data.updated_on = new Date().getTime();
      },
    },

    sequelize: dbConnect,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: 'blog',
  }
);