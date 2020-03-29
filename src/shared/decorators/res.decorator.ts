import { createParamDecorator } from '@nestjs/common'
import { Response } from 'express'

export const ResDecorator = createParamDecorator(
  (data, [root, args, ctx, info]): Response => ctx.res,
)
