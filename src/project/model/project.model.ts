import { Schema } from 'mongoose';
const projectSchema = new Schema(
  {
    image: {
      type: String,
      require: true,
    },
    title_large: {
      type: String,
      require: true,
    },
    font_title_large: {
      type: String,
      require: true,
    },
    size_desktop: {
      type: Number,
      require: true,
    },
    size_mobile: {
      type: Number,
      require: true,
    },
    title_short: {
      type: String,
      require: true,
    },
    des_short: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: 'projects',
    versionKey: false,
  },
);

export { projectSchema };

export interface Project extends Document {
  image: string;

  title_large: string;

  font_title_large: string;

  size_desktop: number;

  size_mobile: string;

  title_short: string;

  des_short: string;
}
