import { Module } from '@nestjs/common';
import { WaterjugriddleModule } from './waterjugriddle/waterjugriddle.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports: [
        ConfigModule.forRoot(),
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                store: redisStore,
                host: configService.get('REDIS_HOST'),
                port: configService.get('REDIS_PORT'),
            }),
        }),
        WaterjugriddleModule,
    ],
})
export class AppModule {}
