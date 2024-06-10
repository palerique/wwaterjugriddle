import { Test, TestingModule } from '@nestjs/testing';
import { WaterjugriddleController } from './waterjugriddle.controller';
import { WaterjugriddleService } from './waterjugriddle.service';

describe('WaterjugriddleController', () => {
  let controller: WaterjugriddleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterjugriddleController],
      providers: [WaterjugriddleService],
    }).compile();

    controller = module.get<WaterjugriddleController>(WaterjugriddleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
