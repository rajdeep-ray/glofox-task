const express = require('express')
const indexRoute = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

indexRoute.get('/', (req, res) => {
    res.send('Hello World!')
})

indexRoute.get('/health', async (req, res) => {
    try {
        await prisma.$connect();

        res.status(200).json({
            status: true,
            message: 'I am Healthy!',
            data: {
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                dbStatus: 'Healthy',
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Service Unhealthy',
            data: {
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                dbStatus: 'Unhealthy',
                error: error.message,
            }
        });
    } finally {
        await prisma.$disconnect();
    }
});

module.exports = indexRoute