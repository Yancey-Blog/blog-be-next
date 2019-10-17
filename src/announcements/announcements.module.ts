import { Module } from '@nestjs/common'
import { AnnouncementsResolver } from './announcements.resolver'
import { AnnouncementsService } from './announcements.service'

@Module({
  providers: [AnnouncementsResolver, AnnouncementsService],
})
export class AnnouncementsModule {}
