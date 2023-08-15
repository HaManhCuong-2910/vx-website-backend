import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { searchString } from 'src/helper';
import { ProjectRepository } from './repository/project.repository';
import { RequireProjectDto } from './dto/requireProject.dto';
import {
  QuerySearchProjectDto,
  UpdateProjectDto,
} from './dto/optionalProject.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async createProject(body: RequireProjectDto, file: Express.Multer.File) {
    const dtoStaff = RequireProjectDto.plainToClass(body);
    const { size_desktop, size_mobile } = dtoStaff;
    const dataCreate = {
      ...dtoStaff,
      size_mobile: Number(size_mobile),
      size_desktop: Number(size_desktop),
      image: `/public/projects/${file.originalname}`,
    };
    const result = await this.projectRepository
      .create(dataCreate)
      .then((data) => {
        return {
          status: HttpStatus.OK,
          data,
        };
      })
      .catch((error) => {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: error,
        };
      });

    return result;
  }

  async updateProject(data: UpdateProjectDto, file: Express.Multer.File) {
    const { _id, ...updateDtoData } = data;
    if (updateDtoData['size_desktop']) {
      updateDtoData['size_desktop'] = Number(updateDtoData['size_desktop']);
    }
    if (updateDtoData['size_mobile']) {
      updateDtoData['size_mobile'] = Number(updateDtoData['size_mobile']);
    }
    const updateDataResponse = await this.projectRepository
      .findByIdAndUpdate(_id, {
        ...updateDtoData,
        image: file?.originalname
          ? `/public/projects/${file.originalname}`
          : updateDtoData.image,
      })
      .then((res) => {
        return {
          status: HttpStatus.OK,
          data: res,
        };
      })
      .catch((error) => {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: error,
        };
      });

    return updateDataResponse;
  }

  async getDetailProject(id: string) {
    try {
      const result = await this.projectRepository.findById(id);

      if (result) {
        return {
          status: HttpStatus.OK,
          data: result,
        };
      }

      throw new HttpException('Không tồn tại dự án', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException('Không tồn tại dự án', HttpStatus.NOT_FOUND);
    }
  }

  async getList(query: QuerySearchProjectDto) {
    const {
      page = 1,
      limit = 10,
      fromDate,
      toDate,
      size_desktop,
      size_mobile,
      ...filter
    } = query;
    const querySearch = [];
    let queryDate = {};

    const skip = Number(limit) * Number(page) - Number(limit);

    Object.keys(filter).map((key: string) => {
      return (querySearch[key] = searchString(filter[key]));
    });

    if (size_desktop) {
      querySearch['size_desktop'] = size_desktop;
    }

    if (size_mobile) {
      querySearch['size_mobile'] = size_mobile;
    }

    if (fromDate && toDate) {
      queryDate = {
        createdAt: {
          $gte: new Date(fromDate),
          $lt: new Date(toDate),
        },
      };
    }
    const result = await this.projectRepository.getByCondition(
      {
        $and: [{ ...querySearch }, queryDate],
      },
      undefined,
      {
        skip,
        limit,
        sort: { updatedAt: -1 },
      },
    );

    const countRecord = await this.projectRepository.countDocuments({
      ...querySearch,
      ...queryDate,
    });

    return {
      data: result,
      page: Number(page),
      countRecord: countRecord,
      count: Math.ceil(countRecord / limit),
    };
  }

  async deleteProject(id: string) {
    return await this.projectRepository
      .deleteOne(id)
      .then((res) => {
        return {
          status: HttpStatus.OK,
          data: res,
        };
      })
      .catch((error) => {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: error,
        };
      });
  }
}
