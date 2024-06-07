import { Test, TestingModule } from '@nestjs/testing';
import { WaterJugRiddleController } from './waterJugRiddleController';
import { WaterJugRiddleService } from './water-jug-riddle.service';

describe('WaterjugriddleController', () => {
  let controller: WaterJugRiddleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterJugRiddleController],
      providers: [WaterJugRiddleService],
    }).compile();

    controller = module.get<WaterJugRiddleController>(WaterJugRiddleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
