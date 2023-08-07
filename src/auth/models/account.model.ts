import { Schema } from 'mongoose';
import { EStatusAccount } from 'src/common/common';

const accountSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      default: '',
    },
    password: {
      type: String,
      require: true,
      default: '',
    },
    roles: {
      type: Array,
      require: true,
      default: [],
    },
    status: {
      type: String,
      require: true,
      default: EStatusAccount.ACTIVE,
    },
    type: {
      type: String,
      require: true,
      default: 'ADMIN',
    },
  },
  {
    timestamps: true,
    collection: 'accounts',
    versionKey: false,
  },
);

export { accountSchema };

export interface Account extends Document {
  username: string;
  password: string;
  status: EStatusAccount;
  roles: string[];
  type: string;
}
