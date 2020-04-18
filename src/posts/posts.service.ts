import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreatePostInput } from './dtos/create-post.input'
import { UpdatePostInput } from './dtos/update-post.input'
import { PaginationInput } from './dtos/pagination.input'
import { PostModel } from './models/posts.model'
import { PostItemModel } from './models/post.model'
import { TagsModel } from './models/tags.model'
import { Post } from './interfaces/posts.interface'
import { BatchDeleteModel } from '../database/models/batch-delete.model'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<Post>,
  ) {
    this.postModel = postModel
  }

  private async getTotalCount(): Promise<number> {
    return this.postModel.countDocuments()
  }

  public async findAll(input: PaginationInput): Promise<PostModel> {
    const { page, pageSize, title } = input

    const total = await this.getTotalCount()
    const items = await this.postModel
      .find({ title: { $regex: !title ? '' : title } })
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
    return this.postModel.findById(id)
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
}
