import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreatePostInput } from './dtos/create-post.input'
import { UpdatePostInput } from './dtos/update-post.input'
import { PostModel } from './models/posts.model'
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

  public async findAll(): Promise<PostModel[]> {
    return this.postModel.find({}).sort({ updatedAt: -1 })
  }

  public async findOneById(id: string): Promise<PostModel> {
    return this.postModel.findById(id)
  }

  public async create(postInput: CreatePostInput): Promise<PostModel> {
    return this.postModel.create(postInput)
  }

  public async update(postInput: UpdatePostInput): Promise<PostModel> {
    const { id, ...rest } = postInput
    return this.postModel.findByIdAndUpdate(id, rest, { new: true })
  }

  public async deleteOneById(id: string): Promise<PostModel> {
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
}
