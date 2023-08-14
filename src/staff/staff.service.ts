import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StaffRepository } from './repository/staff.repository';
import { CreateStaffDto } from './dto/createStaff.dto';
import { OptionalStaffDto, UpdateStaffDto } from './dto/optionStaff.dto';
import { searchString } from 'src/helper';

@Injectable()
export class StaffService {
  constructor(private readonly staffRepository: StaffRepository) {}

  async createStaff(body: CreateStaffDto, file: Express.Multer.File) {
    const dtoStaff = CreateStaffDto.plainToClass(body);
    const dataCreate = {
      ...dtoStaff,
      image: `/public/staffs/${file.originalname}`,
    };
    const result = await this.staffRepository
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

  async updateStaff(data: UpdateStaffDto, file: Express.Multer.File) {
    const { _id, ...updateDtoData } = data;
    const updateDataResponse = await this.staffRepository
      .findByIdAndUpdate(_id, {
        ...updateDtoData,
        image: file?.originalname
          ? `/public/staffs/${file.originalname}`
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

  async getDetailStaff(id: string) {
    try {
      const result = await this.staffRepository.findById(id);

      if (result) {
        return {
          status: HttpStatus.OK,
          data: result,
        };
      }

      throw new HttpException('Không tìm thấy nhân viên', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException('Không tìm thấy nhân viên', HttpStatus.NOT_FOUND);
    }
  }

  async getList(query: OptionalStaffDto) {
    const { page = 1, limit = 10, fromDate, toDate, ...filter } = query;
    const querySearch = [];
    let queryDate = {};

    const skip = Number(limit) * Number(page) - Number(limit);

    Object.keys(filter).map((key: string) => {
      return (querySearch[key] = searchString(filter[key]));
    });

    if (fromDate && toDate) {
      queryDate = {
        createdAt: {
          $gte: new Date(fromDate),
          $lt: new Date(toDate),
        },
      };
    }
    const result = await this.staffRepository.getByCondition(
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

    const countRecord = await this.staffRepository.countDocuments({
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

  async deleteStaff(id: string) {
    return await this.staffRepository
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
