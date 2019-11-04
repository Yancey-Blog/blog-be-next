import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AnnouncementsResolver } from './announcements.resolver'
import { AnnouncementsService } from './announcements.service'
import { AnnouncementSchema } from './schemas/announcements.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Announcement', schema: AnnouncementSchema },
    ]),
  ],
  providers: [AnnouncementsService, AnnouncementsResolver],
})
export class AnnouncementsModule {}
