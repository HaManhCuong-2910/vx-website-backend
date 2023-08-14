import { Schema } from 'mongoose';
const staffSchema = new Schema(
  {
    image: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    position: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: 'staffs',
    versionKey: false,
  },
);

export { staffSchema };

export interface Staff extends Document {
  image: string;

  fullName: string;

  position: string;
}
