import { UseGuards } from '@nestjs/common'
import { Args, Resolver, Mutation } from '@nestjs/graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { UploadersService } from './uploaders.service'
import { UploaderModel } from './models/uploaders.model'
import { GqlAuthGuard } from '../shared/guard/gqlAuth.guard'

@Resolver(() => UploaderModel)
export class UploadersResolver {
  constructor(private readonly uploadersService: UploadersService) {
    this.uploadersService = uploadersService
  }

  @Mutation(() => UploaderModel)
  @UseGuards(GqlAuthGuard)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
  ) {
    const res = await this.uploadersService.uploadFile(file)
    return res
  }
}
