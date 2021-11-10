import { Module, Logger } from '@nestjs/common'
import { APP_PIPE, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { GraphQLValidationPipe } from './shared/pipes/GraphQLValidation.pipe'
import { RolesGuard } from './shared/guard/roles.guard'
import { DelayInterceptor } from './shared/interceptors/delay.interceptor'
import { ConfigModule } from './config/config.module'
import { DataBaseModule } from './database/database.module'
import { GraphqlModule } from './graphql/graphqls.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { AnnouncementsModule } from './announcements/announcements.module'
import { OpenSourcesModule } from './open-sources/open-sources.module'
import { BandwagonModule } from './bandwagon/bandwagon.module'
import { LiveToursModule } from './live-tours/live-tours.module'
import { YanceyMusicModule } from './yancey-music/yancey-music.module'
import { BestAlbumsModule } from './best-albums/best-albums.module'
import { PlayerModule } from './player/player.module'
import { AgendaModule } from './agenda/agenda.module'
import { PostsModule } from './posts/posts.module'
import { MottosModule } from './mottos/mottos.module'
import { CoversModule } from './covers/covers.module'
import { GlobalSettingModule } from './global-setting/global-setting.module'
import { PostStatisticsModule } from './post-statistics/post-statistics.module'
import { WinstonLogModule } from './shared/log/log.module'

@Module({
  imports: [
    ConfigModule,
    GraphqlModule,
    DataBaseModule,
    AuthModule,
    UsersModule,
    AnnouncementsModule,
    OpenSourcesModule,
    BandwagonModule,
    LiveToursModule,
    YanceyMusicModule,
    BestAlbumsModule,
    PlayerModule,
    AgendaModule,
    PostsModule,
    MottosModule,
    CoversModule,
    GlobalSettingModule,
    PostStatisticsModule,
    WinstonLogModule,
  ],

  providers: [
    {
      provide: APP_PIPE,
      useClass: GraphQLValidationPipe,
    },

    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: DelayInterceptor,
    },

    Logger,
  ],
})
export class AppModule {}
