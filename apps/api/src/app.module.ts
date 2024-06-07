import { Module } from '@nestjs/common';
import { WaterjugriddleModule } from './waterjugriddle/waterjugriddle.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [CacheModule.register({ isGlobal: true }), WaterjugriddleModule],
})
export class AppModule {
}
