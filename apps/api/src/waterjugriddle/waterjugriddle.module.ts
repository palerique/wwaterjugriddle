import { Module } from '@nestjs/common';
import { WaterJugRiddleService } from './water-jug-riddle.service';
import { WaterJugRiddleController } from './waterJugRiddleController';

@Module({
  controllers: [WaterJugRiddleController],
  providers: [WaterJugRiddleService],
})
export class WaterjugriddleModule {}
