import { Schema } from 'mongoose';

const newSchema = new Schema(
  {
    tag: {
      type: String,
      require: true,
    },
    imgs: {
      type: Array,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    short_description: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: 'news',
    versionKey: false,
  },
);

export { newSchema };

export interface News extends Document {
  tag: string;

  imgs: string[];

  title: string;

  short_description: string;

  description: string;
}