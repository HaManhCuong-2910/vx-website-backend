import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { Project } from '../model/project.model';

@Injectable()
export class ProjectRepository extends BaseRepository<Project> {
  constructor(
    @InjectModel('Project')
    private readonly projectModel: Model<Project>,
  ) {
    super(projectModel);
  }

  async countDocuments(filter) {
    return this.projectModel.countDocuments(filter);
  }
}
