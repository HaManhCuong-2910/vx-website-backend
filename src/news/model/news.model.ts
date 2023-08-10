import { Schema } from 'mongoose';
const newSchema = new Schema(
  {
    tag: {
      type: String,
      require: true,
    },
    isOutstanding: {
      type: Boolean,
      default: false,
      require: true,
    },
    imgs: {
      type: String,
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

  isOutstanding: boolean;

  imgs: string;

  title: string;

  short_description: string;

  description: string;
}
