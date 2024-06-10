import { Module } from '@nestjs/common';
import { WaterjugriddleService } from './waterjugriddle.service';
import { WaterjugriddleController } from './waterjugriddle.controller';

@Module({
    controllers: [WaterjugriddleController],
    providers: [WaterjugriddleService],
})
export class WaterjugriddleModule {}
