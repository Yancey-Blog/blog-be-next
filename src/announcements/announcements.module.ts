import { Module } from '@nestjs/common'
import { AnnouncementsResolver } from './announcements.resolver'
import { AnnouncementsService } from './announcements.service'

@Module({
  providers: [AnnouncementsService, AnnouncementsResolver],
})
export class AnnouncementsModule {}
