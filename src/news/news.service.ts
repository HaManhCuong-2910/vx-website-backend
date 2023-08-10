import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NewsRepository } from './repository/news.repository';
import { CreateNewsDto } from './dto/createNews.dto';
import { DeleteNewsDto, UpdateNewsDto } from './dto/updateNews.dto';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}

  async createNews(body: CreateNewsDto, files: Array<Express.Multer.File>) {
    const dtoNews = CreateNewsDto.plainToClass(body);
    const imgs = files.map((item) => {
      return `/public/images/${item.originalname}`;
    });
    const dataCreate = {
      ...dtoNews,
      imgs: imgs[0],
    };
    const result = await this.newsRepository
      .create(dataCreate)
      .then((newNews) => {
        return {
          status: HttpStatus.OK,
          data: newNews,
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

  async getListFilter() {
    const result = await this.newsRepository.searchExitsTag();
    return {
      status: HttpStatus.OK,
      data: result,
    };
  }

  async getRandomListNews(size: string) {
    const res = await this.newsRepository.getRandom(size);
    return {
      data: res,
    };
  }

  async getList(query: any) {
    const {
      page = 1,
      limit = 10,
      tag,
      title,
      fromDate,
      toDate,
      ...filter
    } = query;

    const skip = Number(limit) * Number(page) - Number(limit);
    let queryTag = {},
      queryTitle = {},
      queryDate = {};
    if (tag) {
      queryTag = { tag: { $regex: tag, $options: 'i' } };
    }
    if (title) {
      queryTitle = { title: { $regex: title, $options: 'i' } };
    }
    if (fromDate && toDate) {
      queryDate = {
        createdAt: {
          $gte: new Date(fromDate),
          $lt: new Date(toDate),
        },
      };
    }
    const result = await this.newsRepository.getByCondition(
      {
        $and: [queryTag, queryTitle, queryDate, filter],
      },
      undefined,
      {
        skip,
        limit,
        sort: { updatedAt: -1 },
      },
    );
    const countRecord = await this.newsRepository.countDocuments({
      ...queryTag,
      ...queryTitle,
      ...queryDate,
      ...filter,
    });

    return {
      data: result,
      page: Number(page),
      countRecord: countRecord,
      count: Math.ceil(countRecord / limit),
    };
  }

  async getDetailNews(id: string) {
    try {
      const result = await this.newsRepository.findById(id);

      if (result) {
        return {
          status: HttpStatus.OK,
          data: result,
        };
      }

      throw new HttpException('không tìm thấy tin tức', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException('không tìm thấy tin tức', HttpStatus.NOT_FOUND);
    }
  }

  async uploadFileImages(files: Array<Express.Multer.File>) {
    const imgs = files.map((item) => {
      return `/public/images/${item.originalname}`;
    });

    return {
      status: HttpStatus.OK,
      data: imgs,
    };
  }

  async updateNews(data: UpdateNewsDto, files: Array<Express.Multer.File>) {
    const { _id, ...updateDtoData } = data;
    const imgs = files.map((item) => {
      return `/public/images/${item.originalname}`;
    });
    const updateDataResponse = await this.newsRepository
      .findByIdAndUpdate(_id, {
        ...updateDtoData,
        imgs: imgs.length > 0 ? imgs[0] : updateDtoData.imgs,
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

  async deleteNews(param: DeleteNewsDto) {
    return await this.newsRepository
      .deleteOne(param.id)
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

  async clearImageTrash() {}
}
