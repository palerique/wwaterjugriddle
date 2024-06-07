import { Test, TestingModule } from '@nestjs/testing';
import { WaterJugRiddleService } from './water-jug-riddle.service';

describe('WaterjugriddleService', () => {
  let service: WaterJugRiddleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterJugRiddleService],
    }).compile();

    service = module.get<WaterJugRiddleService>(WaterJugRiddleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
