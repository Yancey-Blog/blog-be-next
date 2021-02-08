import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ForbiddenError } from 'apollo-server-express'
import { Model } from 'mongoose'
import { CreatePostInput } from './dtos/create-post.input'
import { UpdatePostInput } from './dtos/update-post.input'
import { PaginationInput } from './dtos/pagination.input'
import { PostModel } from './models/posts.model'
import { PostItemModel } from './models/post.model'
import { ArchiveModel } from './models/archive.model'
import { TagsModel } from './models/tags.model'
import { PostDocument } from './interfaces/posts.interface'
import { BatchDeleteModel } from '../database/models/batch-delete.model'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<PostDocument>,
  ) {
    this.postModel = postModel
  }

  private async getTotalCount(): Promise<number> {
    return this.postModel.countDocuments()
  }

  public async findPublicByPagination(input: PaginationInput): Promise<PostModel> {
    const { page, pageSize, title, tag } = input

    const params = {
      title: { $regex: !title ? '' : title, $options: 'i' },
      isPublic: { $ne: false },
    }

    const _params = tag ? { ...params, tags: tag } : params

    const count = await this.postModel.find(_params).count()
    const res = await this.postModel
      .find(_params)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)

    return {
      total: count,
      page,
      pageSize,
      items: res,
    }
  }

  public async findByPagination(input: PaginationInput): Promise<PostModel> {
    const { page, pageSize, title } = input

    const total = await this.getTotalCount()
    const items = await this.postModel
      .find({ title: { $regex: !title ? '' : title, $options: 'i' } })
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)

    return {
      total,
      page,
      pageSize,
      items,
    }
  }

  public async findOneById(id: string): Promise<PostItemModel> {
    const curr = await this.postModel.findById(id)
    if (!curr || curr.isPublic === false) {
      throw new ForbiddenError('Sorry, we couldn’t find this post.')
    }

    const prev = await this.postModel
      .find({ createdAt: { $lt: curr.createdAt }, isPublic: { $ne: false } })
      .sort({ createdAt: -1 })
      .limit(1)

    const next = await this.postModel
      .find({ createdAt: { $gt: curr.createdAt }, isPublic: { $ne: false } })
      .limit(1)

    const res = {
      ...curr,
      prev: prev[0] ? prev[0] : null,
      next: next[0] ? next[0] : null,
    }

    return res
  }

  public async create(postInput: CreatePostInput): Promise<PostItemModel> {
    return this.postModel.create(postInput)
  }

  public async update(postInput: UpdatePostInput): Promise<PostItemModel> {
    const { id, ...rest } = postInput
    return this.postModel.findByIdAndUpdate(id, rest, { new: true })
  }

  public async deleteOneById(id: string): Promise<PostItemModel> {
    return this.postModel.findByIdAndDelete(id)
  }

  public async batchDelete(ids: string[]): Promise<BatchDeleteModel> {
    const res = await this.postModel.deleteMany({
      _id: { $in: ids },
    })

    return {
      ...res,
      ids,
    }
  }

  public async updatePV(id: string): Promise<PostItemModel> {
    const { pv } = await this.findOneById(id)
    return this.postModel.findByIdAndUpdate(id, { pv: pv + 1 }, { new: true })
  }

  public async updateLike(id: string): Promise<PostItemModel> {
    const { like } = await this.findOneById(id)
    return this.postModel.findByIdAndUpdate(id, { like: like + 1 }, { new: true })
  }

  public async getTopPVPosts(limit: number): Promise<PostItemModel[]> {
    return this.postModel
      .find({ isPublic: { $ne: false } })
      .sort({ pv: -1, _id: -1 })
      .limit(limit)
  }

  public async getTopLikePosts(limit: number): Promise<PostItemModel[]> {
    return this.postModel
      .find({ isPublic: { $ne: false } })
      .sort({ like: -1, _id: -1 })
      .limit(limit)
  }

  public async getAllTags(): Promise<TagsModel> {
    const posts = await this.postModel.find({ isPublic: { $ne: false } }, { tags: 1 })
    const arr = []
    posts.forEach((post) => arr.push(...post.tags))

    return {
      tags: [...new Set(arr)],
    }
  }

  public async archive(): Promise<ArchiveModel[]> {
    const res = await this.postModel.aggregate([
      { $match: { isPublic: { $ne: false } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            id: '$_id',
            title: '$title',
            pv: '$pv',
            createdAt: '$createdAt',
          },
        },
      },
      {
        $group: {
          _id: { year: '$_id.year', month: '$_id.month' },
          days: {
            $push: {
              id: '$_id.id',
              title: '$_id.title',
              pv: '$_id.pv',
              createdAt: '$_id.createdAt',
            },
          },
        },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $group: {
          _id: '$_id.year',
          months: { $push: { month: '$_id.month', days: '$days' } },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ])

    return res
  }
}
