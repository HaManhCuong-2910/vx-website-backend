import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { Staff } from '../model/staff.model';

@Injectable()
export class StaffRepository extends BaseRepository<Staff> {
  constructor(
    @InjectModel('Staff')
    private readonly staffModel: Model<Staff>,
  ) {
    super(staffModel);
  }

  async countDocuments(filter) {
    return this.staffModel.countDocuments(filter);
  }
}
