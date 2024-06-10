import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/waterjugriddle/solve (POST)', () => {
        return request(app.getHttpServer())
            .post('/waterjugriddle/solve')
            .send({ x_capacity: '3', y_capacity: '5', z_amount_wanted: '4' })
            .expect(201);
    });

    it('/waterjugriddle/solve (POST) invalid values', () => {
        return request(app.getHttpServer())
            .post('/waterjugriddle/solve')
            .send({ x_capacity: '-1', y_capacity: '5', z_amount_wanted: '4' })
            .expect(400);
    });

    it('/waterjugriddle/solve (POST) missing values', () => {
        return request(app.getHttpServer())
            .post('/waterjugriddle/solve')
            .send({ x_capacity: '3', y_capacity: '5' })
            .expect(400);
    });
});
