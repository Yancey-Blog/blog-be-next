import { createParamDecorator } from '@nestjs/common'
import { Request } from 'express'

export const ReqDecorator = createParamDecorator(
  (data, [root, args, ctx, info]): Request => ctx.req,
)
