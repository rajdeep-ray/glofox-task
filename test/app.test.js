const request = require('supertest');
const app = require('../server');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('glofox apis', () => {

    beforeAll(async () => {
        try {
            await prisma.$connect();
            console.log('Database is connected');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error; 
        }
    });

    it('index route', async () => {
        await request(app)
            .get('/')
            .expect(200);

    });

    it('should get all classes', async () => {
        const response = await request(app)
            .get('/classes')
            .expect(200);

    });

    it('should create a classes', async () => {

        const classItem = {
            "name": "Dance",
            "startDate": "2024-12-01",
            "endDate": "2024-12-20",
            "capacity": 10
        };

        const response = await request(app)
            .get('/classes')
            .send(classItem)
            .expect(200);

        expect(response.body.status).toEqual(true)

    });

    it('should get all bookings', async () => {
        const response = await request(app)
            .get('/booking')
            .expect(200);

    });

    it('should create a booking', async () => {

        const booknigItem = {
            "className": "Dance",
            "clasDate": "2024-12-11",
            "memberName": "Rajdeep"
        }
        const response = await request(app)
            .get('/booking')
            .expect(200)
            .send(booknigItem);

        expect(response.body.status).toEqual(true)
    });

    it('should return 404 when trying non exixting routes', async () => {
        await request(app)
            .get('/xyz')
            .expect(404);
    });
});
